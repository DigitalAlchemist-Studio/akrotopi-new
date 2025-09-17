<?php
/**
 * Simple Admin Interface for Viewing Contact Form Submissions
 * Access: /assets/php/admin.php
 * 
 * IMPORTANT: This is a basic admin interface. For production use:
 * 1. Add proper authentication
 * 2. Use a proper database instead of log files
 * 3. Add more security measures
 * 4. Consider using a proper admin framework
 */

// Basic security check (you should implement proper authentication)
$admin_password = 'akrotopi2024'; // Change this to a secure password
$is_authenticated = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['password'] === $admin_password) {
        session_start();
        $_SESSION['admin_logged_in'] = true;
        $is_authenticated = true;
    } else {
        $login_error = 'Invalid password';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_start();
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Read log file
$log_file = 'contact_log.txt';
$submissions = [];

if (file_exists($log_file)) {
    $log_content = file_get_contents($log_file);
    $lines = array_reverse(explode("\n", trim($log_content)));
    
    foreach ($lines as $line) {
        if (!empty(trim($line))) {
            $submissions[] = $line;
        }
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submissions - Akrotopi Admin</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .login-form {
            padding: 40px;
            text-align: center;
        }
        .login-form input {
            padding: 10px;
            margin: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 200px;
        }
        .login-form button {
            padding: 10px 20px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .error {
            color: #e74c3c;
            margin: 10px 0;
        }
        .submissions {
            padding: 20px;
        }
        .submission {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 15px;
            margin: 10px 0;
            font-family: monospace;
            font-size: 14px;
        }
        .logout {
            text-align: right;
            padding: 10px 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }
        .logout a {
            color: #6c757d;
            text-decoration: none;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 20px;
            background: #f8f9fa;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 4px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #3498db;
        }
        .no-submissions {
            text-align: center;
            padding: 40px;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if (!$is_authenticated): ?>
            <div class="header">
                <h1>Akrotopi Contact Form Admin</h1>
            </div>
            <div class="login-form">
                <h2>Login Required</h2>
                <?php if (isset($login_error)): ?>
                    <div class="error"><?php echo htmlspecialchars($login_error); ?></div>
                <?php endif; ?>
                <form method="POST">
                    <input type="password" name="password" placeholder="Admin Password" required>
                    <button type="submit" name="login">Login</button>
                </form>
            </div>
        <?php else: ?>
            <div class="header">
                <h1>Contact Form Submissions</h1>
            </div>
            <div class="logout">
                <a href="?logout=1">Logout</a>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number"><?php echo count($submissions); ?></div>
                    <div>Total Submissions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo count(array_filter($submissions, function($s) { return strpos($s, date('Y-m-d')) !== false; })); ?></div>
                    <div>Today</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo count(array_filter($submissions, function($s) { return strpos($s, date('Y-m', strtotime('-1 month'))) !== false; })); ?></div>
                    <div>This Month</div>
                </div>
            </div>
            
            <div class="submissions">
                <?php if (empty($submissions)): ?>
                    <div class="no-submissions">
                        <h3>No submissions yet</h3>
                        <p>Contact form submissions will appear here.</p>
                    </div>
                <?php else: ?>
                    <h3>Recent Submissions (<?php echo count($submissions); ?> total)</h3>
                    <?php foreach ($submissions as $submission): ?>
                        <div class="submission">
                            <?php echo htmlspecialchars($submission); ?>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>

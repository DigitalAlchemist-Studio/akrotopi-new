<?php
// Secure Form Handler for Akrotopi Apartments
// Handles contact form submissions from contact.html and faq.html

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// CORS headers for same-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Set content type
header('Content-Type: application/json');

// Configuration
$config = [
    'email_to' => 'info@akrotopi.gr',
    'email_from' => 'noreply@akrotopi.gr',
    'max_message_length' => 2000,
    'max_name_length' => 100,
    'rate_limit' => 5, // max submissions per hour per IP
    'honeypot_field' => 'website' // hidden field to catch bots
];

// Rate limiting function
function checkRateLimit($ip, $limit = 5) {
    $file = sys_get_temp_dir() . '/akrotopi_rate_limit.json';
    $data = [];
    
    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true) ?: [];
    }
    
    $now = time();
    $hour_ago = $now - 3600;
    
    // Clean old entries
    $data = array_filter($data, function($timestamp) use ($hour_ago) {
        return $timestamp > $hour_ago;
    });
    
    // Check if IP has exceeded limit
    $ip_count = 0;
    foreach ($data as $stored_ip => $timestamp) {
        if ($stored_ip === $ip && $timestamp > $hour_ago) {
            $ip_count++;
        }
    }
    
    if ($ip_count >= $limit) {
        return false;
    }
    
    // Add current request
    $data[$ip . '_' . $now] = $now;
    
    // Save updated data
    file_put_contents($file, json_encode($data));
    return true;
}

// Input sanitization function
function sanitizeInput($input) {
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    
    // Remove null bytes
    $input = str_replace(chr(0), '', $input);
    
    // Trim whitespace
    $input = trim($input);
    
    // Remove excessive whitespace
    $input = preg_replace('/\s+/', ' ', $input);
    
    // HTML encode to prevent XSS
    $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    return $input;
}

// Email validation
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Phone validation (Greek format)
function isValidPhone($phone) {
    // Remove all non-digit characters
    $phone = preg_replace('/[^0-9+]/', '', $phone);
    
    // Check if it's a valid Greek phone number
    return preg_match('/^(\+30|0030|30)?[0-9]{10}$/', $phone);
}

// Get client IP address
function getClientIP() {
    $ip_keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
    
    foreach ($ip_keys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            $ip = $_SERVER[$key];
            if (strpos($ip, ',') !== false) {
                $ip = explode(',', $ip)[0];
            }
            $ip = trim($ip);
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return $ip;
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Main processing
try {
    // Get client IP
    $client_ip = getClientIP();
    
    // Check rate limit
    if (!checkRateLimit($client_ip, $config['rate_limit'])) {
        http_response_code(429);
        echo json_encode([
            'success' => false, 
            'message' => 'Too many requests. Please try again later.'
        ]);
        exit;
    }
    
    // Check honeypot (bot detection)
    if (!empty($_POST[$config['honeypot_field']])) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'message' => 'Invalid submission'
        ]);
        exit;
    }
    
    // Sanitize all input
    $data = sanitizeInput($_POST);
    
    // Validate required fields
    $required_fields = ['name', 'email', 'message'];
    $errors = [];
    
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            $errors[] = ucfirst($field) . ' is required';
        }
    }
    
    // Validate email
    if (!empty($data['email']) && !isValidEmail($data['email'])) {
        $errors[] = 'Invalid email address';
    }
    
    // Validate phone if provided
    if (!empty($data['phone']) && !isValidPhone($data['phone'])) {
        $errors[] = 'Invalid phone number format';
    }
    
    // Validate field lengths
    if (strlen($data['name']) > $config['max_name_length']) {
        $errors[] = 'Name is too long';
    }
    
    if (strlen($data['message']) > $config['max_message_length']) {
        $errors[] = 'Message is too long';
    }
    
    // Check for suspicious content
    $suspicious_patterns = [
        '/<script/i',
        '/javascript:/i',
        '/on\w+\s*=/i',
        '/<iframe/i',
        '/<object/i',
        '/<embed/i'
    ];
    
    foreach ($suspicious_patterns as $pattern) {
        if (preg_match($pattern, $data['message']) || preg_match($pattern, $data['name'])) {
            $errors[] = 'Invalid content detected';
            break;
        }
    }
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Prepare email content
    $subject = 'New Contact Form Submission - Akrotopi Apartments';
    $message_body = "
New contact form submission from Akrotopi Apartments website:

Name: {$data['name']}
Email: {$data['email']}
Phone: " . ($data['phone'] ?? 'Not provided') . "

Message:
{$data['message']}

---
Submitted on: " . date('Y-m-d H:i:s') . "
IP Address: {$client_ip}
User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown') . "
Referrer: " . ($_SERVER['HTTP_REFERER'] ?? 'Direct access') . "
";
    
    // Email headers
    $headers = [
        'From: ' . $config['email_from'],
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8',
        'MIME-Version: 1.0'
    ];
    
    // Send email
    $mail_sent = mail(
        $config['email_to'],
        $subject,
        $message_body,
        implode("\r\n", $headers)
    );
    
    if ($mail_sent) {
        // Log successful submission
        $log_entry = date('Y-m-d H:i:s') . " - Contact form submitted by {$data['name']} ({$data['email']}) from IP {$client_ip}\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } else {
        error_log('Failed to send contact form email for: ' . $data['email']);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
        ]);
    }
    
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An unexpected error occurred. Please try again later.'
    ]);
}
?>

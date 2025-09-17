<?php
/**
 * Simple Test Script for Contact Form
 * Run this to test the form handler directly
 */

echo "<h1>🧪 Contact Form Test</h1>";

// Test data
$test_data = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '+30 123 456 7890',
    'message' => 'This is a test message from the local testing script.'
];

echo "<h2>Test Data:</h2>";
echo "<pre>" . print_r($test_data, true) . "</pre>";

// Simulate POST request
$_POST = $test_data;
$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['HTTP_USER_AGENT'] = 'Test Script';
$_SERVER['HTTP_REFERER'] = 'http://localhost/test-form.php';

echo "<h2>Testing Form Handler...</h2>";

// Capture output
ob_start();
include 'assets/php/form-handler-local.php';
$output = ob_get_clean();

echo "<h3>Form Handler Response:</h3>";
echo "<pre>" . htmlspecialchars($output) . "</pre>";

// Check if test email file was created
$test_files = glob('test_email_*.txt');
if (!empty($test_files)) {
    echo "<h3>Test Email Files Created:</h3>";
    foreach ($test_files as $file) {
        echo "<p><strong>$file</strong></p>";
        echo "<pre>" . htmlspecialchars(file_get_contents($file)) . "</pre>";
    }
} else {
    echo "<p>No test email files found.</p>";
}

// Check log file
$log_file = 'assets/php/contact_log_local.txt';
if (file_exists($log_file)) {
    echo "<h3>Log File Contents:</h3>";
    echo "<pre>" . htmlspecialchars(file_get_contents($log_file)) . "</pre>";
} else {
    echo "<p>Log file not found: $log_file</p>";
}

echo "<h2>✅ Test Complete!</h2>";
echo "<p><a href='test-forms.html'>Go to Interactive Test Forms</a></p>";
echo "<p><a href='assets/php/admin.php'>Go to Admin Interface</a></p>";
?>

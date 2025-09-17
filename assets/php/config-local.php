<?php
/**
 * Local Testing Configuration for Akrotopi Apartments
 * Use this for local development and testing
 */

return [
    // Email settings for local testing
    'email_to' => 'test@localhost.com',           // Change to your email for testing
    'email_from' => 'noreply@localhost.com',      // Local from address
    
    // Form validation settings
    'max_message_length' => 2000,               // Maximum message length
    'max_name_length' => 100,                   // Maximum name length
    
    // Security settings (relaxed for testing)
    'rate_limit' => 10,                         // More submissions allowed for testing
    'honeypot_field' => 'website',              // Hidden field name for bot detection
    
    // Logging settings
    'log_submissions' => true,                  // Whether to log form submissions
    'log_file' => 'contact_log_local.txt',      // Separate log file for local testing
    
    // Additional security
    'allowed_origins' => [                      // Allowed origins for CORS
        'http://localhost',
        'http://127.0.0.1',
        'http://localhost:8000',
        'http://127.0.0.1:8000'
    ],
    
    // Email template settings
    'email_subject_prefix' => '[LOCAL TEST] Akrotopi Contact Form: ',
    'include_ip_in_email' => true,              // Include IP address in email
    'include_user_agent' => true,               // Include user agent in email
    
    // Local testing mode
    'local_testing' => true,                    // Enable local testing features
    'debug_mode' => true,                       // Enable debug output
];
?>

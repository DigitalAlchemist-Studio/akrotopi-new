<?php
/**
 * Configuration file for Akrotopi Apartments form handler
 * Update these settings as needed
 */

return [
    // Email settings
    'email_to' => 'info@akrotopi.gr',           // Where to send form submissions
    'email_from' => 'noreply@akrotopi.gr',      // From address for emails
    
    // Form validation settings
    'max_message_length' => 2000,               // Maximum message length
    'max_name_length' => 100,                   // Maximum name length
    
    // Security settings
    'rate_limit' => 5,                          // Max submissions per hour per IP
    'honeypot_field' => 'website',              // Hidden field name for bot detection
    
    // Logging settings
    'log_submissions' => true,                  // Whether to log form submissions
    'log_file' => 'contact_log.txt',            // Log file name
    
    // Additional security
    'allowed_origins' => [                      // Allowed origins for CORS
        'https://akrotopi.gr',
        'https://www.akrotopi.gr',
        'http://localhost',                     // For development
        'http://127.0.0.1'                     // For development
    ],
    
    // Email template settings
    'email_subject_prefix' => 'Akrotopi Contact Form: ',
    'include_ip_in_email' => true,              // Include IP address in email
    'include_user_agent' => true,               // Include user agent in email
];
?>

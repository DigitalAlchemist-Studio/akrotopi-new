# Secure Contact Form System for Akrotopi Apartments

This secure form handling system processes contact form submissions from both the FAQ and contact pages with comprehensive security measures.

## Features

### Security Features
- **Rate Limiting**: Maximum 5 submissions per hour per IP address
- **Honeypot Protection**: Hidden field to catch automated bots
- **Input Sanitization**: All inputs are cleaned and validated
- **XSS Protection**: HTML encoding prevents cross-site scripting
- **CSRF Protection**: Request validation and origin checking
- **SQL Injection Prevention**: No database queries, file-based logging only

### Validation Features
- **Client-side Validation**: Real-time field validation with user feedback
- **Server-side Validation**: Comprehensive server-side validation
- **Email Format Validation**: Proper email address validation
- **Phone Number Validation**: Greek phone number format validation
- **Length Limits**: Configurable maximum lengths for all fields
- **Required Field Validation**: Ensures all required fields are filled

### User Experience Features
- **Real-time Feedback**: Immediate validation feedback
- **Loading States**: Visual feedback during form submission
- **Success/Error Messages**: Clear user feedback
- **Auto-hide Messages**: Success messages auto-hide after 5 seconds
- **Form Reset**: Form clears after successful submission
- **Accessibility**: Proper ARIA labels and keyboard navigation

## File Structure

```
assets/
├── php/
│   ├── form-handler.php    # Main form processing script
│   ├── config.php          # Configuration settings
│   ├── admin.php           # Admin interface (optional)
│   └── README.md           # This file
└── js/
    └── form-handler.js     # Client-side form handling
```

## Setup Instructions

### 1. Server Requirements
- PHP 7.4 or higher
- Email functionality enabled (mail() function)
- Write permissions for log files

### 2. Configuration
Edit `config.php` to customize settings:

```php
return [
    'email_to' => 'info@akrotopi.gr',           // Your email address
    'email_from' => 'noreply@akrotopi.gr',      // From address
    'rate_limit' => 5,                          // Submissions per hour
    'max_message_length' => 2000,               // Max message length
    // ... other settings
];
```

### 3. Email Setup
Ensure your server can send emails. For production, consider:
- Using SMTP instead of mail() function
- Setting up proper SPF/DKIM records
- Using a dedicated email service (SendGrid, Mailgun, etc.)

### 4. File Permissions
Ensure the PHP directory has write permissions for log files:
```bash
chmod 755 assets/php/
chmod 644 assets/php/*.php
```

### 5. Security Considerations
- Change the admin password in `admin.php`
- Consider implementing proper authentication
- Use HTTPS in production
- Regularly monitor log files
- Consider using a database instead of log files for production

## Usage

### Form Submission Process
1. User fills out form on contact.html or faq.html
2. Client-side validation runs in real-time
3. Form submits via AJAX to form-handler.php
4. Server validates and sanitizes all input
5. Email is sent to configured address
6. User receives success/error feedback
7. Submission is logged (if enabled)

### Admin Interface
Access the admin interface at `/assets/php/admin.php` to view form submissions.

**Default password**: `akrotopi2024` (change this!)

## Customization

### Adding New Fields
1. Add the field to your HTML form
2. Update validation in `form-handler.js`
3. Add server-side validation in `form-handler.php`
4. Update email template in `form-handler.php`

### Styling
Form validation styles are included in `form-handler.js`. Customize the CSS variables at the bottom of the file.

### Email Template
Modify the email template in `form-handler.php` around line 150:

```php
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
";
```

## Troubleshooting

### Common Issues

**Emails not sending:**
- Check server mail configuration
- Verify email addresses in config.php
- Check server error logs

**Form not submitting:**
- Check browser console for JavaScript errors
- Verify file paths are correct
- Ensure PHP script is accessible

**Validation not working:**
- Check that form-handler.js is loaded
- Verify form has correct class names
- Check browser console for errors

### Debug Mode
To enable debug mode, add this to the top of `form-handler.php`:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Security Best Practices

1. **Regular Updates**: Keep PHP and server software updated
2. **Monitor Logs**: Regularly check submission logs for suspicious activity
3. **Rate Limiting**: Adjust rate limits based on your traffic
4. **Input Validation**: Never trust user input
5. **Error Handling**: Don't expose sensitive information in error messages
6. **HTTPS**: Always use HTTPS in production
7. **Backup**: Regularly backup log files and configuration

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server error logs
3. Test with a simple form submission
4. Verify all file permissions and paths

## License

This form handling system is provided as-is for the Akrotopi Apartments website. Modify as needed for your specific requirements.

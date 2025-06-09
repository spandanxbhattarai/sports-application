export const verificationEmailTemplate = (name, confirmationCode) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 0 0 5px 5px;
        }
        .code {
            background-color: #eee;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-size: 24px;
            margin: 20px 0;
            letter-spacing: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Email Verification</h1>
    </div>
    <div class="content">
        <p>Hello ${name},</p>
        <p>Thank you for registering with us. To complete your registration, please use the following verification code:</p>
        <div class="code">${confirmationCode}</div>
        <p>This code will expire in 24 hours.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
    </div>
    <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</body>
</html>
`; 
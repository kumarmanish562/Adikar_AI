import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import settings

def send_otp_email(email: str, otp_code: str, purpose: str):
    """Send OTP via email"""
    try:
        # Email configuration - use SMTP_USERNAME if available, otherwise SMTP_USER
        sender_email = getattr(settings, 'SMTP_USERNAME', None) or getattr(settings, 'SMTP_USER', 'noreply@adikarai.com')
        sender_password = getattr(settings, 'SMTP_PASSWORD', '')
        smtp_server = getattr(settings, 'SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = getattr(settings, 'SMTP_PORT', 587)
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Adikar AI - Your OTP Code"
        message["From"] = sender_email
        message["To"] = email
        
        # Email body
        if purpose == "password_reset":
            text = f"""
            Hello,
            
            Your OTP code for password reset is: {otp_code}
            
            This code will expire in 10 minutes.
            
            If you didn't request this, please ignore this email.
            
            Best regards,
            Adikar AI Team
            """
            html = f"""
            <html>
              <body>
                <h2>Password Reset OTP</h2>
                <p>Your OTP code is: <strong style="font-size: 24px;">{otp_code}</strong></p>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <hr>
                <p><small>Adikar AI - Your Legal Assistant</small></p>
              </body>
            </html>
            """
        else:
            text = f"""
            Hello,
            
            Your OTP code for registration is: {otp_code}
            
            This code will expire in 10 minutes.
            
            Best regards,
            Adikar AI Team
            """
            html = f"""
            <html>
              <body>
                <h2>Registration OTP</h2>
                <p>Your OTP code is: <strong style="font-size: 24px;">{otp_code}</strong></p>
                <p>This code will expire in 10 minutes.</p>
                <hr>
                <p><small>Adikar AI - Your Legal Assistant</small></p>
              </body>
            </html>
            """
        
        # Create plain text and HTML parts
        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")
        
        message.attach(part1)
        message.attach(part2)
        
        # Send email
        if smtp_server and sender_password:
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, email, message.as_string())
            return True
        else:
            # For development: just print the OTP
            print(f"[DEV MODE] OTP for {email}: {otp_code}")
            return True
            
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        # In development, still return True so the flow continues
        print(f"[DEV MODE] OTP for {email}: {otp_code}")
        return True

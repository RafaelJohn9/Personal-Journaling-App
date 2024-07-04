#!/usr/bin/env python3
""" component containg otp functions """
from email.mime.text import MIMEText # pylint: disable=import-error
import os
import random
import smtplib
import string
from app import redis_conn

def generate_otp(length=6):
    """Generate a random OTP of specified length."""
    return ''.join(random.choices(string.digits, k=length))


def store_otp_in_redis(email, otp, expiration=7200):
    """Store the OTP in Redis with an expiration time of 2 hours (7200 seconds)."""
    redis_conn.setex(email, expiration, otp)


def send_otp_email(email, otp):
    """Send the OTP to the user's email address."""
    smtp_server = os.getenv('SMTP_SERVER','smtp.gmail.com')
    smtp_port = int(os.getenv('SMTP_PORT', "587"))
    smtp_username = os.getenv('SMPT_USERNAME', 'personaljournal2@gmail.com')
    smtp_password = os.getenv('SMPT_PASSWORD', 'hfee duiu wzus ikzm')
    from_email = smtp_username

    subject = 'Your OTP Code'
    body = f'Your OTP code is {otp}. Valid for 2 hours'

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = email

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(from_email, email, msg.as_string())

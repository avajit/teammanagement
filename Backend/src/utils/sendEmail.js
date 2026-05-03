const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass || user === 'yourgmail@gmail.com' || pass === 'your_gmail_app_password') {
    console.log('\n====================================');
    console.log('📬  EMAIL FALLBACK LOGGER 📬');
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${text}`);
    console.log('====================================\n');
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: user,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error('\n⚠️ Gmail SMTP error:', err.message);
    console.log('Falling back to direct console logging...');
    console.log('\n====================================');
    console.log('📬  EMAIL FALLBACK LOGGER 📬');
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${text}`);
    console.log('====================================\n');
    return false; // Return false but do NOT throw to prevent API failure.
  }
};

module.exports = sendEmail;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ashpython86@gmail.com', // Replace with your email
        pass: 'zlaf dbdk flai ycmm'    // Replace with your email password
    }
});

const mailOptions = {
    from: 'ashpython86@gmail.com',
    to: 'lindix332@gmail.com', // Replace with recipient's email
    subject: 'Test Email',
    text: 'This is a test email.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

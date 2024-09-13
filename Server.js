const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve all static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    console.log("Received Data:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ashpython86@gmail.com', // Replace with your email
            pass: 'zlaf dbdk flai ycmm'    // Replace with your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'lindix332@gmail.com', // Replace with recipient's email
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send the email. Please try again later.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

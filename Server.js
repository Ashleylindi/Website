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
            user: 'ashpython86@gmail.com', // Your email
            pass: 'zlaf dbdk flai ycmm'    // Your email password
        }
    });

    // Email to yourself with the user's message
    const mailToSelfOptions = {
        from: 'ashpython86@gmail.com', // Your email
        to: 'ashpython86@gmail.com', // Your email (recipient)
        subject: `Contact Form Submission from ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
        replyTo: email // So you can reply directly to the user
    };

    // Email to the user to thank them for contacting you
    const mailToUserOptions = {
        from: 'ashpython86@gmail.com', // Your email
        to: email, // The user's email (sender)
        subject: 'Thank you for contacting us!',
        text: `Hello ${name},\n\nThank you for contacting us. We have received your message and are working on your request. We will get back to you soon.\n\nBest regards,\nAshley`
    };

    // Send the email to yourself
    transporter.sendMail(mailToSelfOptions, (error, info) => {
        if (error) {
            console.error('Error sending email to self:', error);
        } else {
            console.log('Email to self sent:', info.response);
        }
    });

    // Send the thank-you email to the user
    transporter.sendMail(mailToUserOptions, (error, info) => {
        if (error) {
            console.error('Error sending thank-you email:', error);
            return res.status(500).json({ error: 'Failed to send the thank-you email. Please try again later.' });
        }
        console.log('Thank-you email sent:', info.response);
        res.status(200).json({ message: 'Thank-you email sent successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

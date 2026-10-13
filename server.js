const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'part7'))); // launches site w node serv made


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nandaallada2007@gmail.com',
        pass: 'zlfs lrtb ardg cosb' 
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const mailOptions = {
        from: email,
        to: 'nandaallada2007@gmail.com',
        subject: `New message from Shark Site: ${name}`,
        text: `You have received a new message from your shark website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully from ${email}`);
        res.status(200).json({ success: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
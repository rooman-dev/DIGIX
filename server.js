const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

// Security middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname)));

// Email configuration
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'DIGIX Lab Backend Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_FORM_EMAIL || 'rooman.dev@gmail.com',
            replyTo: email,
            subject: `📧 Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
                        📧 New Contact Form Submission
                    </h2>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>👤 Name:</strong> ${name}</p>
                        <p><strong>📧 Email:</strong> ${email}</p>
                        <p><strong>📝 Subject:</strong> ${subject}</p>
                        <p><strong>💬 Message:</strong></p>
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3B82F6;">
                            ${message}
                        </div>
                    </div>
                    <p style="color: #6B7280; font-size: 12px;">
                        📅 Submitted: ${new Date().toLocaleString()}<br>
                        🌐 DIGIX Lab Website Contact Form
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Course Registration Form Submission
app.post('/api/register', async (req, res) => {
    try {
        const formData = req.body;

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.course) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and course selection are required'
            });
        }

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.REGISTRATION_FORM_EMAIL || 'rooman.dev@gmail.com',
            replyTo: formData.email,
            subject: `🎓 New Registration: ${formData.course} - ${formData.fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
                        🎓 New Course Registration
                    </h2>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1E1E1E; margin-top: 0;">👤 Personal Information</h3>
                        <p><strong>Name:</strong> ${formData.fullName}</p>
                        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Age:</strong> ${formData.age || 'Not provided'}</p>
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1E1E1E; margin-top: 0;">🎓 Educational Background</h3>
                        <p><strong>Education Level:</strong> ${formData.education || 'Not specified'}</p>
                        <p><strong>Field of Study:</strong> ${formData.field || 'Not specified'}</p>
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1E1E1E; margin-top: 0;">💼 Professional Background</h3>
                        <p><strong>Experience Level:</strong> ${formData.experience || 'Not specified'}</p>
                        <p><strong>Current Role:</strong> ${formData.currentRole || 'Not specified'}</p>
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1E1E1E; margin-top: 0;">🎯 Course Preferences</h3>
                        <p><strong>Selected Course:</strong> ${formData.course}</p>
                        <p><strong>Motivation:</strong> ${formData.motivation || 'Not provided'}</p>
                        <p><strong>Preferred Schedule:</strong> ${formData.schedule || 'Not specified'}</p>
                        <p><strong>Start Date:</strong> ${formData.startDate || 'Flexible'}</p>
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1E1E1E; margin-top: 0;">💬 Additional Information</h3>
                        <p><strong>Questions/Requirements:</strong> ${formData.questions || 'None'}</p>
                        <p><strong>Newsletter Subscription:</strong> ${formData.newsletter ? '✅ Yes' : '❌ No'}</p>
                        <p><strong>Free Consultation:</strong> ${formData.consultation ? '✅ Requested' : '❌ Not requested'}</p>
                    </div>

                    <div style="background: #22C55E; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">🚀 Next Steps</h3>
                        <p style="margin-bottom: 0;">
                            • Contact student within 24 hours<br>
                            • Send course details and schedule<br>
                            • Process enrollment if consultation requested
                        </p>
                    </div>

                    <p style="color: #6B7280; font-size: 12px;">
                        📅 Submitted: ${new Date().toLocaleString()}<br>
                        🌐 DIGIX Lab Course Registration System
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            message: `Thank you, ${formData.fullName}! Your registration for "${formData.course}" has been submitted successfully. We will contact you within 24 hours.`
        });

    } catch (error) {
        console.error('Registration form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit registration. Please try again later.'
        });
    }
});

// Consultation Form Submission
app.post('/api/consultation', async (req, res) => {
    try {
        const { fullName, phone, email, company, serviceType, message } = req.body;

        // Basic validation
        if (!fullName || !email || !phone || !serviceType) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, phone, and service type are required'
            });
        }

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONSULTATION_FORM_EMAIL || 'rooman.dev@gmail.com',
            replyTo: email,
            subject: `🤝 New Consultation Request: ${serviceType} - ${fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366F1; border-bottom: 2px solid #6366F1; padding-bottom: 10px;">
                        🤝 New Consultation Request
                    </h2>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1E1E1E; margin-top: 0;">👤 Client Information</h3>
                        <p><strong>Name:</strong> ${fullName}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1E1E1E; margin-top: 0;">🎯 Service Requirements</h3>
                        <p><strong>Service Interest:</strong> ${serviceType}</p>
                        <p><strong>Project Details:</strong></p>
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #6366F1;">
                            ${message || 'No additional details provided'}
                        </div>
                    </div>

                    <div style="background: #6366F1; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">🚀 Next Steps</h3>
                        <p style="margin-bottom: 0;">
                            • Schedule consultation call within 24 hours<br>
                            • Prepare service proposal and pricing<br>
                            • Send follow-up email with meeting details
                        </p>
                    </div>

                    <p style="color: #6B7280; font-size: 12px;">
                        📅 Submitted: ${new Date().toLocaleString()}<br>
                        🌐 DIGIX Lab Consultation Request System
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            message: `Thank you, ${fullName}! Your consultation request has been submitted successfully. We will contact you within 24 hours to schedule your free consultation.`
        });

    } catch (error) {
        console.error('Consultation form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit consultation request. Please try again later.'
        });
    }
});

// Serve the main HTML file for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 DIGIX Lab Backend Server running on port ${PORT}`);
    console.log(`📧 Email service configured: ${process.env.EMAIL_SERVICE || 'gmail'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log(`📬 Emails will be sent from: ${process.env.EMAIL_USER}`);
});

module.exports = app;

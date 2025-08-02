const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = this.createTransporter();
    }

    createTransporter() {
        return nodemailer.createTransporter({
            service: process.env.EMAIL_SERVICE || 'gmail',
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(mailOptions) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return {
                success: true,
                messageId: info.messageId,
                response: info.response
            };
        } catch (error) {
            console.error('Email sending error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Contact Form Email
    async sendContactFormEmail(formData) {
        const { name, email, subject, message, submittedAt } = formData;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #3B82F6, #6366F1); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #374151; }
                .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #d1d5db; }
                .footer { background: #1f2937; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">DIGIX Lab</div>
                    <h2>New Contact Form Submission</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">📧 From:</div>
                        <div class="value">${name} &lt;${email}&gt;</div>
                    </div>
                    <div class="field">
                        <div class="label">📝 Subject:</div>
                        <div class="value">${subject}</div>
                    </div>
                    <div class="field">
                        <div class="label">💬 Message:</div>
                        <div class="value">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                    <div class="field">
                        <div class="label">📅 Submitted At:</div>
                        <div class="value">${new Date(submittedAt).toLocaleString()}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>This email was sent from the DIGIX Lab website contact form.</p>
                    <p>Please respond to the sender at: ${email}</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"DIGIX Lab Website" <${process.env.EMAIL_USER}>`,
            to: process.env.CONTACT_FORM_EMAIL,
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: htmlContent,
            text: `
New Contact Form Submission

From: ${name} <${email}>
Subject: ${subject}
Message: ${message}
Submitted At: ${new Date(submittedAt).toLocaleString()}

Please respond to the sender at: ${email}
            `
        };

        return await this.sendEmail(mailOptions);
    }

    // Course Registration Email
    async sendRegistrationFormEmail(formData) {
        const {
            course, fullName, phone, email, age, education, field, experience,
            currentRole, motivation, schedule, startDate, questions, newsletter,
            consultation, submittedAt
        } = formData;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 700px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #3B82F6, #6366F1); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                .section { margin-bottom: 25px; }
                .section-title { background: #e5e7eb; padding: 10px; margin-bottom: 15px; font-weight: bold; border-radius: 4px; }
                .field { margin-bottom: 12px; }
                .label { font-weight: bold; color: #374151; display: inline-block; min-width: 150px; }
                .value { margin-left: 10px; }
                .course-highlight { background: #22c55e; color: white; padding: 10px; text-align: center; border-radius: 4px; font-size: 18px; font-weight: bold; }
                .footer { background: #1f2937; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .urgent { color: #ef4444; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">DIGIX Lab</div>
                    <h2>🎓 New Course Registration</h2>
                </div>
                <div class="content">
                    <div class="course-highlight">
                        📚 ${course}
                    </div>
                    
                    <div class="section">
                        <div class="section-title">👤 Personal Information</div>
                        <div class="field">
                            <span class="label">Full Name:</span>
                            <span class="value">${fullName}</span>
                        </div>
                        <div class="field">
                            <span class="label">Email:</span>
                            <span class="value">${email}</span>
                        </div>
                        <div class="field">
                            <span class="label">Phone:</span>
                            <span class="value">${phone}</span>
                        </div>
                        <div class="field">
                            <span class="label">Age:</span>
                            <span class="value">${age}</span>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">🎯 Background Information</div>
                        <div class="field">
                            <span class="label">Education:</span>
                            <span class="value">${education}</span>
                        </div>
                        <div class="field">
                            <span class="label">Field of Study:</span>
                            <span class="value">${field || 'Not specified'}</span>
                        </div>
                        <div class="field">
                            <span class="label">Experience Level:</span>
                            <span class="value">${experience}</span>
                        </div>
                        <div class="field">
                            <span class="label">Current Role:</span>
                            <span class="value">${currentRole || 'Not specified'}</span>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">📝 Course Preferences</div>
                        <div class="field">
                            <span class="label">Preferred Schedule:</span>
                            <span class="value">${schedule}</span>
                        </div>
                        <div class="field">
                            <span class="label">Preferred Start Date:</span>
                            <span class="value">${startDate ? new Date(startDate).toLocaleDateString() : 'Not specified'}</span>
                        </div>
                        <div class="field">
                            <span class="label">Motivation:</span>
                            <div style="margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #d1d5db;">
                                ${motivation.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        ${questions ? `
                        <div class="field">
                            <span class="label">Questions/Comments:</span>
                            <div style="margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #d1d5db;">
                                ${questions.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        ` : ''}
                    </div>

                    <div class="section">
                        <div class="section-title">⚙️ Preferences</div>
                        <div class="field">
                            <span class="label">Newsletter Subscription:</span>
                            <span class="value">${newsletter ? '✅ Yes' : '❌ No'}</span>
                        </div>
                        <div class="field">
                            <span class="label">Free Consultation:</span>
                            <span class="value">${consultation ? '✅ Requested' : '❌ Not requested'}</span>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">📅 Submission Details</div>
                        <div class="field">
                            <span class="label">Submitted At:</span>
                            <span class="value">${new Date(submittedAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 4px; margin-top: 20px;">
                        <p class="urgent">⚡ Action Required:</p>
                        <p>Please contact ${fullName} within 24 hours at:</p>
                        <p>📧 Email: ${email}</p>
                        <p>📱 Phone: ${phone}</p>
                        ${consultation ? '<p>🗓️ <strong>Free consultation requested!</strong></p>' : ''}
                    </div>
                </div>
                <div class="footer">
                    <p>This registration was submitted through the DIGIX Lab website.</p>
                    <p>Please respond to the student within 24 hours for the best experience.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"DIGIX Lab Registrations" <${process.env.EMAIL_USER}>`,
            to: process.env.REGISTRATION_FORM_EMAIL,
            replyTo: email,
            subject: `🎓 New Registration: ${course} - ${fullName}`,
            html: htmlContent
        };

        return await this.sendEmail(mailOptions);
    }

    // Consultation Form Email
    async sendConsultationFormEmail(formData) {
        const {
            name, email, phone, company, projectType, projectDescription,
            budget, timeline, goals, submittedAt
        } = formData;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6366F1, #22C55E); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                .section { margin-bottom: 20px; }
                .field { margin-bottom: 12px; }
                .label { font-weight: bold; color: #374151; display: inline-block; min-width: 120px; }
                .value { margin-left: 10px; }
                .consultation-highlight { background: #22c55e; color: white; padding: 15px; text-align: center; border-radius: 4px; margin-bottom: 20px; }
                .footer { background: #1f2937; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .urgent { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 4px; margin-top: 15px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">DIGIX Lab</div>
                    <h2>🤝 New Consultation Request</h2>
                </div>
                <div class="content">
                    <div class="consultation-highlight">
                        <h3>💼 Free Consultation Request</h3>
                        <p>Client seeking professional guidance</p>
                    </div>
                    
                    <div class="section">
                        <h3 style="border-bottom: 2px solid #3B82F6; padding-bottom: 5px;">👤 Client Information</h3>
                        <div class="field">
                            <span class="label">Name:</span>
                            <span class="value">${name}</span>
                        </div>
                        <div class="field">
                            <span class="label">Email:</span>
                            <span class="value">${email}</span>
                        </div>
                        <div class="field">
                            <span class="label">Phone:</span>
                            <span class="value">${phone}</span>
                        </div>
                        ${company ? `
                        <div class="field">
                            <span class="label">Company:</span>
                            <span class="value">${company}</span>
                        </div>
                        ` : ''}
                    </div>

                    <div class="section">
                        <h3 style="border-bottom: 2px solid #6366F1; padding-bottom: 5px;">🚀 Project Details</h3>
                        <div class="field">
                            <span class="label">Project Type:</span>
                            <span class="value">${projectType}</span>
                        </div>
                        ${budget ? `
                        <div class="field">
                            <span class="label">Budget Range:</span>
                            <span class="value">${budget}</span>
                        </div>
                        ` : ''}
                        ${timeline ? `
                        <div class="field">
                            <span class="label">Timeline:</span>
                            <span class="value">${timeline}</span>
                        </div>
                        ` : ''}
                        <div class="field">
                            <span class="label">Project Description:</span>
                            <div style="margin-top: 8px; padding: 12px; background: white; border-radius: 4px; border: 1px solid #d1d5db;">
                                ${projectDescription.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        ${goals ? `
                        <div class="field">
                            <span class="label">Project Goals:</span>
                            <div style="margin-top: 8px; padding: 12px; background: white; border-radius: 4px; border: 1px solid #d1d5db;">
                                ${goals.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        ` : ''}
                    </div>

                    <div class="section">
                        <h3 style="border-bottom: 2px solid #22C55E; padding-bottom: 5px;">📅 Submission Info</h3>
                        <div class="field">
                            <span class="label">Submitted:</span>
                            <span class="value">${new Date(submittedAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <div class="urgent">
                        <p><strong>⚡ Action Required:</strong></p>
                        <p>Schedule consultation with ${name} within 24 hours:</p>
                        <p>📧 <strong>Email:</strong> ${email}</p>
                        <p>📱 <strong>Phone:</strong> ${phone}</p>
                        <p>💼 <strong>Project:</strong> ${projectType}</p>
                    </div>
                </div>
                <div class="footer">
                    <p>This consultation request was submitted through the DIGIX Lab website.</p>
                    <p>Please respond within 24 hours to maintain client satisfaction.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"DIGIX Lab Consultations" <${process.env.EMAIL_USER}>`,
            to: process.env.CONSULTATION_FORM_EMAIL,
            replyTo: email,
            subject: `🤝 New Consultation Request: ${projectType} - ${name}`,
            html: htmlContent
        };

        return await this.sendEmail(mailOptions);
    }
}

module.exports = new EmailService();

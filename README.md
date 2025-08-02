# DIGIX Lab Backend Setup Guide

## 📋 Overview
This backend server handles form submissions from the DIGIX Lab website and sends formatted emails to the specified recipients. It includes:

- Contact form submissions
- Course registration submissions  
- Consultation request submissions
- Email validation and formatting
- Rate limiting and security features

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /path/to/DIGIX
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure it:
```bash
copy .env.example .env
```

Edit `.env` with your settings:
```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=labdigix@gmail.com
EMAIL_PASS=your-gmail-app-password

# Recipient Emails
CONTACT_FORM_EMAIL=labdigix@gmail.com
REGISTRATION_FORM_EMAIL=labdigix@gmail.com
CONSULTATION_FORM_EMAIL=labdigix@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Gmail App Password Setup
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Generate an "App Password" for Mail
4. Use this 16-character password in `EMAIL_PASS`

### 4. Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

## 📧 Email Configuration

### Gmail Setup (Recommended)
- **Service**: Gmail SMTP
- **Host**: smtp.gmail.com
- **Port**: 587
- **Security**: TLS/STARTTLS
- **Authentication**: App Password (required for 2FA accounts)

### Other Email Providers
The system supports other SMTP providers. Update these variables:
```env
EMAIL_SERVICE=your-provider
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## 🔗 API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status and configuration

### Contact Form
- **POST** `/api/contact`
- Required fields: `name`, `email`, `subject`, `message`

### Course Registration
- **POST** `/api/register`  
- Required fields: `course`, `fullName`, `phone`, `email`, `age`, `education`, `experience`, `motivation`, `schedule`

### Consultation Request
- **POST** `/api/consultation`
- Required fields: `name`, `email`, `phone`, `projectType`, `projectDescription`

## 📝 Form Data Validation

### Contact Form
```javascript
{
  name: "string (2-100 chars)",
  email: "valid email address",
  subject: "string (5-200 chars)", 
  message: "string (10-2000 chars)"
}
```

### Registration Form
```javascript
{
  course: "string (required)",
  fullName: "string (2-100 chars)",
  phone: "valid phone number",
  email: "valid email address",
  age: "number (14-70)",
  education: "high-school|bachelors|masters|phd|diploma|other",
  field: "string (optional, max 100 chars)",
  experience: "beginner|intermediate|advanced",
  currentRole: "string (optional, max 100 chars)",
  motivation: "string (20-1000 chars)",
  schedule: "morning|afternoon|evening|weekend|flexible",
  startDate: "date (optional, future date)",
  questions: "string (optional, max 500 chars)",
  newsletter: "boolean",
  consultation: "boolean"
}
```

### Consultation Form
```javascript
{
  name: "string (2-100 chars)",
  email: "valid email address",
  phone: "valid phone number",
  company: "string (optional, max 100 chars)",
  projectType: "web-development|mobile-app|game-development|animation-vfx|ui-ux-design|ai-ml|cybersecurity|digital-marketing|e-commerce|other",
  projectDescription: "string (20-2000 chars)",
  budget: "under-10k|10k-25k|25k-50k|50k-100k|over-100k|not-sure",
  timeline: "asap|1-month|2-3-months|3-6-months|6-months-plus|flexible",
  goals: "string (optional, max 1000 chars)"
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers middleware
- **Input Validation**: Joi schema validation
- **XSS Protection**: Built-in Express protections

## 📊 Email Templates

### Contact Form Email
- **Subject**: `Contact Form: [subject]`
- **To**: `CONTACT_FORM_EMAIL`
- **Reply-To**: User's email
- **Format**: Professional HTML template with user details

### Registration Email  
- **Subject**: `🎓 New Registration: [course] - [name]`
- **To**: `REGISTRATION_FORM_EMAIL`
- **Reply-To**: Student's email
- **Format**: Comprehensive HTML template with all registration details
- **Highlights**: Course selection, personal info, preferences, action items

### Consultation Email
- **Subject**: `🤝 New Consultation Request: [projectType] - [name]`
- **To**: `CONSULTATION_FORM_EMAIL` 
- **Reply-To**: Client's email
- **Format**: Professional HTML template with project details
- **Highlights**: Client info, project requirements, budget, timeline

## 🚀 Deployment

### Local Development
```bash
npm run dev
```
Server runs on `http://localhost:3000`

### Production Deployment
1. Set `NODE_ENV=production` in `.env`
2. Configure production email settings
3. Deploy to your hosting platform (Heroku, DigitalOcean, AWS, etc.)
4. Update `FRONTEND_URL` to your domain

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
EMAIL_USER=labdigix@gmail.com
EMAIL_PASS=your-production-app-password
CONTACT_FORM_EMAIL=labdigix@gmail.com
REGISTRATION_FORM_EMAIL=labdigix@gmail.com
CONSULTATION_FORM_EMAIL=labdigix@gmail.com
FRONTEND_URL=https://yourdomain.com
```

## 🐛 Troubleshooting

### Email Not Sending
1. Check Gmail app password is correct
2. Verify EMAIL_USER and EMAIL_PASS in .env
3. Check if 2FA is enabled on Gmail account
4. Look at server logs for detailed error messages

### CORS Errors
- Update `FRONTEND_URL` in .env to match your domain
- Check that frontend is making requests to correct API endpoints

### Validation Errors
- Check that form data matches expected schema
- Review console logs for detailed validation messages
- Ensure required fields are being sent

### Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Adjust `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS` if needed

## 📞 Support

For technical support or questions:
- **Email**: labdigix@gmail.com
- **GitHub**: Check the repository issues
- **Documentation**: Refer to this README and code comments

## 🔄 Updates and Maintenance

### Regular Tasks
1. Monitor email delivery success rates
2. Review server logs for errors
3. Update dependencies regularly
4. Back up environment configuration

### Adding New Form Types
1. Create validation schema in `validators/formValidators.js`
2. Add email template in `services/emailService.js`
3. Create API endpoint in `server.js`
4. Update frontend form handling

## 📈 Monitoring

### Health Check
GET `/api/health` returns:
```json
{
  "status": "OK",
  "message": "DIGIX Lab Backend Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

### Logs
Monitor these log entries:
- Email sending success/failure
- Form validation errors
- Rate limiting triggers
- Server startup confirmation

---

**Created for DIGIX Lab - Digital Innovation and Excellence**

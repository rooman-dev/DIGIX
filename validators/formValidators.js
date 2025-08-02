const Joi = require('joi');

// Contact Form Validation
const validateContactForm = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                'string.empty': 'Name is required',
                'string.min': 'Name must be at least 2 characters long',
                'string.max': 'Name cannot exceed 100 characters'
            }),
        
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please enter a valid email address'
            }),
        
        subject: Joi.string()
            .min(5)
            .max(200)
            .required()
            .messages({
                'string.empty': 'Subject is required',
                'string.min': 'Subject must be at least 5 characters long',
                'string.max': 'Subject cannot exceed 200 characters'
            }),
        
        message: Joi.string()
            .min(10)
            .max(2000)
            .required()
            .messages({
                'string.empty': 'Message is required',
                'string.min': 'Message must be at least 10 characters long',
                'string.max': 'Message cannot exceed 2000 characters'
            })
    });

    return schema.validate(data, { abortEarly: false });
};

// Course Registration Form Validation
const validateRegistrationForm = (data) => {
    const schema = Joi.object({
        course: Joi.string()
            .required()
            .messages({
                'string.empty': 'Course selection is required'
            }),
        
        fullName: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                'string.empty': 'Full name is required',
                'string.min': 'Full name must be at least 2 characters long',
                'string.max': 'Full name cannot exceed 100 characters'
            }),
        
        phone: Joi.string()
            .pattern(/^[\+]?[0-9\-\(\)\s]{10,}$/)
            .required()
            .messages({
                'string.empty': 'Phone number is required',
                'string.pattern.base': 'Please enter a valid phone number'
            }),
        
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please enter a valid email address'
            }),
        
        age: Joi.number()
            .integer()
            .min(14)
            .max(70)
            .required()
            .messages({
                'number.base': 'Age must be a number',
                'number.integer': 'Age must be a whole number',
                'number.min': 'Age must be at least 14',
                'number.max': 'Age cannot exceed 70',
                'any.required': 'Age is required'
            }),
        
        education: Joi.string()
            .valid('high-school', 'bachelors', 'masters', 'phd', 'diploma', 'other')
            .required()
            .messages({
                'any.only': 'Please select a valid education level',
                'string.empty': 'Education level is required'
            }),
        
        field: Joi.string()
            .max(100)
            .allow('')
            .messages({
                'string.max': 'Field of study cannot exceed 100 characters'
            }),
        
        experience: Joi.string()
            .valid('beginner', 'intermediate', 'advanced')
            .required()
            .messages({
                'any.only': 'Please select a valid experience level',
                'string.empty': 'Experience level is required'
            }),
        
        currentRole: Joi.string()
            .max(100)
            .allow('')
            .messages({
                'string.max': 'Current role cannot exceed 100 characters'
            }),
        
        motivation: Joi.string()
            .min(20)
            .max(1000)
            .required()
            .messages({
                'string.empty': 'Motivation is required',
                'string.min': 'Please provide at least 20 characters explaining your motivation',
                'string.max': 'Motivation cannot exceed 1000 characters'
            }),
        
        schedule: Joi.string()
            .valid('morning', 'afternoon', 'evening', 'weekend', 'flexible')
            .required()
            .messages({
                'any.only': 'Please select a valid schedule preference',
                'string.empty': 'Schedule preference is required'
            }),
        
        startDate: Joi.date()
            .min('now')
            .allow('')
            .messages({
                'date.min': 'Start date cannot be in the past'
            }),
        
        questions: Joi.string()
            .max(500)
            .allow('')
            .messages({
                'string.max': 'Questions cannot exceed 500 characters'
            }),
        
        newsletter: Joi.boolean()
            .default(false),
        
        consultation: Joi.boolean()
            .default(false)
    });

    return schema.validate(data, { abortEarly: false });
};

// Consultation Form Validation
const validateConsultationForm = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                'string.empty': 'Name is required',
                'string.min': 'Name must be at least 2 characters long',
                'string.max': 'Name cannot exceed 100 characters'
            }),
        
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please enter a valid email address'
            }),
        
        phone: Joi.string()
            .pattern(/^[\+]?[0-9\-\(\)\s]{10,}$/)
            .required()
            .messages({
                'string.empty': 'Phone number is required',
                'string.pattern.base': 'Please enter a valid phone number'
            }),
        
        company: Joi.string()
            .max(100)
            .allow('')
            .messages({
                'string.max': 'Company name cannot exceed 100 characters'
            }),
        
        projectType: Joi.string()
            .valid(
                'web-development',
                'mobile-app',
                'game-development',
                'animation-vfx',
                'ui-ux-design',
                'ai-ml',
                'cybersecurity',
                'digital-marketing',
                'e-commerce',
                'other'
            )
            .required()
            .messages({
                'any.only': 'Please select a valid project type',
                'string.empty': 'Project type is required'
            }),
        
        projectDescription: Joi.string()
            .min(20)
            .max(2000)
            .required()
            .messages({
                'string.empty': 'Project description is required',
                'string.min': 'Please provide at least 20 characters describing your project',
                'string.max': 'Project description cannot exceed 2000 characters'
            }),
        
        budget: Joi.string()
            .valid(
                'under-10k',
                '10k-25k',
                '25k-50k',
                '50k-100k',
                'over-100k',
                'not-sure'
            )
            .allow('')
            .messages({
                'any.only': 'Please select a valid budget range'
            }),
        
        timeline: Joi.string()
            .valid(
                'asap',
                '1-month',
                '2-3-months',
                '3-6-months',
                '6-months-plus',
                'flexible'
            )
            .allow('')
            .messages({
                'any.only': 'Please select a valid timeline'
            }),
        
        goals: Joi.string()
            .max(1000)
            .allow('')
            .messages({
                'string.max': 'Goals cannot exceed 1000 characters'
            })
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = {
    validateContactForm,
    validateRegistrationForm,
    validateConsultationForm
};

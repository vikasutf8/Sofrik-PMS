import Joi from 'joi';

// User validation schemas
export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    })
});


export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

export const createProjectSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      'string.max': 'Project title cannot exceed 100 characters',
      'any.required': 'Project title is required'
    }),
  description: Joi.string()
    .trim()
    .max(1000)
    .required()
    .messages({
          'string.max': 'Project description cannot exceed 1000 characters',
      'any.required': 'Project description is required'
    }),
  status: Joi.string()
    .valid('active', 'completed')
    .default('active')
    .messages({
      'any.only': 'Status must be either active or completed'
    })
});


export const updateProjectSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100)
    .messages({
      'string.max': 'Project title cannot exceed 100 characters'
    }),
  description: Joi.string()
    .trim()
    .max(1000)
    .messages({
      'string.max': 'Project description cannot exceed 1000 characters'
    }),
  status: Joi.string()
    .valid('active', 'completed')
    .messages({
      'any.only': 'Status must be either active or completed'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Task validation schemas
export const createTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      'string.max': 'Task title cannot exceed 100 characters',
      'any.required': 'Task title is required'
    }),
  description: Joi.string()
    .trim()
    .max(1000)
    .required()
    .messages({
      'string.max': 'Task description cannot exceed 1000 characters',
      'any.required': 'Task description is required'
    }),
  status: Joi.string()
    .valid('todo', 'in-progress', 'done')
    .default('todo')
    .messages({
      'any.only': 'Status must be todo, in-progress, or done'
    }),
  dueDate: Joi.date()
    .greater('now')
    .messages({
      'date.greater': 'Due date must be in the future'
    })
});

export const updateTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100)
    .messages({
      'string.max': 'Task title cannot exceed 100 characters'
    }),
  description: Joi.string()
    .trim()
    .max(1000)
    .messages({
      'string.max': 'Task description cannot exceed 1000 characters'
    }),
  status: Joi.string()
    .valid('todo', 'in-progress', 'done')
    .messages({
      'any.only': 'Status must be todo, in-progress, or done'
    }),
  dueDate: Joi.date()
    .greater('now')
    .allow(null)
    .messages({
      'date.greater': 'Due date must be in the future'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Query validation schemas
export const taskFilterSchema = Joi.object({
  status: Joi.string()
    .valid('todo', 'in-progress', 'done')
    .messages({
      'any.only': 'Status must be todo, in-progress, or done'
    })
});

export const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be greater than 0'
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be greater than 0',
      'number.max': 'Limit cannot exceed 100'
    })
});
     


// Project validation schemas
// export const createProjectSchema = Joi.object({
//   title: Joi.string()
//     .trim()
//     .max(100)
//     .required()
//     .messages({
//       'string.max': 'Project title cannot exceed 100 characters',
//       'any.required': 'Project title is required'
//     }),
//   description: Joi.string()
//     .trim()
//     .max(1000)
//     .required()
//     .messages({
//       'string.max': 'Project description cannot exceed 1000 characters',
//       'any.required': 'Project description is required'
//     }),
//     status: Joi.string()
//     .valid('active', 'completed')
//     .default('active')
//     .messages({
//         'any.only': 'Status must be either active or completed'
//     }),
//     // clientEmail: Joi.string()
//     // .email()
//     // .required()
//     // .messages({
//     //     'string.email': 'Please provide a valid client email address',
//     //     'any.required': 'Client email is required'
//     // })
// })
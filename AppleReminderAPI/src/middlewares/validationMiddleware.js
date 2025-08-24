import { ZodError } from 'zod';
import ERROR_MESSAGES from '../constants/errorMessages.js';

export function validateData(schema) {
  return (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Missing request body' });
      }

      const validated = schema.parse(req.body);
      req.validatedBody = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));
        return res.status(400).json({
          error: ERROR_MESSAGES.INVALID_DATA,
          details: errorMessages,
        });
      }

      // Any other error (DB issue, server crash, etc.)
      return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
}

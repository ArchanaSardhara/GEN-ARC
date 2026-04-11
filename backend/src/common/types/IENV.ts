import z from 'zod';
import { appModeObj } from '../static/app.mode.obj';

export const IENVZod = z.object({
  NODE_ENV: z.enum(Object.values(appModeObj) as [string, ...string[]], {
    message: `NODE_ENV must be one of: ${Object.values(appModeObj).join(', ')}`,
  }),

  PORT: z.coerce
    .number({
      message: 'PORT must be a number',
    })
    .min(1, 'PORT must be greater than 0')
    .max(65535, 'PORT must be a valid port'),

  API_URL_PREFIX: z
    .string()
    .min(1, 'API_URL_PREFIX is required')
    .default('api'),

  API_BASE_UR: z.string().url('API_BASE_UR must be a valid URL'),

  UI_BASE_URL: z.string().url('UI_BASE_URL must be a valid URL'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
});

export type IENV = z.infer<typeof IENVZod>;

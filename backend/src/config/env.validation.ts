import { IENVZod, IENV } from '../common/types/IENV';

export function validateEnv(config: Record<string, unknown>): IENV {
  const parsed = IENVZod.safeParse(config);

  if (!parsed.success) {
    console.error('Invalid environment variables:\n');

    parsed.error.issues.forEach((err) => {
      console.error(`- ${err.path.join('.')}: ${err.message}`);
    });

    process.exit(1); //STOP APP
  }

  return parsed.data;
}

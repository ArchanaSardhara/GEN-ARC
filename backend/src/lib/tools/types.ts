import { Intent } from 'src/types/intent';

export interface ToolArgs {
  userId: string;
  message: string;
  args: Partial<Intent>;
}

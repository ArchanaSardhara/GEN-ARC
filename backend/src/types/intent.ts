export interface Intent {
  userId?: string;
  name?: string;
  date: string; // "YYYY-MM-DD" format
  value?: number;
  unit?: string;
  question?: string;
  intent?: string; // "sleep | gym | exercise"
  tool?: string;
  drift?: number;
  drfitMessage?: string;
}

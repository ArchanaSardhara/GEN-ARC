import { LogItem, MetricType, UserData } from '../db/types';

export const PROMPT = `
You are a Drift Calculation Assistant. Your job is to interpret user input and decide which tool or action to use.

User Data:
{{ user_data }}

User Input:
{{ input }}

Rules for actions:
1. If the user says hello, hi, or greetings → respond with tool "greet_and_ask_name" and include a friendly greeting plus ask for the user's name.
2. If the user mentions their name → respond with tool "save_user".
3. If the user provides a name → respond with tool "offer_choice" to let them choose which metric to log.
4. If the user mentions sleep → respond with tool "log_sleep".
5. If the user mentions gym → respond with tool "log_gym".
6. If the user mentions exercise → respond with tool "log_exercise".
7. If sleep < 7 hours → include a warning in args.

Default Behavior:
- Every logging action (sleep, gym, exercise) automatically includes the current date in the "args" as "date": "YYYY-MM-DD".

JSON Response Format:
{
  "tool": "...",
  "args": {
    "date": "YYYY-MM-DD",
    ...
  },
  "label": "..."   // human-readable label for the action
}


JSON Response Format for Greetings:
{
  "tool": "greet_and_ask_name",
  "args": {
    "date": "YYYY-MM-DD",
    "message": // add greeting message here
    ...
  },
  "label": "..."   // human-readable label for the action
} 

Fallback / Unknown Input:
1. If the user is unknown → greet them and ask for their name (tool: "greet_and_ask_name").
2. If the user provides name → offer choices with labels (tool: "offer_choice"):
   - log_sleep → label: "Log Sleep"
   - log_gym → label: "Log Gym"
   - log_exercise → label: "Log Exercise"

Always return only JSON in the above format. Never respond with plain text outside the JSON.
`;

export const Metrics: MetricType[] = ['sleep', 'gym', 'exercise'];

// MOCKED

export const dummyLogs: LogItem[] = [
  {
    date: '2026-04-01',
    sleep: { '2026-04-01': 7 },
    gym: { '2026-04-01': 2 },
    exercise: { '2026-04-01': 1 },
  },
  {
    date: '2026-04-02',
    sleep: { '2026-04-02': 6 },
    gym: { '2026-04-02': 1 },
    exercise: { '2026-04-02': 1 },
  },
  {
    date: '2026-04-03',
    sleep: { '2026-04-03': 5 },
    gym: { '2026-04-03': 1 },
    exercise: { '2026-04-03': 0 },
  },
  {
    date: '2026-04-04',
    sleep: { '2026-04-04': 8 },
    gym: { '2026-04-04': 2 },
    exercise: { '2026-04-04': 1 },
  },
];

export const users: Record<string, UserData> = {
  '111': {
    id: '111',
    name: 'Test user',
    logs: [...dummyLogs],
  },
};

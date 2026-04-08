import { ToolArgs } from './types';

const greetings = [
  "Hey there! I'm your Drift Assistant. What's your name?",
  "Hi! I'd love to help you track your habits. What should I call you?",
  "Hello! Ready to log your day? First, what's your name?",
  "Hey! Glad you're here. I'm your habit tracker—what's your name?",
  "Hi there! Let's get started. What's your name?",
  "Hello! I'm here to help you stay on track. What's your name?",
  "Hey! Let's crush your goals today. What's your name?",
  "Hi! Ready to build better habits? What's your name?",
  "Hello! Let's make today productive—what's your name?",
  "Hello! I'm your Drift Assistant. May I know your name?",
  "Hi, welcome! I'll help you track your activities. What's your name?",
  'Greetings! Please tell me your name to get started.',
  'Hey hey! What should I call you?',
  "Hi! Before we start, what's your name?",
  'Hello there! Who am I chatting with today?',
];

interface GreetToolArgs {
  message?: string;
  label?: string;
}

export const grettingTool = {
  name: 'greet_and_ask_name',

  execute({ message, args }: ToolArgs) {
    if (message)
      return {
        userId: args.userId,
        message: message,
        args: args,
      };

    const randomInt = Math.floor(Math.random() * 14);
    return {
      userId: args.userId,
      message: greetings[randomInt],
      args: args,
    };
  },
};

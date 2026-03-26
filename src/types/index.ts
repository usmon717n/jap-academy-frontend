export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'ADMIN';
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Topic {
  id: string;
  name: string;
  symbol: string;
  number: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  _count?: { questions: number };
  questions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: number;
  topicId: string;
}

export interface Result {
  id: string;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  timeSpent: number;
  answers: AnswerDetail[];
  createdAt: string;
  topic: { name: string; symbol: string; color: string };
}

export interface AnswerDetail {
  questionId: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Contact {
  id: string;
  fullName: string;
  phone: string;
  message: string;
  isHandled: boolean;
  createdAt: string;
}

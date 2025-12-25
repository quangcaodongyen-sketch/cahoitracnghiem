
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  userAnswers: number[];
  isFinished: boolean;
  isExplanationVisible: boolean;
}

export interface ExplanationResponse {
  explanation: string;
  example: string;
  translation: string;
}

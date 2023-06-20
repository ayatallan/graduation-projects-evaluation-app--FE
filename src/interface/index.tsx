export interface Question {
    id: number
    question: string;
    options: string[];
    type: string;
    Class: string;
    weight: number
  }
  export interface QuizQuestion {
    question: string;
    options: string[];
    weight: number;
    Class: string;
    type: string;
    answer: number;
  }
  export interface FormProps {
    onSubmit: (question: string, options: string[], type: string, Class: string, weight: number) => void;
}
export interface Instructor {
  id: number;
  name: string;
  email: string;
}
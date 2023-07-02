export interface Question {
  id: number
  question: string;
  options: string[];
  type: string;
  Class: string;
  weight: number
}
export interface QuizQuestion {
  id: Number,
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
export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
}
export interface StudentFormProps {
  onSubmit: (student: Student) => void;
}
export interface InstructorFormProps {
  onSubmit: (instructor: Instructor) => void;
}

export interface Name {
  name: string;
}
export interface StudentName {
  name: string;
}
export interface Group {
  groupName: string;
}
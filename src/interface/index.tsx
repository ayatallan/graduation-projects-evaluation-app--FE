export interface Question {
  id: number
  question: string;
  options: string[];
  type: string;
  Class: string;
  weight: number
}
export interface QuizQuestion {
  _id: string,
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
  _id: any;
  name: string;
  email: string;
}
export interface Student {
  id: number;
  _id: string;
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
  students: any;
  instructor: string;
  groupName: string;
  type : string;
}
export interface StudentReportInfo {
  id: number;
  name: string;
  groupName: string;
  projectName: string;
  result: number;
  instructorName: string;
}
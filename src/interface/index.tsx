export interface Question {
  id: number
  question: string;
  options: { option: string; weight: number }[];
  type: string;
  Class: string;
}
export interface QuizQuestion {
  _id: string,
  id: Number,
  question: string;
  options:{ option: string; weight: number }[];
  Class: string;
  type: string;
  answer: number;
}
export interface FormProps {
  onSubmit: (question: string, options: { option: string; weight: number }[], type: string, Class: string) => void;
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
  _id: any;
  id: any;
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
export interface GroupInfo {
  id: string;
  groupName: string;
  students: StudentReportInfo[];
  instructor: string; 
  type: string;
}
export interface User {
  _id: string;
  name:string;
  email:string
}
export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
}

export const assignments: Assignment[] = [
  {
    id: "1",
    title: "Data Structures - Lab 5",
    course: "CS 450",
    dueDate: new Date(2025, 9, 10),
  },
  {
    id: "2",
    title: "Calculus II - Problem Set",
    course: "MATH 210",
    dueDate: new Date(2025, 9, 12),
  },
  {
    id: "3",
    title: "English Literature Essay",
    course: "ENG 301",
    dueDate: new Date(2025, 9, 15),
  },
];

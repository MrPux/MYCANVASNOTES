// Mock Canvas API data - will be replaced with real Canvas API later

export interface CanvasAssignment {
  id: string;
  name: string;
  courseName: string;
  courseCode: string;
  dueDate: string;
}

// Mock Canvas assignments - structured to be easily parseable
export const mockCanvasAssignments: CanvasAssignment[] = [
  {
    id: "1",
    name: "Cell Biology Lab Report",
    courseName: "Introduction to Biology",
    courseCode: "BIO 101",
    dueDate: "2025-10-15"
  },
  {
    id: "2",
    name: "Data Structures Project",
    courseName: "Introduction to Programming",
    courseCode: "CS 101",
    dueDate: "2025-10-20"
  },
  {
    id: "3",
    name: "Calculus Problem Set 3",
    courseName: "Calculus I",
    courseCode: "MATH 101",
    dueDate: "2025-10-18"
  },
  {
    id: "4",
    name: "Binary Tree Implementation",
    courseName: "Data Structures & Algorithms",
    courseCode: "CS 250",
    dueDate: "2025-10-22"
  },
  {
    id: "5",
    name: "Circuit Design Project",
    courseName: "Electrical Engineering Fundamentals",
    courseCode: "ENGR 201",
    dueDate: "2025-10-25"
  },
  {
    id: "6",
    name: "Marketing Strategy Analysis",
    courseName: "Business Strategy",
    courseCode: "BUS 301",
    dueDate: "2025-10-19"
  },
  {
    id: "7",
    name: "Cognitive Psychology Essay",
    courseName: "Introduction to Psychology",
    courseCode: "PSY 101",
    dueDate: "2025-10-21"
  }
];

// Parse Canvas assignment to extract form data
export const parseCanvasAssignment = (assignment: CanvasAssignment) => {
  // Extract major code (e.g., "BIO" from "BIO 101")
  const codeMatch = assignment.courseCode.match(/^([A-Z]+)\s/);
  const majorCode = codeMatch ? codeMatch[1] : "";
  
  // Map major codes to full names
  const majorNames: Record<string, string> = {
    "BIO": "Biology",
    "CS": "Computer Science",
    "MATH": "Mathematics",
    "ENGR": "Engineering",
    "BUS": "Business Administration",
    "PSY": "Psychology"
  };
  
  return {
    majorName: majorNames[majorCode] || majorCode,
    majorCode: majorCode,
    classNumber: assignment.courseCode,
    className: assignment.courseName,
    assignmentName: assignment.name
  };
};

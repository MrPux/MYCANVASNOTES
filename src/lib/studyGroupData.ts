// Centralized data management for study groups using localStorage

export interface Assignment {
  id: string;
  name: string;
  createdAt: string;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  assignments: Assignment[];
  activeRooms: number;
  participants: number;
}

export interface Major {
  id: string;
  name: string;
  code: string;
  classes: Class[];
  classCount: number;
  activeStudents: number;
  color: string;
  borderColor: string;
}

const STORAGE_KEY = 'studyGroupData';

// Default majors with empty classes arrays
const defaultMajors: Major[] = [
  {
    id: "1",
    name: "Computer Science",
    code: "CS",
    classes: [],
    classCount: 0,
    activeStudents: 324,
    color: "from-blue-500 to-blue-600",
    borderColor: "#2563eb"
  },
  {
    id: "2",
    name: "Mathematics",
    code: "MATH",
    classes: [],
    classCount: 0,
    activeStudents: 256,
    color: "from-purple-500 to-purple-600",
    borderColor: "#9333ea"
  },
  {
    id: "3",
    name: "Engineering",
    code: "ENGR",
    classes: [],
    classCount: 0,
    activeStudents: 412,
    color: "from-orange-500 to-orange-600",
    borderColor: "#ea580c"
  },
  {
    id: "4",
    name: "Business Administration",
    code: "BUS",
    classes: [],
    classCount: 0,
    activeStudents: 389,
    color: "from-green-500 to-green-600",
    borderColor: "#16a34a"
  },
  {
    id: "5",
    name: "Biology",
    code: "BIO",
    classes: [],
    classCount: 0,
    activeStudents: 278,
    color: "from-teal-500 to-teal-600",
    borderColor: "#0d9488"
  },
  {
    id: "6",
    name: "Psychology",
    code: "PSY",
    classes: [],
    classCount: 0,
    activeStudents: 201,
    color: "from-pink-500 to-pink-600",
    borderColor: "#db2777"
  }
];

export const loadMajors = (): Major[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading study group data:', error);
  }
  return defaultMajors;
};

export const saveMajors = (majors: Major[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(majors));
  } catch (error) {
    console.error('Error saving study group data:', error);
  }
};

export const addOrUpdateMajor = (
  majorName: string,
  majorCode: string,
  classNumber: string,
  className: string,
  assignmentName: string
): { majors: Major[]; isNew: boolean; message: string } => {
  const majors = loadMajors();
  
  // Find existing major
  const existingMajorIndex = majors.findIndex(
    m => m.name.toLowerCase() === majorName.toLowerCase() || 
         m.code.toLowerCase() === majorCode.toLowerCase()
  );

  if (existingMajorIndex >= 0) {
    // Major exists, add class and assignment
    const major = majors[existingMajorIndex];
    
    // Find existing class
    const existingClassIndex = major.classes.findIndex(
      c => c.code.toLowerCase() === classNumber.toLowerCase()
    );

    if (existingClassIndex >= 0) {
      // Class exists, add assignment
      const newAssignment: Assignment = {
        id: `${Date.now()}-${Math.random()}`,
        name: assignmentName,
        createdAt: new Date().toISOString()
      };
      major.classes[existingClassIndex].assignments.push(newAssignment);
      major.classes[existingClassIndex].activeRooms += 1;
      
      saveMajors(majors);
      return {
        majors,
        isNew: false,
        message: `Assignment "${assignmentName}" added to ${classNumber} - ${className} in ${majorName}`
      };
    } else {
      // Create new class with assignment
      const newClass: Class = {
        id: `${Date.now()}-${Math.random()}`,
        name: className,
        code: classNumber,
        assignments: [{
          id: `${Date.now()}-${Math.random()}`,
          name: assignmentName,
          createdAt: new Date().toISOString()
        }],
        activeRooms: 1,
        participants: 0
      };
      major.classes.push(newClass);
      major.classCount += 1;
      
      saveMajors(majors);
      return {
        majors,
        isNew: false,
        message: `${classNumber} - ${className} and assignment "${assignmentName}" added to ${majorName}`
      };
    }
  } else {
    // Create new major with class and assignment
    const newMajor: Major = {
      id: `${Date.now()}-${Math.random()}`,
      name: majorName,
      code: majorCode.toUpperCase(),
      classes: [{
        id: `${Date.now()}-${Math.random()}`,
        name: className,
        code: classNumber,
        assignments: [{
          id: `${Date.now()}-${Math.random()}`,
          name: assignmentName,
          createdAt: new Date().toISOString()
        }],
        activeRooms: 1,
        participants: 0
      }],
      classCount: 1,
      activeStudents: 0,
      color: "from-indigo-500 to-indigo-600",
      borderColor: "#4f46e5"
    };
    majors.push(newMajor);
    
    saveMajors(majors);
    return {
      majors,
      isNew: true,
      message: `${majorName} created with class ${classNumber} - ${className} and assignment "${assignmentName}"`
    };
  }
};

export const getMajorById = (id: string): Major | undefined => {
  const majors = loadMajors();
  return majors.find(m => m.id === id);
};

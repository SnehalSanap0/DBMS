import { useState, useEffect } from 'react';
import { Subject, Faculty, Classroom, Lab, TimetableSlot } from '../types/timetable';

export const useTimetableData = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with sample data
    const initializeData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Initialize with sample data
      setSubjects([
        {
          id: '1',
          name: 'Database Management Systems',
          code: 'DBMS',
          year: 'TE',
          theoryHours: 3,
          labHours: 2,
          faculty: 'Dr. Sharma',
          semester: 3,
        },
        {
          id: '2',
          name: 'Software Engineering',
          code: 'SE',
          year: 'TE',
          theoryHours: 4,
          labHours: 2,
          faculty: 'Prof. Patel',
          semester: 3,
        },
        {
          id: '3',
          name: 'Machine Learning',
          code: 'ML',
          year: 'BE',
          theoryHours: 3,
          labHours: 4,
          faculty: 'Dr. Kumar',
          semester: 7,
        },
      ]);

      setFaculty([
        {
          id: '1',
          name: 'Dr. Sharma',
          email: 'dr.sharma@college.edu',
          phone: '+91 9876543210',
          department: 'Computer Engineering',
          subjects: ['DBMS', 'Data Structures'],
          maxHoursPerDay: 4,
          preferredSlots: ['Morning'],
        },
        {
          id: '2',
          name: 'Prof. Patel',
          email: 'prof.patel@college.edu',
          phone: '+91 9876543211',
          department: 'Computer Engineering',
          subjects: ['Software Engineering', 'Web Development'],
          maxHoursPerDay: 5,
          preferredSlots: ['Morning', 'Afternoon'],
        },
        {
          id: '3',
          name: 'Dr. Kumar',
          email: 'dr.kumar@college.edu',
          phone: '+91 9876543212',
          department: 'Computer Engineering',
          subjects: ['Machine Learning', 'AI'],
          maxHoursPerDay: 4,
          preferredSlots: ['Afternoon'],
        },
      ]);

      setClassrooms([
        {
          id: '1',
          name: 'Room A-101',
          capacity: 90,
          timeSlot: '8AM-3PM',
          assignedYear: 'SE',
          floor: 1,
          amenities: ['Projector', 'AC', 'Audio System'],
        },
        {
          id: '2',
          name: 'Room A-102',
          capacity: 90,
          timeSlot: '8AM-3PM',
          assignedYear: 'TE',
          floor: 1,
          amenities: ['Projector', 'AC', 'Audio System'],
        },
        {
          id: '3',
          name: 'Room A-103',
          capacity: 90,
          timeSlot: '8AM-3PM',
          assignedYear: 'BE',
          floor: 1,
          amenities: ['Projector', 'AC', 'Audio System'],
        },
        {
          id: '4',
          name: 'Room B-201',
          capacity: 90,
          timeSlot: '10AM-5PM',
          assignedYear: 'SE',
          floor: 2,
          amenities: ['Smart Board', 'AC', 'Audio System'],
        },
        {
          id: '5',
          name: 'Room B-202',
          capacity: 90,
          timeSlot: '10AM-5PM',
          assignedYear: 'TE',
          floor: 2,
          amenities: ['Smart Board', 'AC', 'Audio System'],
        },
        {
          id: '6',
          name: 'Room B-203',
          capacity: 90,
          timeSlot: '10AM-5PM',
          assignedYear: 'BE',
          floor: 2,
          amenities: ['Smart Board', 'AC', 'Audio System'],
        },
      ]);

      setLabs([
        {
          id: '1',
          name: 'Programming Lab 1',
          capacity: 30,
          type: 'Computer Lab',
          equipment: ['30 PCs', 'Projector', 'AC'],
          floor: 1,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          id: '2',
          name: 'Programming Lab 2',
          capacity: 30,
          type: 'Computer Lab',
          equipment: ['30 PCs', 'Projector', 'AC'],
          floor: 1,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          id: '3',
          name: 'Database Lab',
          capacity: 30,
          type: 'Specialized Lab',
          equipment: ['30 PCs', 'Server', 'Projector'],
          floor: 2,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          id: '4',
          name: 'Network Lab',
          capacity: 30,
          type: 'Specialized Lab',
          equipment: ['Network Equipment', 'Switches', 'Routers'],
          floor: 2,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          id: '5',
          name: 'AI/ML Lab',
          capacity: 30,
          type: 'Research Lab',
          equipment: ['High-end PCs', 'GPU Servers', 'Projector'],
          floor: 3,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          id: '6',
          name: 'Software Lab',
          capacity: 30,
          type: 'Development Lab',
          equipment: ['30 PCs', 'Development Tools', 'Projector'],
          floor: 3,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          id: '7',
          name: 'Project Lab',
          capacity: 30,
          type: 'General Lab',
          equipment: ['30 PCs', 'Collaboration Tools', 'Projector'],
          floor: 3,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
      ]);

      setLoading(false);
    };

    initializeData();
  }, []);

  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      ...subject,
      id: Date.now().toString(),
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  const updateSubject = (id: string, updatedSubject: Partial<Subject>) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, ...updatedSubject } : subject
    ));
  };

  const deleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  const addFaculty = (facultyMember: Omit<Faculty, 'id'>) => {
    const newFaculty: Faculty = {
      ...facultyMember,
      id: Date.now().toString(),
    };
    setFaculty(prev => [...prev, newFaculty]);
  };

  const updateFaculty = (id: string, updatedFaculty: Partial<Faculty>) => {
    setFaculty(prev => prev.map(f => 
      f.id === id ? { ...f, ...updatedFaculty } : f
    ));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
  };

  return {
    subjects,
    faculty,
    classrooms,
    labs,
    timetableSlots,
    loading,
    addSubject,
    updateSubject,
    deleteSubject,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    setTimetableSlots,
  };
};
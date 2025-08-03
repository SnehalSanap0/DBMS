import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  writeBatch,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Subject, Faculty, Classroom, Lab, TimetableSlot } from '../types/timetable';

// Collection names
export const COLLECTIONS = {
  SUBJECTS: 'subjects',
  FACULTY: 'faculty',
  CLASSROOMS: 'classrooms',
  LABORATORIES: 'laboratories',
  TIMETABLE_SLOTS: 'timetable_slots'
} as const;

// Generic CRUD operations
export class FirebaseService<T extends { id?: string }> {
  constructor(private collectionName: string) {}

  // Get all documents
  async getAll(): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, this.collectionName), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
    } catch (error) {
      console.error(`Error fetching ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Get document by ID
  async getById(id: string): Promise<T | null> {
    try {
      const docSnap = await getDoc(doc(db, this.collectionName, id));
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching ${this.collectionName} by ID:`, error);
      throw error;
    }
  }

  // Add new document
  async add(data: Omit<T, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error adding ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update document
  async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<void> {
    try {
      await updateDoc(doc(db, this.collectionName, id), {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error(`Error updating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete document
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Real-time listener
  onSnapshot(callback: (data: T[]) => void): () => void {
    const unsubscribe = onSnapshot(
      query(collection(db, this.collectionName), orderBy('createdAt', 'desc')),
      (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as T));
        callback(data);
      },
      (error) => {
        console.error(`Error in ${this.collectionName} snapshot:`, error);
      }
    );
    return unsubscribe;
  }

  // Batch operations
  async batchAdd(items: Omit<T, 'id'>[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      const collectionRef = collection(db, this.collectionName);

      items.forEach((item) => {
        const docRef = doc(collectionRef);
        batch.set(docRef, {
          ...item,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      });

      await batch.commit();
    } catch (error) {
      console.error(`Error batch adding ${this.collectionName}:`, error);
      throw error;
    }
  }
}

// Specific service instances
export const subjectsService = new FirebaseService<Subject>(COLLECTIONS.SUBJECTS);
export const facultyService = new FirebaseService<Faculty>(COLLECTIONS.FACULTY);
export const classroomsService = new FirebaseService<Classroom>(COLLECTIONS.CLASSROOMS);
export const laboratoriesService = new FirebaseService<Lab>(COLLECTIONS.LABORATORIES);
export const timetableSlotsService = new FirebaseService<TimetableSlot>(COLLECTIONS.TIMETABLE_SLOTS);

// Specialized queries
export class TimetableService {
  // Get timetable slots by year
  static async getSlotsByYear(year: string): Promise<TimetableSlot[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.TIMETABLE_SLOTS),
        where('year', '==', year),
        orderBy('day'),
        orderBy('time')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TimetableSlot));
    } catch (error) {
      console.error('Error fetching timetable slots by year:', error);
      throw error;
    }
  }

  // Get timetable slots by faculty
  static async getSlotsByFaculty(faculty: string): Promise<TimetableSlot[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.TIMETABLE_SLOTS),
        where('faculty', '==', faculty),
        orderBy('day'),
        orderBy('time')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TimetableSlot));
    } catch (error) {
      console.error('Error fetching timetable slots by faculty:', error);
      throw error;
    }
  }

  // Clear all timetable slots
  static async clearAllSlots(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.TIMETABLE_SLOTS));
      const batch = writeBatch(db);
      
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error clearing timetable slots:', error);
      throw error;
    }
  }
}

// Data initialization service
export class DataInitializationService {
  static async initializeSampleData(): Promise<void> {
    try {
      // Check if data already exists
      const subjects = await subjectsService.getAll();
      if (subjects.length > 0) {
        console.log('Sample data already exists');
        return;
      }

      // Initialize sample subjects
      const sampleSubjects: Omit<Subject, 'id'>[] = [
        {
          name: 'Database Management Systems',
          code: 'DBMS',
          year: 'TE',
          theoryHours: 3,
          labHours: 2,
          faculty: 'Dr. Sharma',
          semester: 3,
        },
        {
          name: 'Software Engineering',
          code: 'SE',
          year: 'TE',
          theoryHours: 4,
          labHours: 2,
          faculty: 'Prof. Patel',
          semester: 3,
        },
        {
          name: 'Machine Learning',
          code: 'ML',
          year: 'BE',
          theoryHours: 3,
          labHours: 4,
          faculty: 'Dr. Kumar',
          semester: 7,
        },
      ];

      // Initialize sample faculty
      const sampleFaculty: Omit<Faculty, 'id'>[] = [
        {
          name: 'Dr. Sharma',
          email: 'dr.sharma@college.edu',
          phone: '+91 9876543210',
          department: 'Computer Engineering',
          subjects: ['DBMS', 'Data Structures'],
          maxHoursPerDay: 4,
          preferredSlots: ['Morning'],
        },
        {
          name: 'Prof. Patel',
          email: 'prof.patel@college.edu',
          phone: '+91 9876543211',
          department: 'Computer Engineering',
          subjects: ['Software Engineering', 'Web Development'],
          maxHoursPerDay: 5,
          preferredSlots: ['Morning', 'Afternoon'],
        },
        {
          name: 'Dr. Kumar',
          email: 'dr.kumar@college.edu',
          phone: '+91 9876543212',
          department: 'Computer Engineering',
          subjects: ['Machine Learning', 'AI'],
          maxHoursPerDay: 4,
          preferredSlots: ['Afternoon'],
        },
      ];

      // Initialize sample classrooms
      const sampleClassrooms: Omit<Classroom, 'id'>[] = [
        {
          name: 'Room A-101',
          capacity: 90,
          timeSlot: '8AM-3PM',
          assignedYear: 'SE',
          floor: 1,
          amenities: ['Projector', 'AC', 'Audio System'],
        },
        {
          name: 'Room A-102',
          capacity: 90,
          timeSlot: '8AM-3PM',
          assignedYear: 'TE',
          floor: 1,
          amenities: ['Projector', 'AC', 'Audio System'],
        },
        {
          name: 'Room A-103',
          capacity: 90,
          timeSlot: '8AM-3PM',
          assignedYear: 'BE',
          floor: 1,
          amenities: ['Projector', 'AC', 'Audio System'],
        },
      ];

      // Initialize sample labs
      const sampleLabs: Omit<Lab, 'id'>[] = [
        {
          name: 'Programming Lab 1',
          capacity: 30,
          type: 'Computer Lab',
          equipment: ['30 PCs', 'Projector', 'AC'],
          floor: 1,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          name: 'Database Lab',
          capacity: 30,
          type: 'Specialized Lab',
          equipment: ['30 PCs', 'Server', 'Projector'],
          floor: 2,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
        {
          name: 'AI/ML Lab',
          capacity: 30,
          type: 'Research Lab',
          equipment: ['High-end PCs', 'GPU Servers', 'Projector'],
          floor: 3,
          availableHours: ['1:15-3:15', '3:15-5:15'],
        },
      ];

      // Batch add all sample data
      await Promise.all([
        subjectsService.batchAdd(sampleSubjects),
        facultyService.batchAdd(sampleFaculty),
        classroomsService.batchAdd(sampleClassrooms),
        laboratoriesService.batchAdd(sampleLabs),
      ]);

      console.log('Sample data initialized successfully');
    } catch (error) {
      console.error('Error initializing sample data:', error);
      throw error;
    }
  }
}
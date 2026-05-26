// Simple IndexedDB wrapper for Eco Talk App
const DB_NAME = 'EcoTalkDB';
const DB_VERSION = 1;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Store for student data
      if (!db.objectStoreNames.contains('students')) {
        db.createObjectStore('students', { keyPath: 'id' });
      }

      // Store for voice recordings and assessments
      if (!db.objectStoreNames.contains('assessments')) {
        const assessmentStore = db.createObjectStore('assessments', { keyPath: 'id', autoIncrement: true });
        assessmentStore.createIndex('studentId', 'studentId', { unique: false });
        assessmentStore.createIndex('topicId', 'topicId', { unique: false });
      }
    };
  });
};

export const saveStudent = async (student) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['students'], 'readwrite');
    const store = transaction.objectStore('students');
    const request = store.put(student); // student should have { id: '...', name: '...', absen: '...' }
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveAssessment = async (assessment) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assessments'], 'readwrite');
    const store = transaction.objectStore('assessments');
    // assessment { studentId, topicId, audioBlob, audioUrl (optional), timestamp, score, criteria: {...} }
    const request = store.add(assessment);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const updateAssessment = async (assessment) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assessments'], 'readwrite');
    const store = transaction.objectStore('assessments');
    const request = store.put(assessment);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAssessments = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assessments'], 'readonly');
    const store = transaction.objectStore('assessments');
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getStudents = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['students'], 'readonly');
    const store = transaction.objectStore('students');
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteAssessment = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assessments'], 'readwrite');
    const store = transaction.objectStore('assessments');
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

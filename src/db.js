import { db } from './firebase';
import { collection, doc, setDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Helper to convert Audio Blob to Base64 to store in Firestore
const blobToBase64 = (blob) => {
  if (!blob) return null;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

// Helper to convert Base64 back to Blob
const base64ToBlob = (base64, mimeType = 'audio/webm') => {
  if (!base64) return null;
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};

export const saveStudent = async (studentData) => {
  const studentsRef = collection(db, 'students');
  
  // 1. Cek apakah Nama tersebut sudah ada di database
  const nameQuery = query(studentsRef, where("name", "==", studentData.name));
  const nameSnapshot = await getDocs(nameQuery);
  
  if (!nameSnapshot.empty) {
    const existingDoc = nameSnapshot.docs[0];
    const existingData = existingDoc.data();
    
    // Jika namanya ada, cek apakah nomor absennya SAMA
    if (existingData.absen === studentData.absen) {
      // Cocok! Login berhasil.
      return { id: existingDoc.id, ...existingData };
    } else {
      // Namanya ada, tapi absennya BEDA. Tolak.
      throw new Error(`Nama "${studentData.name}" sudah terdaftar! Gunakan nama lain atau masukkan absen yang benar jika itu Anda.`);
    }
  }

  // 2. (Opsional) Cek apakah Nomor Absen tersebut sudah dipakai orang lain
  const absenQuery = query(studentsRef, where("absen", "==", studentData.absen));
  const absenSnapshot = await getDocs(absenQuery);
  
  if (!absenSnapshot.empty) {
    const existingData = absenSnapshot.docs[0].data();
    throw new Error(`Nomor Absen "${studentData.absen}" sudah dipakai oleh ${existingData.name}!`);
  }

  // 3. Jika nama & absen benar-benar baru, buat data baru
  const newStudentRef = doc(collection(db, 'students'));
  const newStudent = { ...studentData, id: newStudentRef.id };
  await setDoc(newStudentRef, newStudent);
  return newStudent;
};

export const saveAssessment = async (assessment) => {
  let base64Audio = null;
  if (assessment.audioBlob) {
    base64Audio = await blobToBase64(assessment.audioBlob);
  }
  
  const assessmentData = {
    ...assessment,
    audioBlob: null, // Remove the raw blob before saving to Firestore
    audioBase64: base64Audio
  };

  const assessmentsRef = collection(db, 'assessments');
  const docRef = await addDoc(assessmentsRef, assessmentData);
  return docRef.id;
};

export const updateAssessment = async (assessment) => {
  const docRef = doc(db, 'assessments', assessment.id);
  const dataToUpdate = { ...assessment };
  // Ensure we don't try to save blob
  delete dataToUpdate.audioBlob;
  
  if (assessment.id) {
     await updateDoc(docRef, dataToUpdate);
  }
};

export const getAssessments = async () => {
  const assessmentsRef = collection(db, 'assessments');
  const querySnapshot = await getDocs(assessmentsRef);
  return querySnapshot.docs.map(docSnapshot => {
    const data = docSnapshot.data();
    return {
      ...data,
      id: docSnapshot.id,
      // Recreate the blob so TeacherView can play it
      audioBlob: data.audioBase64 ? base64ToBlob(data.audioBase64) : null
    };
  });
};

export const getStudents = async () => {
  const studentsRef = collection(db, 'students');
  const querySnapshot = await getDocs(studentsRef);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};

export const deleteAssessment = async (id) => {
  const docRef = doc(db, 'assessments', id);
  await deleteDoc(docRef);
};

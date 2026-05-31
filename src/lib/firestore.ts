import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { QuestionnaireData } from '@/types/form';

export async function saveQuestionnaire(data: QuestionnaireData): Promise<string> {
  const docRef = await addDoc(collection(db, 'questionarios'), {
    ...data,
    submittedAt: serverTimestamp(),
  });
  return docRef.id;
}

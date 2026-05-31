import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, ensureAnonymousAuth } from './firebase';

export async function uploadPhoto(file: File): Promise<string> {
  await ensureAnonymousAuth();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `questionarios/fotos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}

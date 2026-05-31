import type { QuestionnaireData } from '@/types/form';

const STORAGE_KEY = 'opus-quaestionarium';

export function saveToStorage(data: QuestionnaireData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage not available
  }
}

export function loadFromStorage(): QuestionnaireData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuestionnaireData;
  } catch {
    return null;
  }
}

export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function saveStepToStorage(step: number): void {
  try {
    localStorage.setItem(`${STORAGE_KEY}-step`, String(step));
  } catch {
    // ignore
  }
}

export function loadStepFromStorage(): number {
  try {
    return parseInt(localStorage.getItem(`${STORAGE_KEY}-step`) ?? '1', 10) || 1;
  } catch {
    return 1;
  }
}

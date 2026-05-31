'use server';

import { sendDiscordNotification } from '@/lib/discord';
import type { QuestionnaireData } from '@/types/form';

export async function notifyDiscord(data: QuestionnaireData): Promise<void> {
  await sendDiscordNotification(data);
}

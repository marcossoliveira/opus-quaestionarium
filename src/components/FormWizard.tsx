'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from 'react-aria-components';
import { defaultFormData, STEPS, type QuestionnaireData } from '@/types/form';
import {
  saveToStorage,
  loadFromStorage,
  clearStorage,
  saveStepToStorage,
  loadStepFromStorage,
} from '@/lib/storage';
import { saveQuestionnaire } from '@/lib/firestore';
import { notifyDiscord } from '@/app/actions';
import { ThemeToggle } from './ThemeToggle';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { Step6 } from './steps/Step6';
import { Step7 } from './steps/Step7';
import { Step8 } from './steps/Step8';
import { Step9 } from './steps/Step9';
import { Step10 } from './steps/Step10';

const STEP_COMPONENTS = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10];

export function FormWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedData = loadFromStorage();
    const savedStep = loadStepFromStorage();
    if (savedData) { setData(savedData); setHasSaved(true); }
    if (savedStep >= 1 && savedStep <= 10) setStep(savedStep);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (submitted) return;
    saveToStorage(data);
    saveStepToStorage(step);
  }, [data, step, submitted]);

  // Scroll to top when changing steps
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  const onChange = useCallback((field: keyof QuestionnaireData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await saveQuestionnaire(data);
      await notifyDiscord(data);
      clearStorage();
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setSubmitError('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) return <SuccessScreen />;

  const StepComponent = STEP_COMPONENTS[step - 1];
  const currentStepInfo = STEPS[step - 1];
  const isLastStep = step === 10;
  const progress = (step / 10) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-10 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)] transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4">
          <div className={`flex items-center gap-3 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
            {/* Logo — shrinks on scroll, white in dark mode */}
            <Image
              src="/opusliberi-logo.png"
              alt="Opus Liberi"
              width={257}
              height={40}
              className={`flex-shrink-0 object-contain dark:brightness-0 dark:invert transition-all duration-300 w-auto ${scrolled ? 'h-5' : 'h-8'}`}
              priority
            />

            {/* Step info — fades in when scrolled */}
            <div className={`flex-1 min-w-0 transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <p className="text-xs text-[var(--text-secondary)] truncate">
                {currentStepInfo.icon} {currentStepInfo.title}
              </p>
            </div>

            <span className="text-xs font-medium text-[var(--text-secondary)] tabular-nums flex-shrink-0">
              {step} / 10
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-[var(--border)]" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={10}>
          <div
            className="h-full bg-[var(--brand)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Saved banner */}
      {hasSaved && step === loadStepFromStorage() && (
        <div className="max-w-2xl mx-auto w-full px-4 pt-3">
          <div className="rounded-lg bg-[var(--brand-subtle)] border border-[var(--brand)]/20 px-3 py-2 flex items-center gap-2">
            <span className="text-xs">💾</span>
            <p className="text-xs text-[var(--text-secondary)]">
              Progresso restaurado. Você pode continuar de onde parou.
            </p>
            <button
              onClick={() => setHasSaved(false)}
              className="ml-auto text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Step title */}
      <div className="max-w-2xl mx-auto w-full px-4 pt-6 pb-2">
        <h1 className="text-xl font-bold text-[var(--text)]">
          {currentStepInfo.icon} {currentStepInfo.title}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">
          Seção {step} de 10
        </p>
      </div>

      {/* Form card */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pb-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm overflow-hidden">
          <StepComponent data={data} onChange={onChange} />
        </div>

        {submitError && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-500">{submitError}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-5">
          {step > 1 && (
            <Button
              onPress={() => setStep((s) => s - 1)}
              className="flex-1 py-3.5 rounded-xl border border-[var(--border)] text-sm font-medium
                text-[var(--text)] hover:bg-[var(--brand-subtle)] hover:border-[var(--brand)]
                transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
            >
              ← Anterior
            </Button>
          )}

          {!isLastStep ? (
            <Button
              onPress={() => setStep((s) => s + 1)}
              className="flex-[2] py-3.5 rounded-xl bg-[var(--brand)] text-white text-sm font-semibold
                hover:bg-[var(--brand-hover)] active:scale-[.98] transition-all
                outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--bg)]"
            >
              Próximo →
            </Button>
          ) : (
            <Button
              onPress={handleSubmit}
              isDisabled={isSubmitting}
              className="flex-[2] py-3.5 rounded-xl bg-[var(--brand)] text-white text-sm font-semibold
                hover:bg-[var(--brand-hover)] active:scale-[.98] transition-all
                outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--bg)]
                disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="62" strokeDashoffset="20" />
                  </svg>
                  Enviando…
                </span>
              ) : (
                '✓ Enviar questionário'
              )}
            </Button>
          )}
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {STEPS.map((s) => (
            <button
              key={s.number}
              onClick={() => setStep(s.number)}
              aria-label={`Ir para seção ${s.number}: ${s.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s.number === step
                  ? 'w-6 bg-[var(--brand)]'
                  : s.number < step
                  ? 'w-1.5 bg-[var(--brand)]/50'
                  : 'w-1.5 bg-[var(--border)]'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-sm w-full text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[var(--brand-subtle)] border-2 border-[var(--brand)] flex items-center justify-center">
          <svg className="w-10 h-10 text-[var(--brand)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <Image
          src="/opusliberi-logo.png"
          alt="Opus Liberi"
          width={257}
          height={40}
          className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
        />
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Obrigado!</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm leading-relaxed">
            Sua participação foi registrada com sucesso. O Coral Opus Liberi agradece pela colaboração!
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 w-full">
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            🔒 Suas informações serão tratadas com confidencialidade, em conformidade com a LGPD.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors underline underline-offset-4"
        >
          Preencher outro formulário
        </button>
      </div>
    </div>
  );
}

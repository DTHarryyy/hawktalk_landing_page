import { useCallback, useEffect, useRef, useState } from 'react';
import type { Scenario } from '../data/types';
import { statusText } from '../data/demoScenarios';
import { getScenario, matchScenario } from '../lib/matchScenario';

export const GUEST_LIMIT = 10;
export const SOFT_CTA_AFTER = 3;

export type Phase = 'thinking' | 'tool' | 'writing' | 'done';

export type UserMessage = { id: string; role: 'user'; text: string; image?: string };
export type AiMessage = {
  id: string;
  role: 'ai';
  scenario: Scenario;
  phase: Phase;
  toolLabel?: string;
  text: string;
  stopped?: boolean;
};
export type Message = UserMessage | AiMessage;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
let uid = 0;
const nextId = () => `m${++uid}`;

/** Splits markdown into word-ish chunks, keeping whitespace so formatting survives. */
function chunk(answer: string): string[] {
  return answer.match(/\S+\s*/g) ?? [answer];
}

export function useSimulator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionsLeft, setQuestionsLeft] = useState(GUEST_LIMIT);
  const [userCount, setUserCount] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const timers = useRef<number[]>([]);
  const activeId = useRef<string | null>(null);

  const busy = messages.some((m) => m.role === 'ai' && m.phase !== 'done');

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const patchAi = useCallback((id: string, patch: Partial<AiMessage>) => {
    setMessages((prev) => prev.map((m) => (m.id === id && m.role === 'ai' ? { ...m, ...patch } : m)));
  }, []);

  const finish = useCallback(
    (id: string, scenario: Scenario) => {
      patchAi(id, { phase: 'done', text: scenario.answer, toolLabel: undefined });
      activeId.current = null;
      setAnnouncement(`HawkTalk replied: ${scenario.answer.replace(/[*_#|>`]/g, '')}`);
    },
    [patchAi],
  );

  const play = useCallback(
    (scenario: Scenario) => {
      const id = nextId();
      activeId.current = id;
      setMessages((prev) => [...prev, { id, role: 'ai', scenario, phase: 'thinking', text: '' }]);

      let t = rand(600, 1400);
      const tools: string[] = [];
      if (scenario.status === 'web') tools.push(statusText.manuals, statusText.web);
      else if (scenario.status !== 'none') tools.push(statusText[scenario.status]);

      tools.forEach((label, i) => {
        later(() => patchAi(id, { phase: 'tool', toolLabel: label }), t);
        t += i === tools.length - 1 ? rand(800, 1100) : rand(900, 1200);
      });

      const words = chunk(scenario.answer);
      later(() => patchAi(id, { phase: 'writing', toolLabel: undefined }), t);
      let acc = '';
      words.forEach((w, i) => {
        t += w.includes('|') ? 12 : rand(22, 48);
        later(() => {
          acc += w;
          if (i === words.length - 1) finish(id, scenario);
          else patchAi(id, { text: acc });
        }, t);
      });
    },
    [finish, patchAi],
  );

  const lastScenarioId = (): string | undefined => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role === 'ai') return m.scenario.id;
    }
    return undefined;
  };

  /** Send a user message. Pass `scenarioId` to force a specific scripted answer. */
  const send = useCallback(
    (text: string, scenarioId?: string, image?: string) => {
      const clean = text.trim();
      if (!clean || busy) return;
      const scenario = (scenarioId && getScenario(scenarioId)) || matchScenario(clean, lastScenarioId());
      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: clean, image: image ?? scenario.userImage }]);
      setQuestionsLeft((n) => Math.max(0, n - 1));
      setUserCount((n) => n + 1);
      setAnnouncement('');
      play(scenario);
    },
    [busy, play, messages],
  );

  const stop = useCallback(() => {
    const id = activeId.current;
    if (!id) return;
    clearTimers();
    activeId.current = null;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id && m.role === 'ai' ? { ...m, phase: 'done', stopped: true, toolLabel: undefined } : m,
      ),
    );
  }, []);

  const newChat = useCallback(() => {
    clearTimers();
    activeId.current = null;
    setMessages([]);
    setAnnouncement('');
  }, []);

  const restart = useCallback(() => {
    newChat();
    setQuestionsLeft(GUEST_LIMIT);
    setUserCount(0);
  }, [newChat]);

  return {
    messages,
    busy,
    send,
    stop,
    newChat,
    restart,
    questionsLeft,
    showSoftCta: userCount >= SOFT_CTA_AFTER,
    announcement,
  };
}

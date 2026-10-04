import type { Scenario } from '../data/types';
import { scenarios, fallbackScenario } from '../data/demoScenarios';
import { quickTopicScenarios } from '../data/quickTopics';

export const allScenarios: Scenario[] = [...scenarios, ...quickTopicScenarios];

const byId = new Map(allScenarios.map((s) => [s.id, s]));

export function getScenario(id: string): Scenario | undefined {
  return byId.get(id);
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** Levenshtein distance ≤ 1 check (cheap typo tolerance). */
function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

function wordMatches(keyword: string, tokens: string[]): boolean {
  return tokens.some((t) => {
    if (t === keyword) return true;
    if (keyword.length >= 4 && t.startsWith(keyword)) return true;
    if (keyword.length >= 6 && withinOneEdit(keyword, t.slice(0, keyword.length + 1))) return true;
    return false;
  });
}

/**
 * Pick the best scripted scenario for a typed message.
 * @param previousId id of the scenario behind the last AI reply (for follow-ups)
 */
export function matchScenario(text: string, previousId?: string): Scenario {
  const tokens = tokenize(text);
  let best: Scenario | null = null;
  let bestScore = 0;

  for (const s of allScenarios) {
    if (s.requiresContext && (!previousId || !s.requiresContext.includes(previousId))) continue;
    let score = 0;
    for (const group of s.keywords) {
      if (group.every((k) => wordMatches(k, tokens))) score += group.length;
    }
    if (score > 0 && s.requiresContext) score += 1; // prefer the follow-up reading when context exists
    if (score > bestScore) {
      best = s;
      bestScore = score;
    }
  }
  return best ?? fallbackScenario;
}

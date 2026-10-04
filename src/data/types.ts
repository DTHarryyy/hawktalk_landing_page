export type ToolStatus = 'manuals' | 'map' | 'web' | 'image' | 'none';

export type SourceRef = {
  /** Document name, e.g. "CSU Student Manual" */
  doc: string;
  page: number;
  /** Short excerpt shown in the preview popover */
  excerpt: string;
};

export type WebSource = { title: string; url: string };

export type MapInfo = {
  place: string;
  description: string;
  /** Path to a photo in /public */
  photo: string;
  /** Link for "Open live navigation" */
  navUrl: string;
};

export type ClarifyOption = {
  label: string;
  /** id of the scenario to play when this chip is clicked */
  next: string;
};

export type Scenario = {
  id: string;
  /** Short label for the "Try these" list. Omit to hide from the list. */
  title?: string;
  /** One-line description of what this scenario shows off */
  shows?: string;
  /** Canonical question that gets sent when picked from "Try these" */
  prompt: string;
  /**
   * Keyword groups for matching typed text. A group matches when ALL of its
   * words appear in the (normalized) message. Best-scoring scenario wins.
   */
  keywords: string[][];
  /** Only match if the previous AI answer was one of these scenario ids */
  requiresContext?: string[];
  status: ToolStatus;
  /** Markdown answer (GFM: bold, lists, tables) */
  answer: string;
  sources?: SourceRef[];
  webSource?: WebSource;
  map?: MapInfo;
  clarify?: ClarifyOption[];
  askAdmin?: boolean;
  /** "How HawkTalk answered this" steps */
  reasoning: string[];
  /** Optional image shown in the user's bubble (e.g. the photo demo) */
  userImage?: string;
};

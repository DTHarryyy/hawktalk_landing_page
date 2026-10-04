import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Info, PanelLeft, Plus, RotateCcw, Sparkles, X } from 'lucide-react';
import { Seo } from '../components/Seo';
import { AppLink } from '../components/AppLink';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/demo/Sidebar';
import { EmptyState } from '../components/demo/EmptyState';
import { AIMessage } from '../components/demo/AIMessage';
import { UserMessage } from '../components/demo/UserMessage';
import { Composer } from '../components/demo/Composer';
import { TryThese } from '../components/demo/TryThese';
import { AskAdminModal } from '../components/demo/AskAdminModal';
import { GUEST_LIMIT, useSimulator, type Message } from '../hooks/useSimulator';
import { photoScenarioId } from '../data/demoScenarios';
import { getScenario } from '../lib/matchScenario';
import { seo } from '../data/site';

function lastAiScenarioId(messages: Message[]) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === 'ai') return m.scenario.id;
  }
  return undefined;
}

export default function DemoPage() {
  const sim = useSimulator();
  const { messages, busy, send } = sim;
  const [params, setParams] = useSearchParams();
  const [sidebar, setSidebar] = useState(false);
  const [adminQ, setAdminQ] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [ctaDismissed, setCtaDismissed] = useState(false);
  const queued = useRef<{ text: string; id: string } | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const deepLinked = useRef(false);

  const sendRef = useRef(send);
  sendRef.current = send;

  // Deep link: /demo?q=… auto-sends once.
  useEffect(() => {
    const q = params.get('q');
    if (!q || deepLinked.current) return;
    const t = window.setTimeout(() => {
      deepLinked.current = true;
      sendRef.current(q);
      setParams({}, { replace: true });
    }, 250);
    return () => window.clearTimeout(t);
  }, [params, setParams]);

  // Play a queued follow-up once the current reply finishes.
  useEffect(() => {
    if (busy || !queued.current) return;
    const t = window.setTimeout(() => {
      const next = queued.current;
      queued.current = null;
      if (next) sendRef.current(next.text, next.id);
    }, 700);
    return () => window.clearTimeout(t);
  }, [busy]);

  // Auto-scroll to newest content (unless the visitor scrolled up to read).
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (messages.length === 0) el.scrollTop = 0;
    else if (stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const sendForced = useCallback(
    (text: string, id: string) => {
      stickToBottom.current = true;
      const s = getScenario(id);
      const ctx = lastAiScenarioId(messages);
      // Follow-up scenarios need their earlier question first — play it, then queue the follow-up.
      if (s?.requiresContext && (!ctx || !s.requiresContext.includes(ctx))) {
        const pre = getScenario(s.requiresContext[0]);
        if (pre) {
          queued.current = { text, id };
          send(pre.prompt, pre.id);
          return;
        }
      }
      send(text, id);
    },
    [messages, send],
  );

  const sendTyped = (text: string) => {
    stickToBottom.current = true;
    send(text);
  };

  const newChat = () => {
    queued.current = null;
    sim.newChat();
    setSidebar(false);
  };
  const restart = () => {
    queued.current = null;
    sim.restart();
    setCtaDismissed(false);
    setSidebar(false);
  };

  const unavailable = (feature: string) => setToast(`${feature}: available in the full app`);
  const attachPicture = () => {
    const s = getScenario(photoScenarioId);
    if (s) sendForced(s.prompt, s.id);
  };

  const userQuestionBefore = (index: number) => {
    for (let i = index - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role === 'user') return m.text;
    }
    return '';
  };

  const lastAiIndex = messages.reduce((acc, m, i) => (m.role === 'ai' ? i : acc), -1);
  const used = GUEST_LIMIT - sim.questionsLeft;

  return (
    <div className="demo">
      <Seo title={seo.demo.title} description={seo.demo.description} path="/demo" />
      <Navbar compact />

      <div className="demo-banner" role="note">
        <Info size={16} aria-hidden="true" />
        <p>
          <strong>This is a demo</strong> — answers are simulated.{' '}
          <span className="hide-xs">Try the real HawkTalk at </span>
          <a href="https://hawktalk.pages.dev" target="_blank" rel="noopener noreferrer">
            hawktalk.pages.dev
          </a>
        </p>
      </div>

      <div className="demo-shell">
        <Sidebar
          open={sidebar}
          onClose={() => setSidebar(false)}
          onNewChat={newChat}
          onRestart={restart}
          onUnavailable={unavailable}
        />

        <main className="chat" id="main">
          <header className="chat-top">
            <button type="button" className="icon-btn chat-menu" aria-label="Open chat history" onClick={() => setSidebar(true)}>
              <PanelLeft size={20} />
            </button>
            <div className="chat-brand">
              <h1 className="chat-title">HawkTalk Chat</h1>
              <span className="demo-pill">Demo</span>
            </div>
            <div className="chat-top-actions">
              <div
                className={`guest ${sim.questionsLeft <= 2 ? 'low' : ''}`}
                title="Cosmetic counter — resets when you reload"
                aria-live="polite"
              >
                <span className="guest-label">GUEST MODE</span>
                <span className="guest-count">
                  {sim.questionsLeft} of {GUEST_LIMIT}
                  <span className="hide-sm"> questions left this hour</span>
                  <span className="show-sm"> left</span>
                </span>
                <span className="guest-bar" aria-hidden="true">
                  <span style={{ width: `${(sim.questionsLeft / GUEST_LIMIT) * 100}%` }} />
                </span>
              </div>
              <button type="button" className="icon-btn" onClick={newChat} aria-label="New chat" title="New chat">
                <Plus size={20} />
              </button>
              <button type="button" className="icon-btn hide-sm" onClick={restart} aria-label="Restart demo" title="Restart demo">
                <RotateCcw size={18} />
              </button>
            </div>
          </header>

          <div className="chat-scroll" ref={scroller} onScroll={onScroll}>
            <div className="chat-col">
              {messages.length === 0 ? (
                <>
                  <EmptyState onPick={sendForced} />
                  <div className="show-lg-hide">
                    <TryThese onPick={sendForced} disabled={busy} variant="inline" />
                  </div>
                </>
              ) : (
                <div className="msgs">
                  {messages.map((m, i) =>
                    m.role === 'user' ? (
                      <UserMessage key={m.id} msg={m} />
                    ) : (
                      <AIMessage
                        key={m.id}
                        msg={m}
                        isLatest={i === lastAiIndex}
                        busy={busy}
                        question={userQuestionBefore(i)}
                        onClarify={sendForced}
                        onAskAdmin={setAdminQ}
                      />
                    ),
                  )}

                  {sim.showSoftCta && !ctaDismissed && !busy && (
                    <aside className="soft-cta" aria-label="Try the real app">
                      <Sparkles size={20} aria-hidden="true" />
                      <div>
                        <strong>Ready for the real thing?</strong>
                        <p>
                          You’ve asked {used} questions in the demo. The real HawkTalk searches the full university documents.
                        </p>
                      </div>
                      <AppLink className="btn btn-yellow btn-sm">
                        Try the real HawkTalk <ArrowUpRight size={16} aria-hidden="true" />
                      </AppLink>
                      <button type="button" className="icon-btn soft-cta-x" aria-label="Dismiss" onClick={() => setCtaDismissed(true)}>
                        <X size={16} />
                      </button>
                    </aside>
                  )}

                  {sim.questionsLeft === 0 && (
                    <p className="limit-note">
                      You’ve used all 10 guest questions in this demo. In the real app, signing in gives you a higher limit.{' '}
                      <button type="button" className="link-btn" onClick={restart}>
                        Restart demo
                      </button>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {messages.length > 0 && (
            <div className="chat-suggest show-lg-hide">
              <TryThese onPick={sendForced} disabled={busy} variant="chips" />
            </div>
          )}

          <div className="chat-bottom">
            <div className="chat-col">
              <Composer
                busy={busy}
                onSend={sendTyped}
                onStop={sim.stop}
                onAttachPicture={attachPicture}
                onUnavailable={unavailable}
              />
            </div>
          </div>

          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {sim.announcement}
          </div>
        </main>

        <aside className="demo-rail" aria-label="Demo guide">
          <TryThese onPick={sendForced} disabled={busy} />
          <div className="rail-card">
            <strong>Like what you see?</strong>
            <p>Ask anything in the real app — it searches CSU’s full official documents.</p>
            <AppLink className="btn btn-primary btn-sm">
              Try HawkTalk <ArrowUpRight size={16} aria-hidden="true" />
            </AppLink>
            <button type="button" className="btn btn-secondary btn-sm" onClick={restart}>
              <RotateCcw size={15} aria-hidden="true" /> Restart demo
            </button>
          </div>
        </aside>
      </div>

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}

      <AskAdminModal question={adminQ} onClose={() => setAdminQ(null)} />
    </div>
  );
}

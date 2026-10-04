import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { exampleQuestions } from '../../data/site';
import { Reveal } from '../Reveal';

export function ExampleChips() {
  return (
    <section className="section" aria-labelledby="examples-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Try a question</span>
          <h2 id="examples-title" className="section-title">
            Tap a question to see HawkTalk answer it
          </h2>
          <p className="section-sub">Each one opens the interactive demo with the question already sent.</p>
        </Reveal>
        <Reveal className="examples">
          {exampleQuestions.map((q) => (
            <Link key={q} className="example-chip" to={`/demo?q=${encodeURIComponent(q)}`}>
              <MessageCircle size={16} aria-hidden="true" />
              {q}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

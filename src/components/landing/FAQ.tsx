import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/site';
import { Reveal } from '../Reveal';

export function FAQ() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-wrap">
        <Reveal className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title" className="section-title">
            Questions? We’ve got answers.
          </h2>
        </Reveal>
        <div className="faq">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <details className="faq-item" open={i === 0}>
                <summary>
                  <h3>{f.q}</h3>
                  <ChevronDown size={20} aria-hidden="true" className="faq-chev" />
                </summary>
                <p>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { UserMessage as UserMsg } from '../../hooks/useSimulator';

export function UserMessage({ msg }: { msg: UserMsg }) {
  return (
    <article className="msg msg-user" aria-label="Your message">
      <div className="bubble-user">
        {msg.image && <img className="bubble-img" src={msg.image} alt="Attached photo of a campus notice (sample)" />}
        <p>{msg.text}</p>
      </div>
    </article>
  );
}

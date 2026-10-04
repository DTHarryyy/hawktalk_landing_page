import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownAnswer({ text, streaming = false }: { text: string; streaming?: boolean }) {
  return (
    <div className={`md ${streaming ? 'md-streaming' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          table: ({ node: _node, ...props }) => (
            <div className="md-table-wrap">
              <table {...props} />
            </div>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

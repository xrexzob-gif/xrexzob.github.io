import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Pre-process markdown lines
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeBlockLang = '';

  const renderInlineFormatted = (text: string) => {
    // Basic inline format parser for **bold**, *italic*, `code`, [link](url), ![img](url)
    // Replace markdown image syntax with actual img tag
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Regular expression matching markdown links, images, bold, inline code
    const tokenRegex = /(!?\[(.*?)\]\((.*?)\))|(`([^`]+)`)|\*\*([^*]+)\*\*|\*([^*]+)\*/;

    while (remaining.length > 0) {
      const match = remaining.match(tokenRegex);
      if (!match || match.index === undefined) {
        parts.push(remaining);
        break;
      }

      if (match.index > 0) {
        parts.push(remaining.substring(0, match.index));
      }

      const fullMatch = match[0];
      if (fullMatch.startsWith('![')) {
        // Image
        const alt = match[2];
        const src = match[3];
        parts.push(
          <img
            key={keyIdx++}
            src={src}
            alt={alt}
            className="inline-block max-w-full my-1 rounded border border-slate-700/50 shadow-sm"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        );
      } else if (fullMatch.startsWith('[')) {
        // Link
        const label = match[2];
        const href = match[3];
        parts.push(
          <a
            key={keyIdx++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-medium underline-offset-2"
          >
            {label}
          </a>
        );
      } else if (fullMatch.startsWith('`')) {
        // Inline code
        const codeText = match[5];
        parts.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700"
          >
            {codeText}
          </code>
        );
      } else if (fullMatch.startsWith('**')) {
        // Bold
        parts.push(<strong key={keyIdx++} className="font-bold text-slate-100">{match[6]}</strong>);
      } else if (fullMatch.startsWith('*')) {
        // Italic
        parts.push(<em key={keyIdx++} className="italic text-slate-300">{match[7]}</em>);
      }

      remaining = remaining.substring(match.index + fullMatch.length);
    }

    return parts;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        elements.push(
          <div key={`codeblock-${i}`} className="my-3 rounded-lg bg-slate-900 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
            {codeBlockLang && (
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
                {codeBlockLang}
              </div>
            )}
            <pre className="whitespace-pre">
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockLines = [];
        codeBlockLang = '';
      } else {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Horizontal Rule
    if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
      elements.push(<hr key={`hr-${i}`} className="my-6 border-slate-800" />);
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-6 mb-3 pb-2 border-b border-slate-800">
          {renderInlineFormatted(line.slice(2))}
        </h1>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-semibold tracking-tight text-white mt-5 mb-2.5 pb-1 border-b border-slate-800/60">
          {renderInlineFormatted(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg font-semibold text-slate-200 mt-4 mb-2">
          {renderInlineFormatted(line.slice(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="text-base font-semibold text-slate-300 mt-3 mb-1.5">
          {renderInlineFormatted(line.slice(5))}
        </h4>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={`quote-${i}`} className="pl-4 py-1 my-2 border-l-2 border-cyan-500/60 text-slate-400 italic text-sm">
          {renderInlineFormatted(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Unordered List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const trimmed = line.trim();
      elements.push(
        <li key={`li-${i}`} className="ml-5 list-disc text-slate-300 text-sm my-1 leading-relaxed">
          {renderInlineFormatted(trimmed.slice(2))}
        </li>
      );
      continue;
    }

    // Numbered List
    if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^\d+\.\s(.*)/);
      if (match) {
        elements.push(
          <li key={`oli-${i}`} className="ml-5 list-decimal text-slate-300 text-sm my-1 leading-relaxed">
            {renderInlineFormatted(match[1])}
          </li>
        );
        continue;
      }
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={`empty-${i}`} className="h-2" />);
      continue;
    }

    // Check if line contains standalone images or centered badges
    if (line.includes('<p align="center">') || line.includes('</p>')) {
      const cleanLine = line.replace(/<\/?p[^>]*>/g, '').trim();
      if (cleanLine) {
        elements.push(
          <div key={`centered-${i}`} className="text-center my-3">
            {renderInlineFormatted(cleanLine)}
          </div>
        );
        continue;
      }
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="text-slate-300 text-sm leading-relaxed my-1.5">
        {renderInlineFormatted(line)}
      </p>
    );
  }

  return (
    <div className="prose prose-invert max-w-none font-sans text-slate-200">
      {elements}
    </div>
  );
};

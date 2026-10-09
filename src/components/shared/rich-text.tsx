import { Fragment, type ReactNode } from 'react';

/** Only the dictionary's three explicit formatting tags are interpreted. */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const tags = /<(strong|cordis|br)>([\s\S]*?)<\/\1>/g;
  let cursor = 0;
  for (const match of text.matchAll(tags)) {
    nodes.push(text.slice(cursor, match.index));
    nodes.push(
      match[1] === 'br' ? (
        <br key={match.index} />
      ) : match[1] === 'strong' ? (
        <strong key={match.index}>{match[2]}</strong>
      ) : (
        <a
          key={match.index}
          href="https://github.com/cordiverse/cordis"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[2]}
        </a>
      ),
    );
    cursor = match.index! + match[0].length;
  }
  nodes.push(text.slice(cursor));
  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </>
  );
}

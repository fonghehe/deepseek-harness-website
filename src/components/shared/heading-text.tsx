import { Fragment } from 'react';

/** Keep native-script clusters intact; combining marks belong to a Latin span only after a Latin base. */
export function HeadingText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(<br><\/br>|[\p{Script=Latin}\p{N}][\p{Script=Latin}\p{M}\p{N}]*)/u)
        .filter(Boolean)
        .map((part, index) =>
          part === '<br></br>' ? (
            <br key={index} />
          ) : /^[\p{Script=Latin}\p{N}][\p{Script=Latin}\p{M}\p{N}]*$/u.test(part) ? (
            <span className="heading-latin" key={index}>
              {part}
            </span>
          ) : (
            <Fragment key={index}>{part}</Fragment>
          ),
        )}
    </>
  );
}

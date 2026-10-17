// WHAT THIS FILE DOES: Displays a headline that "takes form" as the page
// opens — each word starts as a thin blueprint outline and settles into
// solid, heavy type, one word after another. It's the site's signature
// move (the brand line is "Where Ideas Take Form"), used for the homepage
// headline and each page's main title. The animation itself lives in
// app/globals.css (".forming-word"); this file only splits the text into
// words. Visitors who've asked their device for reduced motion just see
// the finished headline. Screen readers read the whole headline once, not
// word by word.
//
// `as` picks the heading level (h1/h2...), `weight` the finished font
// weight, and `delay` (ms) when the first word starts.

export default function FormingText({
  text,
  as: Tag = "h1",
  className = "",
  weight = 680,
  delay = 120,
}) {
  if (!text) return null;

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag
      className={className}
      aria-label={text}
      style={{ "--form-wght": weight, "--form-delay": `${delay}ms` }}
    >
      {words.map((word, index) => (
        <span key={index} aria-hidden="true">
          <span className="forming-word" style={{ "--i": index }}>
            {word}
          </span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

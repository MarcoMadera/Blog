import FlexUlList from "components/FlexUlList";
import { ReactElement } from "react";
import { ReadingLogEntry } from "types/about";
import { Poster } from "./Poster";

interface ICurrentlyReading {
  entries: ReadingLogEntry[];
}
export function CurrentlyReading({ entries }: ICurrentlyReading): ReactElement {
  return (
    <div>
      <h4>Leyendo actualmente:</h4>
      <div className="currently-reading">
        <FlexUlList>
          {entries.map(({ work }) => (
            <Poster
              key={work.cover_edition_key}
              eventCategory="book"
              href={`https://openlibrary.org/works/${work.cover_edition_key}`}
              imgSrc={`https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`}
              label={work.title}
              title={`${work.title} - ${work.author_names.join(", ")}`}
            />
          ))}
        </FlexUlList>
      </div>
      <style jsx>{`
        .currently-reading {
          display: flex;
          align-items: center;
          margin-bottom: 1em;
          gap: 2em;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}

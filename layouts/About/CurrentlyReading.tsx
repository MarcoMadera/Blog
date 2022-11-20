import { H3, P } from "components/tags";
import { ReactElement } from "react";
import { Poster } from "./Poster";

interface ICurrentlyReading {
  title: string;
  id: string;
  author: string;
}
export function CurrentlyReading({
  title,
  id,
  author,
}: ICurrentlyReading): ReactElement {
  return (
    <div>
      <h4>Leyendo actualmente:</h4>
      <div className="currently-reading">
        <Poster
          eventCategory="book"
          href={`https://openlibrary.org/works/${id}`}
          imgSrc={`https://covers.openlibrary.org/b/olid/${id}-M.jpg`}
          label={title}
          title={title}
        />
        <div className="currently-reading__info">
          <H3 className="currently-reading__title">{title}</H3>
          <P className="currently-reading__author">{author}</P>
        </div>
      </div>
      <style jsx>{`
        .currently-reading {
          display: flex;
          align-items: center;
          margin-bottom: 1em;
          gap: 2em;
          margin-top: 2rem;
        }
        .currently-reading__info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}

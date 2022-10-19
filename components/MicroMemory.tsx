import { ReactElement } from "react";
import { IMicroMemory } from "types/microMemories";
import EmojisWrapper from "./EmojisWrapper";
import Markdown from "./Markdown";

export default function MicroMemory({
  microMemoryId,
  microMemory,
  date,
}: IMicroMemory): ReactElement | null {
  if (!microMemory) return null;

  return (
    <article className="microMemory-container" key={microMemoryId}>
      <EmojisWrapper>
        <div className="microMemory">
          <Markdown source={microMemory} type="microMemory" />
        </div>
      </EmojisWrapper>
      <div className="microMemory-meta">
        <div>
          <time dateTime={new Date(date).toISOString()}>
            {new Date(date).toLocaleDateString("es-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </time>
        </div>
      </div>
      <hr />
      <style jsx>{`
        .microMemory-container {
          display: block;
          margin: 1rem auto;
          padding: 0.5rem 0;
          min-width: 300px;
          width: 100%;
          max-width: 800px;
          font-size: 18px;
          font-weight: 400;
        }
        .microMemory {
          margin: 1rem auto;
          max-width: 40rem;
          padding: 1rem;
        }
        .microMemory :global(p) {
          line-height: 2rem;
        }
        .microMemory-meta {
          margin-bottom: 2em;
          padding-bottom: 1em;
          margin-top: 2em;
          text-align: right;
          justify-content: right;
          font-size: 0.825em;
          margin-left: auto;
          margin-right: auto;
          max-width: 40rem;
          padding: 0 1em;
        }
      `}</style>
    </article>
  );
}

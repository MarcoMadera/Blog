import { useState } from "react";
import { siteMetadata } from "site.config";
import { HomeData } from "types/posts";
import { database } from "lib/firebase/client";
import { limitToLast, onValue, query, ref } from "firebase/database";
import { IMicroMemory } from "types/microMemories";
import MicroMemory from "components/MicroMemories/MicroMemory";
import { ReactElement } from "rehype-react/lib";
import ActionButton from "components/ActionButton";

interface IMicroMemories {
  microMemories: HomeData["microMemories"];
}

export default function MicroMemories({
  microMemories,
}: IMicroMemories): ReactElement {
  const { items = [], totalItems = 0 } = microMemories || {};
  const [allMicroMemories, setAllMicroMemories] = useState(items);
  const [timesLoadedMicroMemories, setTimesLoadedMicroMemories] = useState(1);
  const { microMemoriesPerPage } = siteMetadata;

  const handleLoadMoreMicroMemories = () => {
    setTimesLoadedMicroMemories(timesLoadedMicroMemories + 1);
    const microMemoryRef = ref(database, "micromemories/memory");
    const currentMicroMemoriesNumber = allMicroMemories.length;
    const limit = currentMicroMemoriesNumber + microMemoriesPerPage;
    const end = limit > totalItems ? totalItems : limit;
    const microMemoryQuery = query(microMemoryRef, limitToLast(end));

    onValue(microMemoryQuery, (snapshot) => {
      const microMemories: IMicroMemory[] = [];

      snapshot.forEach((snap) => {
        microMemories.unshift(snap.val());
      });

      setAllMicroMemories(microMemories);
    });
  };

  return (
    <section>
      {allMicroMemories.length > 0 && (
        <h2 className="microMemory-header">Micro blogging</h2>
      )}
      {allMicroMemories.length > 0 &&
        allMicroMemories.map((micro) => {
          return <MicroMemory key={micro.microMemoryId} {...micro} />;
        })}
      {allMicroMemories.length < totalItems && (
        <ActionButton onClick={handleLoadMoreMicroMemories} type="button">
          Cargar más
        </ActionButton>
      )}
      <style jsx>{`
        section {
          display: grid;
          grid-gap: 2em;
          grid-template-columns: auto;
        }
        .microMemory-header {
          margin: 3rem auto 0;
        }
        section :global(.actionButton) {
          margin: 0 auto;
          display: block;
          max-width: 300px;
          padding: 0.5rem 1rem;
          font-weight: 400;
          text-align: center;
          border-radius: 0.5rem;
          transition: all 0.2s ease-in-out;
          background: transparent;
          border-width: 3px;
        }
        section :global(.actionButton:hover) {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}

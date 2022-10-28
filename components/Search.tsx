import useDarkMode from "hooks/useDarkMode";
import Link from "next/link";
import { ReactElement, useEffect, useRef, useState } from "react";
import { colors } from "styles/theme";
import { Input, P } from "./tags";

export default function Search(): ReactElement {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { darkMode } = useDarkMode();
  const [results, setResults] = useState<
    {
      title: string;
      description: string;
      url: string;
    }[]
  >([]);

  const searchEndpoint = (query: string) => {
    return `/api/search?q=${query}`;
  };

  const onClick = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isTyping && query) {
      timer = setTimeout(() => {
        if (!isTyping && query) {
          setShouldSearch(true);
        }
      }, 1500);
    }

    if (!query) {
      setResults([]);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [query, isTyping, setResults]);

  useEffect(() => {
    async function searchQuery() {
      if (query.length > 0) {
        fetch(searchEndpoint(query))
          .then((res) => res.json())
          .then((data) => {
            setResults(data.results);
          });
      } else {
        setResults([]);
      }
      setShouldSearch(false);
    }
    if (shouldSearch && query) {
      searchQuery();
    }
  }, [query, shouldSearch, setResults]);

  return (
    <div ref={searchRef}>
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          const query = e.target.value;
          setQuery(query);
          setActive(true);
          setIsTyping(true);
        }}
        onFocus={() => {
          setActive(true);
          window.addEventListener("click", onClick);
        }}
        autoCorrect="off"
        autoCapitalize="off"
        onKeyUp={() => {
          setIsTyping(false);
        }}
        placeholder="Buscar en el blog"
      />
      {active && results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <>
              {index > 0 && <hr />}
              <li key={result.url}>
                <Link
                  href={result.url}
                  onClick={() => {
                    setActive(false);
                  }}
                >
                  <h3>{result.title}</h3>
                  <P>{result.description}</P>
                </Link>
              </li>
            </>
          ))}
        </ul>
      )}

      <style jsx>{`
        div {
          position: relative;
        }
        ul {
          position: absolute;
          top: 150%;
          left: 0;
          width: max-content;
          min-width: 100%;
          max-width: 500px;
          padding: 0;
          margin: 0;
          list-style: none;
          background: ${darkMode ? colors.cinder : colors.white};
          border: 1px solid ${darkMode ? colors.carbonGrey : colors.geyser};
          border-radius: 0.25rem;
          z-index: 9999999999999;
          max-height: 500px;
          overflow-y: auto;
        }
        li {
          padding: 0.5rem;
        }
        li:hover h3,
        li:hover :global(p) {
          color: ${darkMode ? colors.lavaRed : colors.redBerry};
        }
        @media (max-width: 648px) {
          ul {
            max-width: 100%;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}

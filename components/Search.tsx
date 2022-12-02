import useDarkMode from "hooks/useDarkMode";
import useNotification from "hooks/useNotification";
import Link from "next/link";
import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import { colors } from "styles/theme";
import { Input, P } from "./tags";

interface ISearchResults {
  results: {
    title: string;
    description: string;
    url: string;
  }[];
  handleClose: () => void;
}

function SearchResults({ results, handleClose }: ISearchResults): ReactElement {
  const { darkMode } = useDarkMode();
  const ulRef = useRef<HTMLUListElement>(null);
  const [ulPos, setUlPos] = useState({
    x: 0,
  });
  useLayoutEffect(() => {
    if (!ulRef.current) {
      return;
    }
    const ulRectWitdh = ulRef.current.getClientRects()[0]?.width || 0;
    const ulRectLeft = ulRef.current.getClientRects()[0]?.left || 0;
    const isUlWitdhOffScreen = innerWidth - 30 - ulRectLeft < ulRectWitdh;
    if (isUlWitdhOffScreen) {
      setUlPos((prevState) => ({
        ...prevState,
        x: innerWidth - ulRectWitdh - ulRectLeft - 35,
      }));
    }
  }, [results]);

  return (
    <ul ref={ulRef}>
      {results.map((result, index) => (
        <Fragment key={result.url}>
          {index > 0 && <hr />}
          <li>
            <Link href={result.url} onClick={handleClose}>
              <h3>{result.title}</h3>
              <P>{result.description}</P>
            </Link>
          </li>
        </Fragment>
      ))}
      <style jsx>{`
        ul {
          position: absolute;
          font-size: 14px;
          user-select: none;
          width: max-content;
          min-width: 100%;
          max-width: 500px;
          padding: 0;
          margin: 0;
          list-style: none;
          background: ${darkMode ? colors.cinder : colors.white};
          border: 1px solid ${darkMode ? colors.carbonGrey : colors.geyser};
          border-radius: 0.25rem;
          z-index: 999;
          max-height: 500px;
          overflow-y: auto;
          height: max-content;
          top: 60px;
          left: ${`${ulPos.x}px`};
        }
        li :global(a) {
          margin: 0;
          display: grid;
          gap: 0.6rem;
          padding: 1rem 0.6rem;
          text-decoration: none;
          color: inherit;
          grid-template-rows: none;
        }
        li h3,
        li :global(p) {
          margin: 0;
        }
        li:hover h3,
        li:hover :global(p) {
          margin: 0;
          color: ${darkMode ? colors.lavaRed : colors.redBerry};
        }
        @media (max-width: 500px) {
          ul {
            max-width: calc(100vw - 60px);
            left: 0;
          }
        }
      `}</style>
    </ul>
  );
}

export default function Search(): ReactElement {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [results, setResults] = useState<
    {
      title: string;
      description: string;
      url: string;
    }[]
  >([]);
  const { addNotification } = useNotification();

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
      }, 1000);
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
            if (data.results.length === 0) {
              addNotification({
                message: "Sin resultados, intenta buscar algo diferente",
                variant: "info",
              });
            }
          });
      } else {
        setResults([]);
      }
      setShouldSearch(false);
    }
    if (shouldSearch && query) {
      searchQuery();
    }
  }, [query, shouldSearch, setResults, addNotification]);

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
        <SearchResults
          results={results}
          handleClose={() => {
            setActive(false);
          }}
        />
      )}
      <style jsx>{`
        div {
          position: relative;
        }
      `}</style>
    </div>
  );
}

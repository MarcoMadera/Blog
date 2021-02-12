import { A } from "./tags";
import slugify from "react-slugify";
import PropTypes from "prop-types";

function Section({ children }) {
  return <section>{children}</section>;
}

function Heading({ children }) {
  return <h2 id="headerMenu">{children}</h2>;
}

function OrderedList({ children }) {
  return <ol>{children}</ol>;
}

function ListItem({ children }) {
  return <li>{children}</li>;
}

export default function TableOfContents({ content = [] }) {
  return (
    <nav aria-labelledby="headerMenu">
      <Section>
        <Heading>Tabla de contenido</Heading>
        {content.length > 0 && (
          <OrderedList>
            {content.map((item, i) => (
              <ListItem key={i}>
                <A title="" href={`#${slugify(item)}`}>
                  {item}
                </A>
              </ListItem>
            ))}
          </OrderedList>
        )}
      </Section>
      <style jsx>{`
        :global(body) {
          overflow-x: visible;
        }
        nav {
          grid-area: toc;
        }
        nav :global(a) {
          display: block;
          width: fit-content;
        }
        nav :global(a:hover),
        nav :global(a:focus) {
          text-decoration: none;
        }
        nav :global(h2) {
          font-size: 18px;
          font-weight: 600;
          line-height: 43px;
        }
        nav :global(li) {
          list-style: none;
          margin: 10px 0;
        }
        nav :global(section) {
          position: sticky;
          top: 0px;
        }
      `}</style>
    </nav>
  );
}

TableOfContents.propTypes = {
  content: PropTypes.array,
};
Section.propTypes = {
  children: PropTypes.node,
};
ListItem.propTypes = {
  children: PropTypes.node,
};
OrderedList.propTypes = {
  children: PropTypes.node,
};
Heading.propTypes = {
  children: PropTypes.node,
};

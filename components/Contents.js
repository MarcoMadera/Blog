import slugify from "react-slugify";
import PropTypes from "prop-types";
import { A } from "./tags";

const Section = ({ children }) => <section>{children}</section>;

const Heading = ({ children }) => <h2 id="headerMenu">{children}</h2>;

const OrderedList = ({ children }) => <ol>{children}</ol>;

const ListItem = ({ children }) => <li>{children}</li>;

const Contents = ({ content = [] }) => {
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
        nav {
          grid-area: toc;
        }
        :global(body) {
          overflow-x: visible;
        }
        nav :global(li) {
          list-style: none;
          margin: 10px 0;
        }
        nav :global(section) {
          position: sticky;
          top: 0px;
        }
        nav :global(a) {
          width: fit-content;
          display: block;
        }
        nav :global(a:hover),
        nav :global(a:focus) {
          text-decoration: none;
        }
        nav :global(h2) {
          font-size: 18px;
          line-height: 43px;
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
};

Contents.propTypes = {
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

export default Contents;

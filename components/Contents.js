import slugify from "react-slugify";
import PropTypes from "prop-types";
import { colors } from "../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
const Anchor = ({ href, children }) => <a href={href}>{children}</a>;

const Section = ({ children }) => <section>{children}</section>;

const Heading = ({ children }) => <h2>{children}</h2>;

const Contents = ({ content = [] }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <aside>
      {content.length > 0 && (
        <Section>
          <Heading>Tabla de contenido</Heading>
          {content.map((element, i) => (
            <Anchor key={i} href={`#${slugify(element)}`}>
              {element}
            </Anchor>
          ))}
        </Section>
      )}
      <style global jsx>
        {`
          body {
            overflow-x: visible;
          }
        `}
      </style>
      <style jsx>{`
        aside :global(section) {
          margin-top: 40px;
          position: sticky;
          top: 0px;
        }
        aside :global(a) {
          color: ${darkMode ? colors.darkPrimary : colors.primary};
          list-style: circle;
          display: block;
          margin: 10px 0;
          width: fit-content;
        }
        aside :global(a:hover),
        aside :global(a:focus) {
          color: ${darkMode ? colors.darkSecondary : colors.secondary};
        }
        aside :global(h2) {
          font-size: 18px;
          margin: 1em 0;
          font-weight: 600;
        }
      `}</style>
    </aside>
  );
};

Contents.propTypes = {
  content: PropTypes.array,
};
Section.propTypes = {
  children: PropTypes.node,
};
Heading.propTypes = {
  children: PropTypes.node,
};
Anchor.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default Contents;

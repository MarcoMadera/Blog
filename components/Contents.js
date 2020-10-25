import slugify from "react-slugify";
import PropTypes from "prop-types";
import { colors } from "../styles/theme";
const Contents = ({ content }) => {
  return (
    <aside>
      <section>
        <h2>Tabla de contenido</h2>
        {content.map((element, i) => (
          <a key={i} href={`#${slugify(element)}`}>
            {element}
          </a>
        ))}
      </section>
      <style jsx>{`
        section {
          margin-top: 40px;
          position: sticky;
          top: 0px;
        }
        a {
          color: ${colors.primary};
          list-style: circle;
          display: block;
          margin: 10px 0;
          width: fit-content;
        }
        a:hover,
        a:focus {
          color: ${colors.secondary};
        }
        h2 {
          font-size: 18px;
          margin: 1em 0;
        }
      `}</style>
    </aside>
  );
};

Contents.propTypes = {
  content: PropTypes.array,
  post: PropTypes.string,
};

export default Contents;

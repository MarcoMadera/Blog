import slugify from "react-slugify";
import PropTypes from "prop-types";
import { colors } from "../styles/theme";
const Contents = ({ content }) => {
  return (
    <aside>
      <section>
        <p>
          <b>Tabla de contenido</b>
        </p>
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
        a:hover {
          color: ${colors.secondary};
        }
        p {
          font-size: 18px;
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

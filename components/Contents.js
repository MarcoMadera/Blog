import Link from "next/link";
import slugify from "react-slugify";
import PropTypes from "prop-types";
import { colors } from "../styles/theme";
const Contents = ({ content, post }) => {
  return (
    <aside>
      <section>
        <p>
          <b>Tabla de contenido</b>
        </p>
        {content.map((element, i) => (
          <Link key={i} href={`./${post}/#${slugify(element)}`}>
            <a>{element}</a>
          </Link>
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

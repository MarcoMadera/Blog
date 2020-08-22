import Link from "next/link";
import slugify from "react-slugify";
import PropTypes from "prop-types";
const Contents = ({ content, post }) => {
  return (
    <aside>
      <section>
        <h3>Tabla de contenido</h3>
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
          list-style: circle;
          display: block;
          margin: 10px 0;
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

import Link from "next/link";
import slugify from "react-slugify";
import PropTypes from "prop-types";
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
          color: #da0000;
          list-style: circle;
          display: block;
          margin: 10px 0;
          width: fit-content;
        }
        a:hover {
          color: #e74c3ccb;
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

import Link from "next/link";
import PropTypes from "prop-types";
const AllTags = ({ tags }) => {
  return (
    <div>
      <h4>Todas las etiquetas</h4>
      <section>
        {tags.map((tag) => (
          <Link href={"/blog/tag/[slug]/"} as={`/blog/tag/${tag}/`} key={tag}>
            <a>#{tag}</a>
          </Link>
        ))}
      </section>
      <style jsx>{`
        a {
          display: block;
          color: #e74c3c;
        }
        a:hover {
          color: #e74c3ccb;
          text-decoration: underline;
        }
        @media screen and (min-width: 0px) and (max-width: 1024px) {
          section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

AllTags.propTypes = {
  tags: PropTypes.array,
};

export default AllTags;

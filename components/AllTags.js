import Link from "next/link";
import PropTypes from "prop-types";
const AllTags = ({ tags }) => {
  return (
    <div>
      <h4>Todas las etiquetas</h4>
      {tags.map((tag) => (
        <Link href={"/blog/tag/[slug]/"} as={`/blog/tag/${tag}/`} key={tag}>
          <a>#{tag}</a>
        </Link>
      ))}
      <style jsx>{`
        a {
          display: block;
          color: #e74c3c;
        }
        a:hover {
          color: #e74c3ccb;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

AllTags.propTypes = {
  tags: PropTypes.array,
};

export default AllTags;

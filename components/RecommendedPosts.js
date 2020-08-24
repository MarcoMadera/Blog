import PropTypes from "prop-types";
import Link from "next/link";
const RecommendedPosts = ({ recommendedPosts, currentPost }) => {
  return (
    <section>
      {recommendedPosts && (
        <>
          <strong>
            <p>Blogs recomendados</p>
          </strong>
          {recommendedPosts.map(({ slug, frontmatter }, i) => {
            if (slug === currentPost) return;
            return (
              i <= 6 && (
                <Link href={"/blog/[slug]/"} as={`/blog/${slug}/`} key={slug}>
                  <a>{frontmatter.title}</a>
                </Link>
              )
            );
          })}
        </>
      )}
      <style jsx>{`
        a {
          display: block;
          margin: 0;
          color: #da0000;
        }
        a:hover {
          color: #e74c3ccb;
          text-decoration: underline;
        }
        section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        @media screen and (max-width: 876px) {
          a {
            margin: 13.5px 5px 13.5px 0;
          }
        }
      `}</style>
    </section>
  );
};

RecommendedPosts.propTypes = {
  recommendedPosts: PropTypes.array,
  currentPost: PropTypes.string,
};

export default RecommendedPosts;

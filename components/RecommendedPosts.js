import PropTypes from "prop-types";
import Link from "next/link";
const RecommendedPosts = ({ recommendedPosts, currentPost }) => {
  return (
    <section>
      {recommendedPosts && (
        <>
          {recommendedPosts.lenght !== 0 && (
            <strong>
              <p>Blogs recomendados</p>
            </strong>
          )}
          {recommendedPosts.map(({ slug, frontmatter }, i) => {
            if (slug === currentPost) return;
            return (
              i <= 6 && (
                <section key={slug}>
                  <div>
                    <Link href={"/blog/[slug]/"} as={`/blog/${slug}/`}>
                      <a>
                        <img
                          src={frontmatter.cover100}
                          alt={`${frontmatter.title} cover`}
                          width="40"
                          height="40"
                        />
                        {frontmatter.title}
                      </a>
                    </Link>
                  </div>
                </section>
              )
            );
          })}
        </>
      )}
      <style jsx>{`
        section {
        }
        div {
          margin-bottom: 10px;
        }
        img {
          border-radius: 10px;
          width: 40px;
          height: 40px;
          margin-right: 5px;
        }
        a {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 3px;
          color: #da0000;
        }
        a:hover {
          color: #e74c3ccb;
          text-decoration: underline;
          background: rgb(250, 250, 250);
          border-radius: 3px;
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

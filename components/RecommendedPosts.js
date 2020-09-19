import PropTypes from "prop-types";
import Link from "next/link";
import { colors } from "../styles/theme";
const RecommendedPosts = ({ recommendedPosts, currentPost }) => {
  return (
    <div>
      {recommendedPosts && (
        <>
          {recommendedPosts.length > 1 && (
            <strong>
              <p>Artículos recomendados</p>
            </strong>
          )}
          <section>
            {recommendedPosts.map(({ slug, frontmatter }, i) => {
              if (slug === currentPost) return;
              return (
                i <= 6 && (
                  <Link key={slug} href={"/blog/[slug]/"} as={`/blog/${slug}/`}>
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
                )
              );
            })}
          </section>
        </>
      )}
      <style jsx>{`
        div {
          display: block;
          margin-bottom: 10px;
        }
        img {
          clip-path: inset(0% 0% 0% 0% round 10px);
          width: 40px;
          height: 40px;
          margin-right: 5px;
        }
        a {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 3px;
          color: ${colors.primary};
        }
        a:hover {
          color: ${colors.secondary};
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
    </div>
  );
};

RecommendedPosts.propTypes = {
  recommendedPosts: PropTypes.array,
  currentPost: PropTypes.string,
};

export default RecommendedPosts;

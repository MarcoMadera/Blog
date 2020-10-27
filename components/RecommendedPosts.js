import PropTypes from "prop-types";
import Link from "next/link";
import { colors } from "../styles/theme";
const RecommendedPosts = ({ recommendedPosts, currentPost }) => {
  return (
    <div>
      {recommendedPosts && (
        <>
          <section>
            {recommendedPosts.length > 1 && <h2>Artículos recomendados</h2>}
            <div>
              {recommendedPosts.map(({ slug, cover100, title }, i) => {
                if (slug === currentPost) return;
                return (
                  i <= 6 && (
                    <Link
                      key={slug}
                      href={"/blog/[slug]/"}
                      as={`/blog/${slug}/`}
                    >
                      <a>
                        <img
                          src={cover100}
                          alt={`${title} cover`}
                          width="40"
                          height="40"
                        />
                        {title}
                      </a>
                    </Link>
                  )
                );
              })}
            </div>
          </section>
        </>
      )}
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }
        h2 {
          font-size: 1em;
          margin: 1em 0;
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
        a:focus {
          color: ${colors.secondary};
          background: rgb(250, 250, 250);
          border-radius: 3px;
        }
        section div {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          margin-bottom: 0;
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

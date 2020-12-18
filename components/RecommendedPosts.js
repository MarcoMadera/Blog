import PropTypes from "prop-types";
import { colors } from "../styles/theme";
import { imageCloudProvider } from "../site.config";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
import { ALink } from "./tags";
const Div = ({ children }) => <div>{children}</div>;

const Heading = ({ children }) => <h2>{children}</h2>;

const RecommendedPosts = ({ recommendedPosts = [], currentPost }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div>
      {recommendedPosts.length > 1 && (
        <>
          <Heading>Artículos recomendados</Heading>
          <Div>
            {recommendedPosts.map(({ slug, title, cover }, i) => {
              if (slug !== currentPost)
                return (
                  i <= 6 && (
                    <ALink
                      key={slug}
                      title={title}
                      href={"/blog/[slug]/"}
                      as={`/blog/${slug}/`}
                    >
                      <img
                        src={
                          cover.startsWith(imageCloudProvider)
                            ? cover.replace(
                                new RegExp(
                                  `(?<=${imageCloudProvider.replace(
                                    /[.*+?^${}()|/[\]\\]/g,
                                    "\\$&"
                                  )})`,
                                  "g"
                                ),
                                "/q_auto,f_auto,c_scale,h_40,w_40"
                              )
                            : cover
                        }
                        alt={`${title} cover`}
                        width="40"
                        height="40"
                      />
                      {title}
                    </ALink>
                  )
                );
            })}
          </Div>
        </>
      )}
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }
        div :global(h2) {
          font-size: 1em;
          margin: 1em 0;
          font-weight: 600;
        }
        div :global(img) {
          clip-path: inset(0% 0% 0% 0% round 10px);
          width: 40px;
          height: 40px;
          margin-right: 5px;
        }
        div :global(a) {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 3px;
        }
        div :global(a:focus),
        div :global(a:hover) {
          background: ${darkMode ? colors.dark_accents3 : colors.accents5};
          border-radius: 3px;
        }
        div :global(div) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          margin-bottom: 0;
        }
        @media screen and (max-width: 876px) {
          div :global(a) {
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
  slug: PropTypes.string,
};
Div.propTypes = {
  children: PropTypes.node,
};
Heading.propTypes = {
  children: PropTypes.node,
};

export default RecommendedPosts;

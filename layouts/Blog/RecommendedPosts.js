import { ALink } from "components/tags";
import { colors } from "styles/theme";
import { imageCloudProvider } from "site.config";
import PropTypes from "prop-types";
import useDarkMode from "hooks/useDarkMode";
import { insertTextBetween } from "utils/helpers";

function Div({ children }) {
  return <div>{children}</div>;
}

function Heading({ children }) {
  return <h2>{children}</h2>;
}

export default function RecommendedPosts({
  currentPost,
  recommendedPosts = [],
}) {
  const { darkMode } = useDarkMode();

  return (
    <div>
      {recommendedPosts.length > 1 && (
        <>
          <Heading>Artículos recomendados</Heading>
          <Div>
            {recommendedPosts.map(({ slug, title, cover }, i) => {
              return (
                slug !== currentPost &&
                i <= 6 && (
                  <ALink key={slug} title={title} href={`/blog/${slug}/`}>
                    <img
                      src={
                        cover.startsWith(imageCloudProvider)
                          ? insertTextBetween(
                              cover,
                              imageCloudProvider.length,
                              "/q_auto,f_auto,c_scale,h_40,w_40"
                            )
                          : cover
                      }
                      alt={title}
                      width="40"
                      height="40"
                    />
                    <p>{title}</p>
                  </ALink>
                )
              );
            })}
          </Div>
        </>
      )}
      <style jsx>{`
        div :global(a:hover) {
          background: ${darkMode ? colors.dark_accents3 : colors.accents5};
        }
      `}</style>
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }
        div :global(a) {
          align-items: center;
          display: flex;
          margin: 0;
          padding: 3px;
        }
        p {
          overflow: hidden;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          white-space: unset;
          margin: 0 0 0 5px;
        }
        div :global(a:focus),
        div :global(a:hover) {
          border-radius: 3px;
        }
        div :global(div) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          margin-bottom: 0;
        }
        div :global(h2) {
          font-size: 1em;
          font-weight: 600;
          margin: 1em 0;
        }
        div :global(img) {
          clip-path: inset(0% 0% 0% 0% round 10px);
          height: 40px;
          width: 40px;
        }
        @media screen and (max-width: 400px) {
          div :global(div) {
            display: block;
          }
        }
        @media screen and (max-width: 876px) {
          div :global(a) {
            margin: 13.5px 5px 13.5px 0;
          }
        }
      `}</style>
    </div>
  );
}

Div.propTypes = {
  children: PropTypes.node,
};
Heading.propTypes = {
  children: PropTypes.node,
};
RecommendedPosts.propTypes = {
  currentPost: PropTypes.string,
  recommendedPosts: PropTypes.array,
  slug: PropTypes.string,
};

import { ALink } from "components/tags";
import { colors } from "styles/theme";
import { imageCloudProvider } from "site.config";
import PropTypes from "prop-types";
import useDarkMode from "hooks/useDarkMode";
import { insertTextBetween } from "utils/helpers";
import styles from "./RecommendedPosts.module.css";
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
    <div className={styles.div}>
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
                    <p className={styles.p}>{title}</p>
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

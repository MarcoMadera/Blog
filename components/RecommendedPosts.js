import PropTypes from "prop-types";
import Link from "next/link";
import { colors } from "../styles/theme";
import { imageCloudProvider, siteMetadata } from "../site.config";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
const Div = ({ children }) => <div>{children}</div>;

const Heading = ({ children }) => <h2>{children}</h2>;

const AnchorImg = ({ slug, title, author, cover }) => {
  return (
    <Link href={"/blog/[slug]/"} as={`/blog/${slug}/`}>
      <a>
        <img
          src={
            author !== siteMetadata.author.name
              ? cover
              : `${imageCloudProvider}/q_auto,f_auto,c_scale,h_40,w_40/${cover}`
          }
          alt={`${title} cover`}
          width="40"
          height="40"
        />
        {title}
      </a>
    </Link>
  );
};

const RecommendedPosts = ({ recommendedPosts = [], currentPost }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div>
      {recommendedPosts.length > 1 && (
        <>
          <Heading>Artículos recomendados</Heading>
          <Div>
            {recommendedPosts.map((props, i) => {
              if (props.slug !== currentPost)
                return i <= 6 && <AnchorImg key={props.slug} {...props} />;
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
          color: ${darkMode ? colors.darkPrimary : colors.primary};
        }
        div :global(a:focus),
        div :global(a:hover) {
          background: ${darkMode ? "#ffffff1c" : "rgb(250, 250, 250)"};
          color: ${darkMode ? colors.darkSecondary : colors.secondary};
          border-radius: 3px;
        }
        div :global(a:hover) {
          text-decoration: underline;
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
AnchorImg.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  cover: PropTypes.string,
};
Div.propTypes = {
  children: PropTypes.node,
};
Heading.propTypes = {
  children: PropTypes.node,
};

export default RecommendedPosts;

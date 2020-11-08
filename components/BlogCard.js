import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { getFormattedDate } from "../utils/helpers";
import { colors } from "../styles/theme";
import { imageCloudProvider, siteMetadata } from "../site.config";
const BlogCard = ({ slug, title, description, cover, tags, author, date }) => {
  return (
    <article key={slug}>
      <Link href={"/blog/[slug]/"} as={`/blog/${slug}/`}>
        <a aria-label={`post ${title}`}>
          <header>
            <div>
              <h2>{title}</h2>
              <p>
                {description}.. <span>Leer más</span>
              </p>
            </div>
            <picture>
              <source
                srcSet={
                  author !== siteMetadata.author.name
                    ? cover
                    : `${imageCloudProvider}/c_scale,h_300,w_300/${cover}`
                }
                media="(max-width: 876px)"
              />
              <img
                src={
                  author !== siteMetadata.author.name
                    ? cover
                    : `${imageCloudProvider}/c_scale,h_100,w_100/${cover}`
                }
                alt={`Portada del blog ${title}`}
                width="100"
                height="100"
              />
            </picture>
          </header>
        </a>
      </Link>
      <footer>
        <div>
          {tags.length &&
            tags.map((tag) => (
              <Link
                href={"/blog/etiqueta/[slug]/"}
                as={`/blog/etiqueta/${slugify(tag)}/`}
                key={tag}
              >
                <a aria-label={`etiqueta ${tag}`}>#{tag}</a>
              </Link>
            ))}
        </div>
        <span>
          {author} |{" "}
          <time dateTime={new Date(date).toISOString()}>
            {getFormattedDate(new Date(date))}
          </time>
        </span>
      </footer>
      <style jsx>{`
        article {
          box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 0px;
          border-radius: 5px;
          background-color: ${colors.white};
          margin-bottom: 1rem;
        }
        article:hover,
        article:focus-within {
          box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px 0px;
        }
        header {
          display: grid;
          grid-template-columns: 100fr 1fr;
          padding: 0.5rem 1rem 0 1rem;
        }
        h2:hover {
          text-decoration: underline;
        }
        h2 {
          margin: 0;
          font-size: 1.17em;
        }
        p {
          margin: 0;
          text-align: justify;
        }
        header div {
          width: 760px;
          width: auto;
          padding-right: 1rem;
        }
        picture {
          display: inline-flex;
        }
        img {
          width: 100px;
          height: 100px;
          clip-path: inset(0% 0% 0% 0% round 10px);
        }
        footer {
          padding: 0 1rem 0.4rem;
        }
        a {
          display: inline-flex;
          box-sizing: border-box;
        }
        div > a {
          margin-right: 5px;
        }
        header div p:hover span,
        footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </article>
  );
};

export default BlogCard;

BlogCard.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  cover: PropTypes.string,
  tags: PropTypes.array,
  author: PropTypes.string,
  date: PropTypes.string,
};

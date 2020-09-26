import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { getFormattedDate } from "../utils/helpers";
const BlogCard = ({
  slug,
  title,
  description,
  cover,
  cover100,
  tag,
  author,
  date,
}) => {
  return (
    <article key={slug}>
      <Link href={"/blog/[slug]/"} as={`/blog/${slug}/`}>
        <a aria-label={`post ${title}`}>
          <header>
            <section>
              <h2>{title}</h2>
              <p>
                {description}.. <span>Leer más</span>
              </p>
            </section>
            <picture>
              <source srcSet={cover} media="(max-width: 876px)" />
              <img
                src={cover100}
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
          {tag.length &&
            tag.map((tag) => (
              <Link
                href={"/blog/tag/[slug]/"}
                as={`/blog/tag/${slugify(tag)}/`}
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
          background-color: var(--blog-card-background, white);
          transition: background-color var(--switch-transition);
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
          color: var(--title);
          font-family: var(--cardTitle-font-family);
        }
        p {
          margin: 0;
          color: var(--content);
          text-align: justify;
        }
        section {
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
        section p:hover span,
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
  cover100: PropTypes.string,
  tag: PropTypes.array,
  author: PropTypes.string,
  date: PropTypes.string,
};

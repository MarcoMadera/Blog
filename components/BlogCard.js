import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
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
        <a aria-label={`${title} blog`}>
          <header>
            <section>
              <h3>{title}</h3>
              <p>
                {description}.. <span>Leer más</span>
              </p>
            </section>
            <picture>
              <source srcSet={cover} media="(max-width: 876px)" />
              <img
                src={cover100}
                alt="Portada de blog"
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
                <a>#{tag}</a>
              </Link>
            ))}
        </div>
        <span>
          {author} | <time>{date}</time>
        </span>
      </footer>
      <style jsx>{`
        article {
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
          border-radius: 5px;
          background-color: var(--blog-card-background, white);
          transition: background-color var(--switch-transition);
          margin-bottom: 1rem;
        }
        header {
          display: grid;
          grid-template-columns: 100fr 1fr;
          padding: 0.5rem 1rem 0 1rem;
        }
        h3:hover {
          text-decoration: underline;
        }
        h3 {
          margin: 0;
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
        img {
          width: 100px;
          height: 100px;
          border-radius: 10%;
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

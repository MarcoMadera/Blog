import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { getFormattedDate } from "../utils/helpers";
import { imageCloudProvider } from "../site.config";
import useDarkMode from "../hooks/useDarkMode";
import { insertTextBetween } from "../utils/helpers";
export default function BlogCard({
  author,
  cover,
  date,
  description,
  slug,
  title,
  tags,
}) {
  const { darkMode } = useDarkMode();

  return (
    <article>
      <Link href={`/blog/${slug}/`}>
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
                media="(max-width: 876px)"
                srcSet={
                  cover.startsWith(imageCloudProvider)
                    ? insertTextBetween(
                        cover,
                        imageCloudProvider.length,
                        "/q_auto,f_auto,c_scale,h_300,w_300"
                      )
                    : cover
                }
              />
              <img
                alt={tags.join(", ")}
                height="100"
                srcSet={
                  cover.startsWith(imageCloudProvider)
                    ? insertTextBetween(
                        cover,
                        imageCloudProvider.length,
                        "/q_auto,f_auto,c_scale,h_100,w_100"
                      )
                    : cover
                }
                width="100"
              />
            </picture>
          </header>
        </a>
      </Link>
      <footer>
        <div>
          {tags.length &&
            tags.map((tag) => (
              <Link href={`/blog/etiqueta/${slugify(tag)}/`} key={tag}>
                <a aria-label={`etiqueta ${tag}`}>#{tag}</a>
              </Link>
            ))}
        </div>
        <span>
          <span translate="no">{author}</span> |{" "}
          <time dateTime={new Date(date).toISOString()}>
            {getFormattedDate(date)}
          </time>
        </span>
      </footer>
      <style jsx>{`
        article {
          box-shadow: ${darkMode
              ? "rgba(255,255,255,0.2)"
              : "rgba(0, 0, 0, 0.2)"}
            0px 0px 2px 0px;
        }
        article:hover,
        article:focus-within {
          box-shadow: ${darkMode
              ? "rgba(255,255,255,0.3)"
              : "rgba(0, 0, 0, 0.3)"}
            0px 0px 2px 0px;
        }
      `}</style>
      <style jsx>{`
        a {
          display: inline-flex;
          box-sizing: border-box;
          text-decoration: none;
          color: inherit;
        }
        article {
          border-radius: 5px;
          margin-bottom: 1rem;
        }

        div > a {
          margin-right: 5px;
        }
        footer {
          padding: 0 1rem 0.4rem;
        }
        footer a:hover,
        header div p:hover span {
          text-decoration: underline;
        }
        h2 {
          margin: 0;
          font-size: 1.17em;
          font-weight: 600;
        }
        h2:hover {
          text-decoration: underline;
        }
        header {
          display: grid;
          grid-template-columns: 100fr 1fr;
          padding: 0.5rem 1rem 0 1rem;
        }
        header div {
          width: 760px;
          width: auto;
          padding-right: 1rem;
        }
        img {
          width: 100px;
          height: 100px;
          clip-path: inset(0% 0% 0% 0% round 10px);
        }
        p {
          margin: 0;
          text-align: justify;
        }
        picture {
          display: inline-flex;
        }
      `}</style>
    </article>
  );
}

BlogCard.propTypes = {
  author: PropTypes.string,
  cover: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
};

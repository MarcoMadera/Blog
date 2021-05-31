import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { getFormattedDate } from "../../utils/helpers";
import { imageCloudProvider } from "../../site.config";
import useDarkMode from "../../hooks/useDarkMode";
import { insertTextBetween } from "../../utils/helpers";
import styles from "./BlogCard.module.css";
export default function BlogCard({
  author,
  cover,
  date,
  description,
  slug,
  title,
  tags,
  readingTimeInMinutes,
}) {
  const { darkMode } = useDarkMode();

  return (
    <article className={styles.article}>
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
        <section>
          <span translate="no">{author} &middot;&nbsp;</span>
          <time dateTime={new Date(date).toISOString()}>
            {getFormattedDate(date)}&nbsp;&middot;&nbsp;
          </time>
          <span>{`${readingTimeInMinutes} min. de lectura`}</span>
        </section>
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
  readingTimeInMinutes: PropTypes.number,
};

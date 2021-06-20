import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { getFormattedDate } from "utils/helpers";
import { imageCloudProvider } from "site.config";
import useDarkMode from "hooks/useDarkMode";
import { insertTextBetween } from "utils/helpers";
import Image from "next/image";

export default function BlogCard({
  author,
  cover,
  date,
  description,
  slug,
  title,
  tags,
  readingTimeInMinutes,
  blurDataURL,
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
            <Image
              height={80}
              width={80}
              alt={tags.join(", ")}
              placeholder="blur"
              loader={({ src }) =>
                src.startsWith(imageCloudProvider)
                  ? insertTextBetween(
                      src,
                      imageCloudProvider.length,
                      "/q_auto,f_auto,c_scale,h_80,w_80"
                    )
                  : src
              }
              blurDataURL={blurDataURL}
              src={cover}
            />
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
      <style jsx>{`
        section {
          display: flex;
          flex-wrap: wrap;
        }
        a {
          display: inline-flex;
          box-sizing: border-box;
          text-decoration: none;
          color: inherit;
        }
        a:focus {
          outline: none;
        }
        article {
          border-radius: 5px;
          margin-bottom: 1rem;
        }
        article:focus-within {
          outline-style: dashed;
          outline-width: 2px;
          outline-color: #b50000;
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
        a:focus h2,
        a:focus span,
        footer a:focus,
        h2:hover {
          text-decoration: underline;
        }
        header {
          display: grid;
          grid-template-columns: 1fr 80px;
          padding: 0.5rem 1rem 0 1rem;
        }
        header div {
          width: 760px;
          width: auto;
          padding-right: 1rem;
        }
        header :global(img) {
          width: 80px;
          height: 80px;
          clip-path: inset(0% 0% 0% 0% round 10px);
        }
        p {
          margin: 0;
          text-align: justify;
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
  blurDataURL: PropTypes.string,
  readingTimeInMinutes: PropTypes.number,
};

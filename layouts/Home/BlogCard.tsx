import Link from "next/link";
import slugify from "react-slugify";
import { getFormattedDate } from "utils";
import useDarkMode from "hooks/useDarkMode";
import Image from "next/image";
import type { PostData } from "types/posts";
import { ReactElement } from "react";
import { colors } from "styles/theme";
import {
  isImgFromCloudProvider,
  replaceUrlImgTransformations,
} from "utils/cloudProvider";
import { useDate } from "hooks/useDate";

export default function BlogCard({
  author,
  cover,
  coverAlt,
  date,
  description,
  slug,
  title,
  tags,
  readingTimeInMinutes,
  blurDataURL,
}: PostData): Omit<
  ReactElement,
  "h2s" | "content" | "profilePhoto" | "twitter" | "summary"
> {
  const { darkMode } = useDarkMode();
  const isFromCloudProvider = isImgFromCloudProvider(cover);
  const { date: publishedDate, isoString } = useDate(date);

  return (
    <article className="h-entry hentry">
      <Link href={`/blog/${slug}`}>
        <a className="u-url" rel="bookmark">
          <div className="cover">
            <Image
              height={548}
              width={410}
              alt={coverAlt}
              placeholder="blur"
              loader={
                isFromCloudProvider
                  ? ({ src }) =>
                      replaceUrlImgTransformations(
                        src,
                        "c_fill,w_560,ar_3:4,q_auto,f_auto,b_rgb:e6e9ee"
                      )
                  : undefined
              }
              unoptimized={!isFromCloudProvider}
              blurDataURL={blurDataURL}
              src={cover}
              className="u-photo"
            />

            <span className="p-author author h-card vcard" translate="no">
              {author}
            </span>
          </div>
          <div className="content">
            <div className="info">
              <span>
                <time className="dt-published published" dateTime={isoString}>
                  {publishedDate ? getFormattedDate(publishedDate) : ""}
                </time>
              </span>
              <span>{readingTimeInMinutes} min de lectura</span>
            </div>
            <h2 className="p-name entry-title">{title}</h2>
            <p className="p-summary entry-summary">{description}</p>
          </div>
        </a>
      </Link>
      {tags.length > 0 && (
        <div className="tags">
          {tags.map((tag) => (
            <Link href={`/blog/etiqueta/${slugify(tag)}`} key={tag}>
              <a className="p-category" rel="category tag">
                {tag}
              </a>
            </Link>
          ))}
        </div>
      )}
      <style jsx>{`
        .tags {
          position: absolute;
          top: 0;
          left: 0;
          flex-wrap: wrap;
          padding: 0.5rem;
          z-index: 1;
          display: none;
        }
        article:hover .tags,
        article:focus .tags,
        article:focus-within .tags {
          display: flex;
        }
        .tags a {
          padding: 0.45rem 0.7rem;
          border-radius: 0.3rem;
          background-color: ${colors.white};
          color: ${colors.black};
          font-size: 1rem;
          font-weight: 400;
          text-decoration: none;
          transition: 0.3s ease-in-out;
          outline: 3px solid transparent;
        }
        .tags a:hover,
        .tags a:focus,
        .tags a:focus-within {
          outline: 3px solid ${colors.primary};
        }
        .cover {
          position: relative;
          border-radius: 0.5rem;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .cover span {
          position: absolute;
          bottom: 0;
          left: -5px;
          padding: 0.5rem;
          background-color: ${colors.white};
          color: ${colors.black};
          font-size: 0.75rem;
          font-weight: 400;
          display: none;
          border-radius: 0 0.3rem 0 0;
        }
        article:focus .cover span,
        article:focus-within .cover span,
        article:hover .cover span {
          display: block;
        }
        article {
          margin-bottom: 2.5rem;
          overflow: hidden;
          grid-column: span 4 / span 4;
          max-width: 410px;
          position: relative;
        }
        a {
          margin: 6px;
        }
        .cover {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 0.5rem;
          display: flex;
          transition: 0.3s ease-in-out;
        }
        .cover :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.3s ease-in-out;
        }
        article:hover :global(img),
        article:focus :global(img),
        article:focus-within :global(img) {
          transform: scale(1.1);
        }
        article *:focus,
        article *:focus-within {
          outline: none;
        }
        article:focus-within .cover,
        article:hover .cover,
        article:focus .cover {
          box-shadow: 0 0 0 4px
              ${darkMode ? colors.dark_background : colors.background},
            0 0 0 6px ${darkMode ? colors.dark_textColor : colors.black};
        }
        .content {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "title"
            "description"
            "info";
          padding: 1rem;
          border-radius: 0.5rem;
        }
        h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.2;
          color: ${darkMode ? colors.dark_primary : colors.primary};
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          overflow: hidden;
          text-align: left;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: unset;
        }
        p {
          margin: 0;
          margin-top: 1rem;
          font-size: 1rem;
          line-height: 1.5;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          overflow: hidden;
          text-align: left;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: unset;
        }
        .info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: ${darkMode ? "#ccccccaa" : colors.accents1};
        }
        .info span {
          display: flex;
          align-items: center;
        }
        .info span :global(svg) {
          margin-right: 0.5rem;
        }
        a {
          display: block;
          color: inherit;
          text-decoration: none;
        }

        @media (max-width: 1024px) {
          article {
            grid-column: span 6 / span 6;
          }
        }
        @media (max-width: 500px) {
          article {
            grid-column: span 12 / span 12;
          }
        }
      `}</style>
    </article>
  );
}

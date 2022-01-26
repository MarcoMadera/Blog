import Link from "next/link";
import { ReactElement } from "react";
import slugify from "react-slugify";
import type { PostWithMedia } from "types/posts";

interface TagsHeaderTypes {
  tags: PostWithMedia["tags"];
}

export default function TagsHeader({ tags }: TagsHeaderTypes): ReactElement {
  return (
    <div>
      {tags.length &&
        tags.map((tag) => (
          <Link
            prefetch={false}
            href={`/blog/etiqueta/${slugify(tag)}/`}
            key={tag}
          >
            <a aria-label={`etiqueta ${tag}`}>{tag}</a>
          </Link>
        ))}
      <style jsx>
        {`
          div {
            display: flex;
            width: fit-content;
            justify-content: space-between;
            column-gap: 15px;
            margin-bottom: 12px;
          }
          a {
            text-decoration: none;
            cursor: pointer;
            font-weight: 500;
            font-size: 13px;
            padding: 2px 4px;
            color: inherit;
          }
          a:focus,
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
}

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
            rel="category tag"
            className="p-category"
            aria-label={`etiqueta ${tag}`}
          >
            {tag}
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
          div :global(a) {
            text-decoration: none;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            padding: 2px 4px;
            color: inherit;
          }
          div :global(a:focus),
          div :global(a:hover) {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
}

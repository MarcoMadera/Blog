import { ALink } from "components/tags";
import type { PostWithMedia } from "types/posts";
import { ReactElement } from "react";
import {
  isImgFromCloudProvider,
  replaceUrlImgTransformations,
} from "utils/cloudProvider";

export default function RecommendedPosts({
  slug,
  recommendedPosts = [],
}: Pick<PostWithMedia, "recommendedPosts" | "slug">): ReactElement {
  return (
    <div className="h-feed hfeed recommendedPosts-container">
      {recommendedPosts.length > 1 && (
        <>
          <h2 className="p-name">Artículos recomendados</h2>
          <div>
            {recommendedPosts.map(
              ({ slug: recommendedPostSlug, title, cover, coverAlt }, i) => {
                return (
                  recommendedPostSlug !== slug &&
                  i <= 5 && (
                    <ALink
                      key={recommendedPostSlug}
                      title={title}
                      href={`/blog/${recommendedPostSlug}/`}
                      rel="bookmark"
                      className="u-url"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          isImgFromCloudProvider(cover)
                            ? replaceUrlImgTransformations(
                                cover,
                                "c_fill,w_560,ar_3:4,q_auto,f_auto,b_rgb:e6e9ee"
                              )
                            : cover
                        }
                        loading="lazy"
                        alt={coverAlt}
                        width="560"
                        height="260"
                        className="u-photo"
                      />
                      <h3 className="p-name entry-title">{title}</h3>
                    </ALink>
                  )
                );
              }
            )}
          </div>
        </>
      )}
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }
        div :global(a) {
          align-items: center;
          display: grid;
          grid-template-rows: 1fr 0.2fr;
          margin: 0;
          padding: 3px;
        }
        h3 {
          overflow: hidden;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          white-space: unset;
          margin: 0 0 0 5px;
          font-weight: 400;
        }
        div :global(a:focus),
        div :global(a:hover) {
          border-radius: 3px;
        }
        div div {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 0.33fr));
          grid-gap: 2em;
          margin: 30px 0;
        }
        div h2 {
          font-weight: 600;
          margin: 1em 0;
        }
        div :global(img) {
          clip-path: inset(0% 0% 0% 0% round 10px);
          width: 100%;
        }
        @media screen and (max-width: 472px) {
          div div {
            display: block;
          }
        }
        @media screen and (max-width: 876px) {
          div :global(a) {
            margin: 13.5px 5px 13.5px 0;
          }
        }
      `}</style>
    </div>
  );
}

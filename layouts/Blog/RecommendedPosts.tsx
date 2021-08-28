import { ALink } from "components/tags";
import { colors } from "styles/theme";
import { imageCloudProvider } from "site.config";
import useDarkMode from "hooks/useDarkMode";
import { insertTextBetween } from "utils";
import { PostWithMedia } from "types/posts";
import { ReactElement } from "react";

export default function RecommendedPosts({
  slug,
  recommendedPosts = [],
}: Pick<PostWithMedia, "recommendedPosts" | "slug">): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <div>
      {recommendedPosts.length > 1 && (
        <>
          <h2>Artículos recomendados</h2>
          <div>
            {recommendedPosts.map(
              ({ slug: recommendedPostSlug, title, cover }, i) => {
                return (
                  recommendedPostSlug !== slug &&
                  i <= 6 && (
                    <ALink
                      key={recommendedPostSlug}
                      title={title}
                      href={`/blog/${recommendedPostSlug}/`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          cover.startsWith(imageCloudProvider)
                            ? insertTextBetween(
                                cover,
                                imageCloudProvider.length,
                                "/q_auto,f_auto,c_scale,h_40,w_40"
                              )
                            : cover
                        }
                        alt={title}
                        width="40"
                        height="40"
                      />
                      <p>{title}</p>
                    </ALink>
                  )
                );
              }
            )}
          </div>
        </>
      )}
      <style jsx>{`
        div :global(a:hover) {
          background: ${darkMode ? "#161b22" : colors.accents5};
        }
      `}</style>
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }
        div :global(a) {
          align-items: center;
          display: flex;
          margin: 0;
          padding: 3px;
        }
        p {
          overflow: hidden;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          white-space: unset;
          margin: 0 0 0 5px;
        }
        div :global(a:focus),
        div :global(a:hover) {
          border-radius: 3px;
        }
        div div {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          margin-bottom: 0;
        }
        div h2 {
          font-size: 1em;
          font-weight: 600;
          margin: 1em 0;
        }
        div :global(img) {
          clip-path: inset(0% 0% 0% 0% round 10px);
          height: 40px;
          width: 40px;
        }
        @media screen and (max-width: 400px) {
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

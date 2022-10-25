import { ReactElement } from "react";
import type { Url } from "types/tweet";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";

interface TweetUrlPreviewProps {
  urlPreview: Url;
}

export default function TweetUrlPreview({
  urlPreview,
}: TweetUrlPreviewProps): ReactElement | null {
  const domain = urlPreview.unwound_url?.split("/")[2]?.replace(/^www\./, "");
  const { darkMode } = useDarkMode();
  if (
    !urlPreview.images ||
    urlPreview.unwound_url?.startsWith("https://twitter.com/i/spaces/")
  ) {
    return null;
  }
  const isLargeCard =
    urlPreview.images?.[0].width >= 500 &&
    urlPreview.images?.[0].width > urlPreview.images?.[0].height;

  return (
    <article className={`url-preview-${isLargeCard ? "large" : "small"}`}>
      <a href={urlPreview.url} target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urlPreview.images?.[0].url} alt="" />
        <div className="url-preview__content">
          <div className="url-preview__header">
            <div>
              <span className="url-preview__header-title-url">
                {domain ?? urlPreview.display_url}
              </span>
            </div>
            {urlPreview.title && (
              <div>
                <span className="url-preview__header-title-text">
                  {urlPreview.title}
                </span>
              </div>
            )}
            {urlPreview.description && (
              <div>
                <span className="url-preview__header-title-description">
                  {urlPreview.description}
                </span>
              </div>
            )}
          </div>
        </div>
      </a>
      <style jsx>{`
        article {
          margin-top: 12px;
        }
        a {
          transition-duration: 0.2s;
          transition-property: background-color, box-shadow;
          border-radius: 16px;
          border-color: ${darkMode ? "rgb(47, 51, 54)" : "rgb(207, 217, 222);"};
          border-width: 1px;
          border-style: solid;
          overflow: hidden;
          font-size: 15px;
          display: flex;
          flex-direction: row;
          transition-duration: 0.2s;
          text-decoration: none;
          flex-direction: ${isLargeCard ? "column" : "row"};
          user-select: none;
        }
        a:hover {
          background-color: ${darkMode
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(0, 0, 0, 0.03)"};
          text-decoration: none;
        }
        img {
          min-width: ${isLargeCard ? "100%" : "130px"};
          max-width: ${isLargeCard ? "100%" : "130px"};
          overflow: hidden;
          display: block;
          aspect-ratio: ${isLargeCard ? "16 / 9" : "1"};
          object-fit: cover;
        }
        .url-preview__content {
          justify-content: center;
          align-items: center;
          padding: 12px;
          display: flex;
        }
        .url-preview__header {
          gap: 2px;
          display: flex;
          flex-direction: column;
        }
        span {
          font-size: 15px;
          line-height: 20px;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          margin: 0;
          overflow: hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: unset;
          color: rgb(110, 118, 125);
          -webkit-line-clamp: 1;
        }
        .url-preview__header-title-text {
          color: ${darkMode ? colors.geyser : colors.balticSeaDark};
        }
        .url-preview__header-title-description {
          -webkit-line-clamp: 2;
        }
      `}</style>
    </article>
  );
}

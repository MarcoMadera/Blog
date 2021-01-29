import { tweets } from "../../styles/theme";

export const Div = (p) => (
  <div className={p.className}>
    {p.children}
    <style jsx>{`
      .image-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(49%, 1fr));
        gap: 1px;
        margin: ${tweets.containerMargin};
      }
      .image-count-3 > :global(:first-child) {
        grid-row-end: span 2;
      }
      .gif-container,
      .video-container {
        margin: ${tweets.containerMargin};
      }
      .gif-container > :global(video),
      .video-container > :global(video) {
        width: 100%;
        max-height: 500px;
      }
    `}</style>
  </div>
);
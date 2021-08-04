import LiteYouTubeEmbed from "react-lite-youtube-embed";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";
import { ReactNode } from "react-markdown";
import { ReactElement } from "react";

interface YoutubeProps {
  id: string;
  title?: string;
  caption?: string | ReactNode;
}

export function Youtube({ id, title, caption }: YoutubeProps): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <div>
      <LiteYouTubeEmbed
        id={id}
        adNetwork={true}
        playlist={false} // Use  true when ID be from a playlist
        poster="hqdefault"
        title={title || "YouTube Embed"}
        noCookie={true}
        wrapperClass="youtubeWrapper"
      />
      {caption != null ? <p className="caption">{caption}</p> : null}
      <style jsx>{`
        div {
          margin: auto;
          max-width: 560px;
        }
        div p.caption {
          font-size: 14px;
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }
      `}</style>
      <style global jsx>{`
        .youtubeWrapper {
          margin: auto;
          max-width: 560px;
          height: 315px;
          background-color: #000;
          position: relative;
          display: block;
          contain: content;
          background-position: 50%;
          background-size: cover;
          cursor: pointer;
        }
        .youtubeWrapper:before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
          background-position: top;
          background-repeat: repeat-x;
          height: 60px;
          padding-bottom: 50px;
          width: 100%;
          transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
        }
        .youtubeWrapper:after {
          content: "";
          display: block;
          padding-bottom: 56.25%;
        }
        .youtubeWrapper > iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .youtubeWrapper > .lty-playbtn {
          width: 70px;
          height: 46px;
          background-color: #212121;
          z-index: 1;
          opacity: 0.8;
          border-radius: 14%;
          transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
        }
        .youtubeWrapper:hover > .lty-playbtn {
          background-color: red;
          opacity: 1;
        }
        .youtubeWrapper > .lty-playbtn:before {
          content: "";
          border-color: transparent transparent transparent #fff;
          border-style: solid;
          border-width: 11px 0 11px 19px;
        }
        .youtubeWrapper > .lty-playbtn,
        .youtubeWrapper > .lty-playbtn:before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
        .youtubeWrapper.lyt-activated {
          cursor: unset;
        }
        .youtubeWrapper.lyt-activated:before,
        .youtubeWrapper.lyt-activated > .lty-playbtn {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

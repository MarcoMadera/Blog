import Bio from "./Bio";
import { FacebookShare, LinkedInShare, TwitterShare } from "components/icons";
import { siteMetadata } from "site.config";
import { A } from "components/tags";
import type { PostData } from "types/posts";
import { PropsWithChildren, ReactElement } from "react";
import useToolTip from "hooks/useToolTip";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";

interface ButtonProps {
  url: string;
  network: "Twitter" | "Facebook" | "LinkedIn";
}

export function Button({
  url,
  network,
  children,
}: PropsWithChildren<ButtonProps>): ReactElement {
  const { getToolTipAttributes } = useToolTip();
  const { trackWithGoogleAnalytics } = useAnalytics();
  return (
    <button
      {...getToolTipAttributes(`Compartir en ${network}`)}
      onClick={(e) => {
        trackWithGoogleAnalytics(HitType.SOCIAL, {
          socialAction: "share",
          socialNetwork: network,
          socialTarget: url,
        });
        window.open(
          `${url}`,
          "popup",
          "width=600,height=500,scrollbars=no,resizable=no"
        );
        e.stopPropagation();
      }}
    >
      {children}
    </button>
  );
}

export default function BlogFooter({
  author,
  profilePhoto,
  slug,
  summary,
  title,
  twitter,
  date,
  authorUrl,
}: Pick<
  PostData,
  | "author"
  | "profilePhoto"
  | "slug"
  | "summary"
  | "title"
  | "twitter"
  | "date"
  | "authorUrl"
>): ReactElement {
  return (
    <footer>
      <Bio
        author={author}
        profilePhoto={profilePhoto}
        summary={summary}
        twitter={twitter}
      />
      <section>
        <div>
          <h2>Comparte el artículo</h2>
          <Button
            network="Twitter"
            url={`https://twitter.com/share?url=${siteMetadata.siteUrl}/blog/${slug}&text=${title}`}
          >
            <TwitterShare width={30} height={30} />
          </Button>
          <Button
            network="Facebook"
            url={`https://facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/blog/${slug}&quote=${title}`}
          >
            <FacebookShare width={30} height={30} />
          </Button>
          <Button
            network="LinkedIn"
            url={`http://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/blog/${slug}&title=${title}&source=${siteMetadata.siteUrl}`}
          >
            <LinkedInShare width={30} height={30} />
          </Button>
        </div>
        <p>
          {/* Esta línea está "mal escrita" a propósito en modo irónico.*/}
          <span translate="no" data-nosnippet>
            As bisto une rata ?
          </span>{" "}
          <A
            href={`https://github.com/MarcoMadera/Blog/edit/master/posts/${slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            title="Edita el artículo en Github"
          >
            Edita el artículo
          </A>
        </p>
      </section>
      <div className="hidden" aria-hidden>
        <a href={`${siteMetadata.siteUrl}/blog/${slug}`} className="u-url">
          <span className="p-name">{title}</span>
          <span className="dt-published">{date}</span>
        </a>
        <a
          href={authorUrl || siteMetadata.siteUrl}
          rel="noopener noreferrer author"
          className="p-author author h-card vcard u-author"
        >
          {author}
        </a>
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        .hidden {
          display: none;
        }
        p {
          margin: 0;
          font-size: 14px;
        }
        footer {
          grid-area: footer;
          margin-bottom: 20px;
        }
        footer :global(button) {
          background: none;
          border: none;
          box-sizing: content-box;
          cursor: pointer;
          height: 30px;
          margin: 9px;
          padding: 0;
          width: 30px;
        }
        footer :global(button:hover) {
          filter: brightness(1.1);
        }
        h2 {
          font-size: 16px;
          margin: 0;
        }
        section {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        @media screen and (max-width: 528px) {
          div {
            display: block;
            margin-top: 15px;
          }
          div :global(button:nth-of-type(1)) {
            margin-left: -10px;
          }
        }
        @media screen and (max-width: 876px) {
          footer :global(button) {
            margin: 0px;
            padding: 9px;
          }
        }
        @media print {
          footer {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}

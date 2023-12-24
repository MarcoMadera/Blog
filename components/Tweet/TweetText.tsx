import reactStringReplace from "react-string-replace";
import { TwitterLink } from "./TwitterLink";
import type { Tweet } from "types/tweet";
import { TwitterLinkType } from "types/tweet";
import { Children, ReactElement, ReactNode } from "react";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";
import { useProcessHTML } from "hooks/useProcessHTML";
import twemoji from "twemoji";

interface TweetTextProps {
  text: Tweet["text"];
  entities?: Tweet["entities"];
  original?: boolean;
  urlsToIgnore?: string[];
}

function replaceText({
  children,
  urlsToIgnore,
  urls,
}: {
  children: ReactNode[] | null;
  urlsToIgnore: TweetTextProps["urlsToIgnore"];
  urls?: {
    url: string;
    display_url: string;
    expanded_url: string;
  }[];
}): (ReactElement | ReactNode[])[] | null | undefined {
  const childs = Children.map(children, (child) => {
    if (!child) return null;
    if (typeof child === "string") {
      let replacedText: ReactNode[] | string = child;
      // Match URLs
      replacedText = reactStringReplace(
        replacedText,
        /(https?:\/\/\S+)/g,
        (match, i) => {
          const urlToDisplay = urls?.find(({ url }) => url === match);
          const isSpaceTweetUrl = urlToDisplay?.expanded_url.startsWith(
            "https://twitter.com/i/spaces"
          );

          if (isSpaceTweetUrl) {
            return null;
          }

          if (urlToDisplay?.expanded_url.includes("pic.twitter.com"))
            return null;

          return (
            <TwitterLink key={match + i} href={match}>
              {urlsToIgnore &&
              urlToDisplay &&
              urlsToIgnore.includes(urlToDisplay.expanded_url)
                ? null
                : urlToDisplay?.display_url}
            </TwitterLink>
          );
        }
      );

      // Match @-mentions
      replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
        <TwitterLink
          key={match + i}
          href={`https://twitter.com/${match}`}
          type={TwitterLinkType.MENTION}
        >
          {match}
        </TwitterLink>
      ));

      // Match cashtags
      replacedText = reactStringReplace(
        replacedText,
        /\$(\w+)/g,
        (match, i) => (
          <TwitterLink
            key={match + i}
            href={`https://twitter.com/search?q=%24${match}`}
            type={TwitterLinkType.CASHTAG}
          >
            {match}
          </TwitterLink>
        )
      );

      // Match hashtags
      replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
        <TwitterLink
          key={match + i}
          href={`https://twitter.com/hashtag/${match}`}
          type={TwitterLinkType.HASHTAG}
        >
          {match}
        </TwitterLink>
      ));

      return replacedText;
    }

    if (typeof child !== "object" || !("props" in child)) return null;

    if (child.props?.children) {
      return replaceText({
        children: child.props.children as ReactNode[],
        urls,
        urlsToIgnore,
      });
    }

    return child;
  });

  return childs;
}

export default function TweetText({
  text,
  entities,
  urlsToIgnore,
  original,
}: Readonly<TweetTextProps>): ReactElement | null {
  const { darkMode } = useDarkMode();
  const textmoji = twemoji.parse(text, {
    className: "twemoji",
    base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
  });
  const parsedText = useProcessHTML(textmoji);

  const urls = entities?.urls?.map(({ url, display_url, expanded_url }) => ({
    url,
    display_url,
    expanded_url,
  }));

  const replacedText = replaceText({
    children: parsedText,
    urlsToIgnore,
    urls,
  });

  return (
    <p className="tweet-text e-content">
      {replacedText}
      <style jsx>{`
        p.tweet-text {
          text-align: left;
          line-height: 1.5125;
          margin: 0px;
          white-space: pre-wrap;
          padding: 0px;
          font-size: ${original ? "18px" : "15px"};
          font-weight: 400;
          color: ${darkMode ? colors.greyGoose : colors.davyGrey};
        }
      `}</style>
    </p>
  );
}

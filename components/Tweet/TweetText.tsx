import reactStringReplace from "react-string-replace";
import { TwitterLink } from "./TwitterLink";
import twemoji from "twemoji";
import HtmlToReact from "html-to-react";
import { Tweet, TwitterLinkType } from "types/tweet";
import { ReactElement } from "react";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";

interface TweetTextProps {
  text: Tweet["text"];
  entities?: Tweet["entities"];
  quotedTweetUrl?: string;
  original?: boolean;
}

export default function TweetText({
  text,
  entities,
  quotedTweetUrl,
  original,
}: TweetTextProps): ReactElement {
  const { darkMode } = useDarkMode();
  const htmlToReactParser = HtmlToReact.Parser();
  let replacedText;
  const urls = entities?.urls?.map(({ url, display_url, expanded_url }) => ({
    url,
    display_url,
    expanded_url,
  }));

  replacedText = htmlToReactParser.parse(
    twemoji.parse(text, { className: "twemoji" })
  );

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

      return (
        <TwitterLink key={match + i} href={match}>
          {urlToDisplay?.display_url.startsWith("pic.twitter.com") ||
          urlToDisplay?.expanded_url === quotedTweetUrl
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
  replacedText = reactStringReplace(replacedText, /$(\w+)/g, (match, i) => (
    <TwitterLink
      key={match + i}
      href={`https://twitter.com/search?q=%24${match}`}
      type={TwitterLinkType.CASHTAG}
    >
      {match}
    </TwitterLink>
  ));

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

  return (
    <p className="tweet-text">
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
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
      `}</style>
    </p>
  );
}

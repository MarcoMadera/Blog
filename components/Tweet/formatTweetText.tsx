import reactStringReplace from "react-string-replace";
import { TwitterLink } from "./TwitterLink";
import twemoji from "twemoji";
import HtmlToReact from "html-to-react";
import { Tweet } from "types/tweet";
import { ReactNode } from "react";

export function formatTweetText(
  text: Tweet["text"],
  entities?: Tweet["entities"],
  quotedTweetUrl?: string
): ReactNode[] {
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
    <TwitterLink key={match + i} href={`https://twitter.com/${match}`} type="@">
      {match}
    </TwitterLink>
  ));

  // Match cashtags
  replacedText = reactStringReplace(replacedText, /$(\w+)/g, (match, i) => (
    <TwitterLink
      key={match + i}
      href={`https://twitter.com/search?q=%24${match}`}
      type="$"
    >
      {match}
    </TwitterLink>
  ));

  // Match hashtags
  replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
    <TwitterLink
      key={match + i}
      href={`https://twitter.com/hashtag/${match}`}
      type="#"
    >
      {match}
    </TwitterLink>
  ));

  return replacedText;
}

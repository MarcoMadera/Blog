import reactStringReplace from "react-string-replace";
import { TwitterLink } from "./TwitterLink";

export function formatTweetText(text, entities, quotedTweetUrl) {
  let replacedText;
  const urls = entities?.urls?.map(({ url, display_url, expanded_url }) => ({
    url,
    display_url,
    expanded_url,
  }));

  // Match URLs
  replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => {
    const urlToDisplay = urls.find(({ url }) => url === match);

    return (
      <TwitterLink key={match + i} href={match}>
        {urlToDisplay.display_url.startsWith("pic.twitter.com") ||
        urlToDisplay.expanded_url === quotedTweetUrl
          ? null
          : urlToDisplay.display_url}
      </TwitterLink>
    );
  });

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

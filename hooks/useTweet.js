import { useContext } from "react";
import TweetsContext from "../context/TweetsContext";
import TweetsMapContext from "../context/TweetsMapContext";

export default function useTweet(id, hideConversation) {
  const tweets = useContext(TweetsContext);
  const addTweet = useContext(TweetsMapContext);
  if (addTweet) {
    addTweet(id, hideConversation);
    return { ignore: true };
  }

  return { data: tweets ? tweets[id] : undefined };
}

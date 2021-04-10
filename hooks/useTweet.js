import { useContext } from "react";
import TweetsContext from "../context/TweetsContext";
import TweetsMapContext from "../context/TweetsMapContext";

export default function useTweet(id) {
  const tweets = useContext(TweetsContext);
  const addTweet = useContext(TweetsMapContext);
  if (addTweet) {
    addTweet(id);
    return { ignore: true };
  }

  return { data: tweets ? tweets[id] : undefined };
}

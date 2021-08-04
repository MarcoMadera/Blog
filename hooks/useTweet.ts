import { useContext } from "react";
import TweetsContext from "context/TweetsContext";
import DataMapContext from "context/DataMapContext";

export default function useTweet(id: string, hideConversation: boolean) {
  const tweets = useContext(TweetsContext);
  const data = useContext(DataMapContext);

  if (data?.addTweet) {
    data.addTweet(id, hideConversation);
    return { ignore: true };
  }

  return { data: tweets ? tweets[id] : undefined };
}

import { createContext, PropsWithChildren, ReactElement } from "react";
import { Tweets } from "types/posts";

const TweetsContext = createContext<Tweets | undefined>(undefined);

interface TweetsContextProviderProps {
  tweets: Tweets;
}

export function TweetsContextProvider({
  tweets,
  children,
}: PropsWithChildren<TweetsContextProviderProps>): ReactElement {
  return (
    <TweetsContext.Provider value={tweets}>{children}</TweetsContext.Provider>
  );
}

export default TweetsContext;

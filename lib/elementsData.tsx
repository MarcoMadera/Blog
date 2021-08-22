import ReactDOMServer from "react-dom/server";
import Markdown from "components/Markdown";
import { DataMapContextProvider } from "context/DataMapContext";
import { getPlaiceholder } from "plaiceholder";
import { CodeBlocks, Images, Tweets } from "types/posts";
import getTweetData from "utils/getTweetData";
import codeHighlighter from "utils/codeHighlighter";
import { ReactNode } from "react";

export default async function getElementsData(content: string): Promise<{
  tweets: Tweets;
  images: Images;
  codeBlocks: CodeBlocks;
}> {
  const ids: { id: string; hideConversation: boolean }[] = [];
  const imgs: { src: { normal: string; full: string | undefined } }[] = [];
  const codeBlocksArr: {
    id: number;
    content: ReactNode[];
    language?: string;
  }[] = [];

  const addTweet = (id: string, hideConversation: boolean) => {
    if (!ids.some((i) => i.id.includes(id))) {
      ids.push({ id, hideConversation });
    }
  };

  const addImage = (src: { normal: string; full: string | undefined }) => {
    if (!imgs.some((i) => i.src.normal.includes(src.normal))) {
      imgs.push({ src });
    }
  };

  const addCodeBlock = (
    id: number,
    content: ReactNode[],
    language?: string
  ) => {
    if (!codeBlocksArr.some((i) => i.content.includes(content))) {
      codeBlocksArr.push({ id, content, language });
    }
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <DataMapContextProvider
      addTweet={addTweet}
      addImage={addImage}
      addCodeBlock={addCodeBlock}
    >
      <Markdown source={content} html={true} />
    </DataMapContextProvider>
  );

  const tweetsData = await Promise.all(
    ids.map(async ({ id, hideConversation }) => {
      const data = await getTweetData(id, {
        ignoreTweet: false,
        hideConversation,
      });
      return { id, data };
    })
  );

  const codeBlocksData = codeBlocksArr.map(({ id, content, language }) => {
    const highlightedCode = codeHighlighter(content, language);
    const result = ReactDOMServer.renderToStaticMarkup(<>{highlightedCode}</>);
    const data = { result, language };

    return { id, data };
  });

  const imagesData = await Promise.all(
    imgs.map(async ({ src }) => {
      let fullImg = null;
      const { base64, img } = await getPlaiceholder(src.normal, {
        size: 10,
      });
      if (src.full) {
        const { base64, img } = await getPlaiceholder(src.full, {
          size: 10,
        });
        fullImg = { base64, img };
      }
      return { src, base64, img, fullImg };
    })
  );

  const tweets = tweetsData.reduce((result: Tweets, { id, data }) => {
    if (data) {
      result[id] = data;
    }
    return result;
  }, {});

  const codeBlocks = codeBlocksData.reduce(
    (result: CodeBlocks, { id, data }) => {
      if (data) {
        result[id] = data;
      }
      return result;
    },
    {}
  );

  const images = imagesData.reduce(
    (result: Images, { src, base64, img, fullImg }) => {
      if (base64) {
        result[src.normal] = { img, base64, fullImg };
      }
      return result;
    },
    {}
  );
  return { tweets, images, codeBlocks };
}

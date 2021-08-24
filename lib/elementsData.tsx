import ReactDOMServer from "react-dom/server";
import Markdown from "components/Markdown";
import { DataMapContextProvider } from "context/DataMapContext";
import { getPlaiceholder } from "plaiceholder";
import {
  Element,
  ElementCodeBlock,
  ElementImage,
  Elements,
  ElementTweet,
} from "types/posts";
import getTweetData from "utils/getTweetData";
import codeHighlighter from "utils/codeHighlighter";

export default async function getElementsData(
  content: string
): Promise<Elements> {
  const elementsArr: Element[] = [];

  const addElement = (element: Element) => {
    elementsArr.push(element);
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <DataMapContextProvider addElement={addElement}>
      <Markdown source={content} html={true} />
    </DataMapContextProvider>
  );

  const allTweetsId = elementsArr.filter(
    (e) => e.type === "tweet"
  ) as ElementTweet[];

  const tweetsData = await Promise.all(
    allTweetsId.map(async ({ id, hideConversation, type }) => {
      const data = await getTweetData(id, {
        ignoreTweet: false,
        hideConversation,
      });
      return { id: `${type}:${id}`, data };
    })
  );

  const allImagesUrl = elementsArr.filter(
    (e) => e.type === "image"
  ) as ElementImage[];

  const imagesData = await Promise.all(
    allImagesUrl.map(async ({ normal, full, type }) => {
      let fullImg = null;
      const { base64, img } = await getPlaiceholder(normal, {
        size: 10,
      });

      if (full) {
        const { base64, img } = await getPlaiceholder(full, {
          size: 10,
        });
        fullImg = { base64, img };
      }

      return {
        id: `${type}:${normal}`,
        data: { base64, img, fullImg },
      };
    })
  );

  const allCodeBlocks = elementsArr.filter(
    (e) => e.type === "codeBlock"
  ) as ElementCodeBlock[];

  const codeBlocksData = allCodeBlocks.map(
    ({ id, content, language, type }) => {
      const highlightedCode = codeHighlighter(content, language);
      const result = ReactDOMServer.renderToStaticMarkup(
        <>{highlightedCode}</>
      );
      const data = { result, language };

      return { id: `${type}:${id}`, data };
    }
  );

  const elementsData = [...tweetsData, ...imagesData, ...codeBlocksData].reduce(
    (result: Elements, element) => {
      if (element.data) {
        result[element.id] = element.data;
      }
      return result;
    },
    {}
  );

  return elementsData;
}

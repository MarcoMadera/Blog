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
  ImgData,
} from "types/posts";
import getTweetData from "utils/getTweetData";
import codeHighlighter from "utils/codeHighlighter";
import { DarkModeContextProvider } from "context/DarkModeContext";

export default async function getElementsData(
  content: string
): Promise<Elements> {
  const elementsArr: Element[] = [];

  const addElement = (element: Element) => {
    elementsArr.push(element);
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <DarkModeContextProvider>
      <DataMapContextProvider addElement={addElement}>
        <Markdown source={content} html={true} />
      </DataMapContextProvider>
    </DarkModeContextProvider>
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
    allImagesUrl.map(async ({ normal, full, type, id }) => {
      const fullImg: {
        darkImage: Omit<ImgData, "fullImg"> | null;
        lightImage: Omit<ImgData, "fullImg"> | null;
      } = {
        darkImage: null,
        lightImage: null,
      };
      const { base64, img } = await getPlaiceholder(normal, {
        size: 10,
      });

      if (full?.darkImage) {
        const { base64, img } = await getPlaiceholder(full.darkImage, {
          size: 10,
        });
        fullImg.darkImage = { base64, img };
      }

      if (full?.lightImage) {
        const { base64, img } = await getPlaiceholder(full.lightImage, {
          size: 10,
        });
        fullImg.lightImage = { base64, img };
      }

      return {
        id: `${type}:${id}`,
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
      const data = { result };

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

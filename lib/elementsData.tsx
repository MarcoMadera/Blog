import ReactDOMServer from "react-dom/server";
import Markdown, { MarkdownType } from "components/Markdown";
import { DataMapContextProvider } from "context/DataMapContext";
import { getPlaiceholder } from "plaiceholder";
import {
  Element,
  ElementCodeBlock,
  ElementImage,
  Elements,
  ElementTweet,
  ElementSpace,
  ImgData,
} from "types/posts";
import getTweetData from "utils/getTweetData";
import codeHighlighter from "utils/codeHighlighter";
import { DarkModeContextProvider } from "context/DarkModeContext";
import { ToolTipContextProvider } from "context/ToolTipContext";
import getSpaceData from "utils/getSpaceData";

export default async function getElementsData(
  content: string,
  type: MarkdownType
): Promise<Elements> {
  const elementsArr: Element[] = [];

  const addElement = (element: Element) => {
    elementsArr.push(element);
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <DarkModeContextProvider>
      <ToolTipContextProvider>
        <DataMapContextProvider addElement={addElement}>
          <Markdown source={content} html={true} type={type} />
        </DataMapContextProvider>
      </ToolTipContextProvider>
    </DarkModeContextProvider>
  );

  const allTweetElements = elementsArr.filter(
    (e) => e.type === "tweet"
  ) as ElementTweet[];

  const tweetsData = await Promise.all(
    allTweetElements.map(async ({ id, hideConversation, type }) => {
      const data = await getTweetData(id, {
        ignoreTweet: false,
        hideConversation,
      });
      return { id: `${type}:${id}`, data };
    })
  );

  const allSpaceElements = elementsArr.filter(
    (e) => e.type === "space"
  ) as ElementSpace[];

  const spacesData = await Promise.all(
    allSpaceElements.map(async ({ id, type }) => {
      const data = await getSpaceData(id);
      return { id: `${type}:${id}`, data };
    })
  );

  const allImageElements = elementsArr.filter(
    (e) => e.type === "image"
  ) as ElementImage[];

  async function getImagePlaceHolder(src: string) {
    const { base64, img } = await getPlaiceholder(src, {
      size: 10,
    });
    return { base64, img };
  }

  const imagesData = await Promise.all(
    allImageElements.map(async ({ normal, full, type, id }) => {
      const fullImg: {
        darkImage: Omit<ImgData, "fullImg"> | null;
        lightImage: Omit<ImgData, "fullImg"> | null;
      } = {
        darkImage: null,
        lightImage: null,
      };
      const { base64, img } = await getImagePlaceHolder(normal);

      if (full?.darkImage) {
        fullImg.darkImage = await getImagePlaceHolder(full.darkImage);
      }

      if (full?.lightImage) {
        fullImg.lightImage = await getImagePlaceHolder(full.lightImage);
      }

      return {
        id: `${type}:${id}`,
        data: { base64, img, fullImg },
      };
    })
  );

  const allCodeBlockElements = elementsArr.filter(
    (e) => e.type === "codeBlock"
  ) as ElementCodeBlock[];

  const codeBlocksData = allCodeBlockElements.map(
    ({ id, content, language, type }) => {
      const highlightedCode = codeHighlighter(content, language);
      const result = ReactDOMServer.renderToStaticMarkup(
        <>{highlightedCode}</>
      );
      const data = { result };

      return { id: `${type}:${id}`, data };
    }
  );

  const elementsData = [
    ...tweetsData,
    ...imagesData,
    ...codeBlocksData,
    ...spacesData,
  ].reduce((result: Elements, element) => {
    if (element.data) {
      result[element.id] = element.data;
    }
    return result;
  }, {});

  return elementsData;
}

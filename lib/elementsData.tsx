import ReactDOMServer from "react-dom/server";
import Markdown, { MarkdownType } from "components/Markdown";
import { DataMapContextProvider } from "context/DataMapContext";
import { getPlaiceholder } from "plaiceholder";
import type {
  Element,
  ElementsData,
  Elements,
  FullImg,
  ElementId,
} from "types/posts";
import getTweetData from "utils/getTweetData";
import codeHighlighter from "utils/codeHighlighter";
import { DarkModeContextProvider } from "context/DarkModeContext";
import { ToolTipContextProvider } from "context/ToolTipContext";
import getSpaceData from "utils/getSpaceData";
import { getNodeText } from "utils/getNodeText";

export default async function getElementsData(
  content: string,
  type: MarkdownType
): Promise<ElementsData> {
  const elements: Elements = {
    tweet: [],
    space: [],
    image: [],
    codeBlock: [],
    heading: [],
  };

  function addElement(element: Element) {
    const arr: Element[] = elements[element.type];
    arr.push(element);
  }

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

  const tweetsData = await Promise.all(
    elements.tweet.map(async ({ id, hideConversation, type }) => {
      const data = await getTweetData(id, {
        ignoreTweet: false,
        hideConversation,
      });
      return { id: `${type}:${id}` as ElementId, data };
    })
  );

  const spacesData = await Promise.all(
    elements.space.map(async ({ id, type }) => {
      const data = await getSpaceData(id);
      return { id: `${type}:${id}` as ElementId, data };
    })
  );

  async function getImagePlaceHolder(src: string) {
    const { base64, img } = await getPlaiceholder(src, {
      size: 10,
    });
    return { base64, img };
  }

  const imagesData = await Promise.all(
    elements.image.map(async ({ normal, full, type, id }) => {
      const fullImg: FullImg = {
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
        id: `${type}:${id}` as ElementId,
        data: { base64, img, fullImg },
      };
    })
  );

  const codeBlocksData = elements.codeBlock.map(
    ({ id, content, language, type }) => {
      const highlightedCode = codeHighlighter(content, language);
      const result = ReactDOMServer.renderToStaticMarkup(
        <>{highlightedCode}</>
      );
      const data = { result };

      return { id: `${type}:${id}` as ElementId, data };
    }
  );

  const headingsData = elements.heading.map(({ id, type, level, text }) => {
    const data = { level, text: getNodeText(text) };

    return { id: `${type}:${id}` as ElementId, data };
  });

  const elementsData = [
    ...tweetsData,
    ...imagesData,
    ...codeBlocksData,
    ...spacesData,
    ...headingsData,
  ].reduce((result: ElementsData, element) => {
    if (element.data) {
      result[element.id] = element.data;
    }
    return result;
  }, {});

  return elementsData;
}

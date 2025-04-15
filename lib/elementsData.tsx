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
  ImgData,
} from "types/posts";
import getTweetData from "utils/getTweetData";
import codeHighlighter from "utils/codeHighlighter";
import { DarkModeContextProvider } from "context/DarkModeContext";
import { ToolTipContextProvider } from "context/ToolTipContext";
import getSpaceData from "utils/getSpaceData";
import { getNodeText } from "utils/getNodeText";
import { NotificationContextProvider } from "context/NotificationContext";

export async function getImagePlaceHolder(
  src: string,
): Promise<Omit<ImgData, "fullImg">> {
  const isDev = process.env.NODE_ENV === "development";

  let buffer = null;
  if (!isDev) {
    buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
  }

  function deserialize<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }

  const { base64, metadata } = buffer
    ? await getPlaiceholder(buffer, {
        size: 10,
      })
    : {
        base64:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAkElEQVQImSXNOw7CMAwA0GyckFOwcwtGbsKE2Ir4DVwAhJBKoE0tO6kTO3yDENLbn3FASIFj6tBTYI4imkWzakZi40MkQmttKc9SPqUU0QdgAkwUxCBxtd5tV8vF5jiazBqHgP2lxfqGDoLhKEg+M4ynczMY1tfu/bqrSlbhmEzjfrUP8XBuq/3JQQDs/1rwX1uuhqf+VOa4AAAAAElFTkSuQmCC",
        metadata: {
          height: 510,
          width: 510,
          src,
        },
      };

  return { base64, img: { ...deserialize(metadata), src } };
}

export default async function getElementsData(
  content: string,
  type: MarkdownType,
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
        <NotificationContextProvider>
          <DataMapContextProvider addElement={addElement}>
            <Markdown source={content} html={true} type={type} />
          </DataMapContextProvider>
        </NotificationContextProvider>
      </ToolTipContextProvider>
    </DarkModeContextProvider>,
  );

  const tweetsData = await Promise.all(
    elements.tweet.map(async ({ id, hideConversation, type }) => {
      const data = await getTweetData(id, {
        ignoreTweet: false,
        hideConversation,
      });
      return { id: `${type}:${id}` as ElementId, data };
    }),
  );

  const spacesData = await Promise.all(
    elements.space.map(async ({ id, type }) => {
      const data = await getSpaceData(id);
      return { id: `${type}:${id}` as ElementId, data };
    }),
  );

  const imagesData = await Promise.all(
    elements.image.map(async ({ normal, full, type, id }) => {
      const getImgOrNull = (
        src?: string,
      ): Promise<Omit<ImgData, "fullImg"> | null> => {
        return src ? getImagePlaceHolder(src) : Promise.resolve(null);
      };

      const [normalPlaceholder, darkPlaceholder, lightPlaceholder] =
        await Promise.all([
          getImagePlaceHolder(normal),
          getImgOrNull(full?.darkImage),
          getImgOrNull(full?.lightImage),
        ]);

      return {
        id: `${type}:${id}` as ElementId,
        data: {
          base64: normalPlaceholder.base64,
          img: normalPlaceholder.img,
          fullImg: {
            darkImage: darkPlaceholder,
            lightImage: lightPlaceholder,
          },
        },
      };
    }),
  );

  const codeBlocksData = await Promise.all(
    elements.codeBlock.map(async ({ id, content, language, type, meta }) => {
      const highlightedCode = await codeHighlighter(content, language, meta);
      const result = ReactDOMServer.renderToStaticMarkup(highlightedCode);
      const data = { result };

      return { id: `${type}:${id}` as ElementId, data };
    }),
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

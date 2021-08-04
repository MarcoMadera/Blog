import { useState, useEffect, ReactElement, RefObject } from "react";
import TextArea from "./TextArea";
import Options from "../options";
import { Img } from "components/tags";
import useComments from "hooks/useComments";
import { useRouter } from "next/router";
import useUser from "hooks/useUser";
import LoginButtons from "../login/index";
import dynamic from "next/dynamic";
import Loader from "./Loader";

const Preview = dynamic(() => import("./Preview"), {
  ssr: false,
  loading: function Loading() {
    return <Loader />;
  },
});

interface FormProps {
  preview: boolean;
  sendCommentRef: unknown;
  textAreaRef: unknown;
}

export default function Form({
  preview,
  sendCommentRef,
  textAreaRef,
}: FormProps): ReactElement {
  const [selectTextArea, setSelectTextArea] = useState(false);
  const [currentCaret, setCurrentCaret] = useState({ start: 0, end: 0 });
  const { imgURL } = useComments();
  const { user } = useUser();
  const router = useRouter();
  const slug = router.query.slug;

  // Hide the options everytime the slug blog changes
  // it should also be included here to remove the image or message if added one and change page instead of submit
  useEffect(() => {
    return () => setSelectTextArea(false);
  }, [slug]);

  return (
    <>
      {preview ? (
        <Preview sendCommentRef={sendCommentRef} />
      ) : (
        <form>
          <TextArea
            setSelectTextArea={setSelectTextArea}
            textAreaRef={textAreaRef as RefObject<HTMLTextAreaElement>}
            currentCaret={currentCaret}
          />
          <Options
            textAreaRef={textAreaRef}
            setCurrentCaret={setCurrentCaret}
            selectTextArea={selectTextArea}
            sendCommentRef={sendCommentRef}
          />
          {imgURL && <Img src={imgURL} alt="" />}
        </form>
      )}
      {!user && (
        <LoginButtons
          textAreaRef={textAreaRef}
          selectTextArea={selectTextArea}
          sendCommentRef={sendCommentRef}
        />
      )}
      <style jsx>{`
        form {
          width: 100%;
          margin: 4px 0;
          display: grid;
        }
        form :global(details) {
          margin-top: 20px;
        }
        p {
          align-items: center;
          display: inline-flex;
        }
        p :global(svg) {
          margin-right: 5px;
        }
      `}</style>
    </>
  );
}

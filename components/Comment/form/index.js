import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextArea from "./TextArea";
import Options from "../options";
import Preview from "./Preview";
import { Img } from "../../tags";
import useComments from "../../../hooks/useComments";
import { useRouter } from "next/router";
import useUser from "../../../hooks/useUser";
import LoginButtons from "../login/index";

export default function Form({
  preview,
  isValidComment,
  sendCommentRef,
  textAreaRef,
}) {
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
            textAreaRef={textAreaRef}
            currentCaret={currentCaret}
          />
          <Options
            isValidComment={isValidComment}
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
Form.propTypes = {
  preview: PropTypes.bool,
  isValidComment: PropTypes.bool,
  sendCommentRef: PropTypes.object,
  textAreaRef: PropTypes.object,
};

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import TextArea from "./TextArea";
import Options from "../options";
import Preview from "./Preview";
import { Img } from "../../tags";
import useComments from "../../../hooks/useComments";
import { useRouter } from "next/router";

export default function Form({ preview }) {
  const [selectTextArea, setSelectTextArea] = useState(false);
  const [currentCaret, setCurrentCaret] = useState({ start: 0, end: 0 });
  const textAreaRef = useRef(null);
  const { imgURL, comment } = useComments();
  const router = useRouter();
  const slug = router.query.slug;

  // Set the cursor position after select one modified text option
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.selectionEnd = currentCaret.end;
      textAreaRef.current.selectionStart = currentCaret.start;
    }
  }, [currentCaret]);

  // Hide the options everytime the slug blog changes
  // it should also be included here to remove the image or message if added one and change page instead of submit
  useEffect(() => {
    return () => setSelectTextArea(false);
  }, [slug]);

  return (
    <>
      {preview ? (
        <Preview comment={comment} />
      ) : (
        <form>
          <TextArea
            setSelectTextArea={setSelectTextArea}
            textAreaRef={textAreaRef}
          />
          <Options
            textAreaRef={textAreaRef}
            setCurrentCaret={setCurrentCaret}
            selectTextArea={selectTextArea}
          />
          {imgURL && <Img src={imgURL} alt="" />}
        </form>
      )}
      <style jsx>{`
        form {
          width: 100%;
          margin-bottom: 15px;
        }
        form :global(.hiddenOptions + details) {
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
  slug: PropTypes.string,
  user: PropTypes.object,
  setUser: PropTypes.func,
  setAllComments: PropTypes.func,
  preview: PropTypes.bool,
};

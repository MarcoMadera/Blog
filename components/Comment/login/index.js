import Button from "./Button";
import { Github, Twitter } from "../icons";
import useUser from "../../../hooks/useUser";
import PropTypes from "prop-types";

export default function LoginButtons({
  selectTextArea,
  textAreaRef,
  sendCommentRef,
}) {
  const { loginUserWithGithub, loginUserWithTwitter } = useUser();
  return (
    <div>
      <Button
        loginMethod={loginUserWithGithub}
        textAreaRef={textAreaRef}
        sendCommentRef={sendCommentRef}
      >
        <Github width={20} height={20} />
        Identificarse con Github
      </Button>
      <Button
        loginMethod={loginUserWithTwitter}
        textAreaRef={textAreaRef}
        sendCommentRef={sendCommentRef}
      >
        <Twitter width={20} height={20} />
        Identificarse con Twitter
      </Button>
      <style jsx>{`
        div {
          visibility: ${selectTextArea ? "visible" : "hidden"};
          animation: slide-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          display: flex;
          flex-wrap: wrap;
          column-gap: 6px;
          row-gap: 5px;
        }
        div :global(:nth-of-type(1)) {
          background: #211f1f;
        }
        div :global(:nth-of-type(2)) {
          background: #55acee;
        }
        @keyframes slide-bottom {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

LoginButtons.propTypes = {
  selectTextArea: PropTypes.bool,
  textAreaRef: PropTypes.object,
  sendCommentRef: PropTypes.object,
};

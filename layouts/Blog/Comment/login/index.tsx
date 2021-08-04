import Button from "./Button";
import { Github, Twitter } from "components/icons";
import useUser from "hooks/useUser";
import { ReactElement, RefObject } from "react";

interface LoginButtonsProps {
  selectTextArea: boolean;
  textAreaRef: unknown;
  sendCommentRef: unknown;
}

export default function LoginButtons({
  selectTextArea,
  textAreaRef,
  sendCommentRef,
}: LoginButtonsProps): ReactElement {
  const { loginUserWithGithub, loginUserWithTwitter } = useUser();
  return (
    <div>
      <Button
        loginMethod={loginUserWithGithub}
        textAreaRef={textAreaRef as RefObject<HTMLTextAreaElement>}
        sendCommentRef={sendCommentRef as RefObject<HTMLButtonElement>}
      >
        <Github width={20} height={20} />
        Identificarse con Github
      </Button>
      <Button
        loginMethod={loginUserWithTwitter}
        textAreaRef={textAreaRef as RefObject<HTMLTextAreaElement>}
        sendCommentRef={sendCommentRef as RefObject<HTMLButtonElement>}
      >
        <Twitter width={20} height={20} />
        Identificarse con Twitter
      </Button>
      <style jsx>{`
        div {
          visibility: ${selectTextArea ? "visible" : "hidden"};
        }
      `}</style>
      <style jsx>{`
        div {
          animation: slide-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          display: flex;
          flex-wrap: wrap;
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

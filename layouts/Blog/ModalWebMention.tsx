import ActionButton from "components/ActionButton";
import { A, Input } from "components/tags";
import useAnalytics from "hooks/useAnalytics";
import useDarkMode from "hooks/useDarkMode";
import useLockBodyScroll from "hooks/useLockBodyScroll";
import useNotification from "hooks/useNotification";
import { FormEvent, ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HitType } from "types/analytics";
import { IMentions } from "types/mentions";
import { WebMention } from "./WebMention";

export function ModalWebMention({
  slug,
  handleCloseModal,
}: {
  title: string;
  slug: string;
  handleCloseModal: () => void;
}): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element | null>();
  const [mentions, setMentions] = useState<IMentions | null>(null);
  const { darkMode } = useDarkMode();
  const { trackWithGoogleAnalytics } = useAnalytics();
  const [web, setWeb] = useState("");
  const { addNotification } = useNotification();
  useLockBodyScroll();

  useEffect(() => {
    setTargetNode(document.querySelector("#global"));
  }, []);

  useEffect(() => {
    document
      .querySelector("#__next")
      ?.addEventListener("click", handleCloseModal, { once: true });
    return () => {
      document
        .querySelector("#__next")
        ?.removeEventListener("click", handleCloseModal);
    };
  }, [handleCloseModal]);

  useEffect(() => {
    fetch(
      `https://webmention.io/api/mentions.jf2?target=https://marcomadera.com/blog/${slug}`
    )
      .then((response) => {
        return response.json();
      })
      .then((mentions: IMentions) => {
        setMentions(mentions);
      });
  }, [slug]);

  if (targetNode === null) {
    throw new Error("CookiesModal needs a target element with id: global");
  }

  if (targetNode === undefined) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      "https://webmention.io/marcomadera.com/webmention",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `source=${web}&target=https://marcomadera.com/blog/${slug}`,
      }
    );
    if (response.ok) {
      addNotification({
        variant: "success",
        message: "Thanks for your webmention!",
      });
      trackWithGoogleAnalytics(HitType.EVENT, {
        eventAction: "webmention",
        eventCategory: "webmention",
        eventLabel: "webmention",
        eventValue: "1",
      });
    } else {
      addNotification({
        variant: "error",
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return createPortal(
    <div className="modalWebMentionContainer">
      <div className="modalWebMention">
        <div className="modalWebMention__header">
          <h2>Menciones</h2>
        </div>
        <div className="modalWebMention__body">
          <form
            id="webmention-form"
            method="post"
            action="https://webmention.io/marcomadera.com/webmention"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="reply-url-container">
              <label htmlFor="reply-url">
                Envia{" "}
                <A
                  href="https://indieweb.org/Webmention"
                  target="_balnk"
                  rel="noreferrer noopener"
                >
                  Webmentions
                </A>{" "}
                aquí:{" "}
              </label>
              <div className="form-input-button">
                <Input
                  type="text"
                  id="reply-url"
                  name="source"
                  placeholder="https://ejemplo.com/mi-post"
                  onChange={(e) => {
                    setWeb(e.target.value);
                  }}
                />
                <ActionButton
                  className="btn btn-primary flex-none mt-auto"
                  type="submit"
                  id="webmention-submit"
                >
                  Enviar
                </ActionButton>
              </div>
            </div>
          </form>
          <div className="mentions">
            {mentions ? <WebMention mentions={mentions} /> : null}
          </div>
        </div>
      </div>
      <style jsx>{`
        form {
          width: 100%;
          margin-top: 40px;
        }
        .reply-url-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        .reply-url-container label {
          margin-bottom: 0.5rem;
        }
        .mentions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: calc(100vh - 300px);
          overflow-y: auto;
          padding: 20px;
        }
        .form-input-button {
          display: flex;
          width: 100%;
          gap: 0.5rem;
        }
        .modalWebMentionContainer {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          width: calc(100% - 20px);
          max-width: 650px;
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          box-shadow: 0 2px 10px 4px #0000001a;
        }
        .modalWebMention {
          width: 100%;
          background-color: ${darkMode ? "rgba(31, 41, 55, 1)" : "#fff"};
          border-radius: 4px;
          padding: 30px 20px;
        }
        .modalWebMention__header {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>,
    targetNode
  );
}

import ActionButton from "components/ActionButton";
import { A, Input } from "components/tags";
import useAnalytics from "hooks/useAnalytics";
import useLockBodyScroll from "hooks/useLockBodyScroll";
import useNotification from "hooks/useNotification";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { HitType } from "types/analytics";
import { IMentions } from "types/mentions";
import { WebMention } from "./WebMention";

export function ModalWebMention({
  slug,
}: {
  title: string;
  slug: string;
}): ReactElement {
  const [mentions, setMentions] = useState<IMentions | null>(null);
  const { trackWithGoogleAnalytics } = useAnalytics();
  const [web, setWeb] = useState("");
  const { addNotification } = useNotification();
  useLockBodyScroll();

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

  return (
    <div>
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
          max-height: calc(80vh - 246px);
          overflow-y: auto;
          padding: 20px;
        }
        .form-input-button {
          display: flex;
          width: 100%;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}

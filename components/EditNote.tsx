import { MouseEvent, ReactElement, useEffect, useState } from "react";

import { useModal } from "hooks/useModal";
import { Note, getContainerInfo } from "utils/notes";
import useNotePopups from "hooks/useNotePopups";
import { useRouter } from "next/router";

interface IEditPlaylistDetailsProps {
  id: string;
  name: string;
  description?: string;
  range: Range;
  type: "new" | "edit";
  color?: string;
}

export default function EditNote({
  id,
  name: nameProp,
  description: descriptionProp,
  range,
  type,
  color: colorProp,
}: IEditPlaylistDetailsProps): ReactElement | null {
  const [name, setName] = useState(nameProp || "");
  const [description, setDescription] = useState(descriptionProp || "");
  const { setModalData } = useModal();
  const { addNote, removeNote } = useNotePopups();
  const router = useRouter();
  const [color, setColor] = useState(colorProp || "#FFD400");

  function handleSave(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();

    const path = router.asPath.split("#")[0];
    const startOffset = range?.startOffset;
    const endOffset = range?.endOffset;
    const startContainerInfo = getContainerInfo(range?.startContainer);
    const endContainerInfo = getContainerInfo(range?.endContainer);

    if (!startContainerInfo || !endContainerInfo) {
      return console.error("Error getting container info");
    }
    const noteData: Note = {
      start: startContainerInfo,
      end: endContainerInfo,
      startOffset,
      endOffset,
      id,
      note: description,
      title: name,
      color,
    };
    addNote(path, noteData);
    setModalData(null);
  }

  function handleRemove(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    e.stopPropagation();
    const path = router.asPath.split("#")[0];

    removeNote(path, id);
    setModalData(null);
  }

  const [openSettings, setOpenSettings] = useState(false);
  useEffect(() => {
    function handleClick() {
      setOpenSettings(false);
    }
    if (openSettings) {
      document.body.addEventListener("click", handleClick);
    } else {
      document.body.removeEventListener("click", handleClick);
    }

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [openSettings]);

  const colors = [
    "#FFD400",
    "#724CF9",
    "#1DD3B0",
    "#ED6FFF",
    "#AFFC41",
    "#FF5400",
  ];

  if (!id) return null;
  return (
    <div className="container">
      <div className="title">
        <label htmlFor="name" className="title-name">
          Título
        </label>
        <input
          id="name"
          type="text"
          placeholder="Añade un título"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.stopPropagation();
            }
          }}
          spellCheck="false"
          data-ms-editor="true"
          className="title-name-input"
          maxLength={100}
        />
        <span
          aria-label="Character counter"
          aria-live="off"
          aria-atomic="true"
          className={`title-name-counter ${name.length < 90 ? "hidden" : ""}`}
        >
          {name.length || 0}/100
        </span>
      </div>
      <div className="description">
        <label
          htmlFor="text-input-a71ee964a8aa7b67"
          className="description-label"
        >
          Notas
        </label>
        <textarea
          data-testid="playlist-edit-details-description-input"
          placeholder="Añade notas"
          spellCheck="false"
          data-ms-editor="true"
          className="description-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.stopPropagation();
            }
          }}
          maxLength={300}
        />
        <span
          aria-label="Character counter"
          aria-live="off"
          aria-atomic="true"
          className={`description-counter ${
            (description?.length || 0) < 250 ? "hidden" : ""
          }`}
        >
          {description?.length || 0}/300
        </span>
      </div>
      <div className="color-selector">
        <p>Color:</p>
        <div className="colors">
          {colors.map((background) => {
            const selected = color === background;
            return (
              <button
                key={background}
                type="button"
                style={{
                  backgroundColor: `${background}`,
                  borderColor: selected ? "#0099ff" : "#fff",
                  borderWidth: selected ? "2px" : "1px",
                }}
                onClick={() => setColor(background)}
              ></button>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <div className="remove-button-container">
          {type === "new" ? null : (
            <button
              data-testid="playlist-edit-details-save-button"
              className="remove-button button"
              type="button"
              onClick={handleRemove}
              tabIndex={0}
            >
              <span>Remover</span>
            </button>
          )}
        </div>
        <div className="save-button-container">
          <button
            data-testid="playlist-edit-details-save-button"
            className="save-button button"
            type="button"
            onClick={handleSave}
            tabIndex={0}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>

      <p className="disclaimer">
        Las notas se guardan en tu navegador. Si borras el historial o cambias
        de navegador, perderás tus notas.
      </p>
      <style jsx>{`
        section {
          background-color: #1f2937;
          border-radius: 4px;
          box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3),
            0 6px 8px rgba(0, 0, 0, 0.2);
          display: ${openSettings ? "block" : "none"};
          max-height: calc(100vh - 24px);
          max-width: 350px;
          min-width: 140px;
          overflow-y: auto;
          padding: 4px;
          position: absolute;
          left: 0;
          top: calc(100% + 4px);
          z-index: 9999999999999999999999999;
        }
        section .option {
          align-content: center;
          align-items: center;
          background-color: transparent;
          border-radius: 3px;
          border: none;
          color: #ffffffe6;
          cursor: default;
          display: flex;
          font-size: 14px;
          font-weight: 400;
          height: 40px;
          justify-content: space-between;
          line-height: 16px;
          min-width: 100%;
          padding: 8px 10px;
          text-align: start;
          text-decoration: none;
          width: max-content;
        }
        section .option.delimiter {
          border-top: 1px solid hsla(0, 0%, 100%, 0.1);
        }
        section .option:hover,
        section .option:focus {
          outline: none;
          background-color: #ffffff1a;
        }
        :global(.modal) {
          min-height: 384px;
          width: 524px;
        }
        .container {
          grid-gap: 16px;
          display: grid;
          grid-template: 32px 132px 32px auto/180px 1fr;
          grid-template-areas:
            "title title"
            "description description"
            "colors buttons"
            "disclaimer disclaimer";
        }
        .colors {
          grid-area: colors;
        }
        svg {
          fill: currentcolor;
        }
        .three-dots-container {
          height: 32px;
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
        }
        .three-dots-container .three-dots-button {
          align-items: center;
          background-color: rgba(0, 0, 0, 0.3);
          border: none;
          border-radius: 500px;
          color: #b3b3b3;
          display: flex;
          justify-content: center;
          padding: 8px;
          text-decoration: none;
          opacity: 0;
        }
        .three-dots-container .three-dots-buttonbutton:focus {
          opacity: 1;
        }
        .image-container:hover .three-dots-container .three-dots-button {
          opacity: 1;
          pointer-events: auto;
          position: absolute;
        }
        .three-dots-container button:hover {
          color: #fff;
        }
        .three-dots-container span {
          clip: rect(0 0 0 0);
          border: 0;
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }
        .title {
          grid-area: title;
          position: relative;
        }
        .title-name {
          left: 10px;
          box-sizing: border-box;
          margin-block: 0px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: inherit;
          color: #fff;
          inset-inline-start: 10px;
          opacity: 0;
          position: absolute;
          top: 0;
          transform: translateY(-50%);
          -webkit-transition: opacity 0.2s;
          transition: opacity 0.2s;
        }
        .description-label:before,
        .title-name:before {
          background: #282828;
          content: "";
          height: 2px;
          position: absolute;
          right: 50%;
          top: 50%;
          transform: translate(50%, -50%);
          width: 110%;
          z-index: -1;
        }
        .title:focus-within .title-name {
          opacity: 1;
        }
        .title-name-input {
          background: hsla(0, 0%, 100%, 0.1);
          border: 1px solid transparent;
          border-radius: 4px;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          height: 40px;
          padding: 0 12px;
          width: 100%;
        }
        .title-name-input:focus {
          background-color: #333;
          border: 1px solid #535353;
          outline: none;
        }
        .title-name-counter {
          right: 8px;
          top: 0;
          transform: translateY(50%);
          background-color: #2e77d0;
          border-radius: 2px;
          padding: 0 4px;
          position: absolute;
          text-align: center;
          width: 7ch;
        }
        .description {
          grid-area: description;
          margin-top: 8px;
          position: relative;
        }
        .description:focus-within .description-label {
          opacity: 1;
        }
        .description-label {
          left: 10px;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          margin-block: 0px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #fff;
          inset-inline-start: 10px;
          opacity: 0;
          position: absolute;
          top: 0;
          transform: translateY(-50%);
          transition: opacity 0.2s;
        }
        .description-textarea {
          background: hsla(0, 0%, 100%, 0.1);
          border: 1px solid transparent;
          border-radius: 4px;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          height: 100%;
          padding: 8px 8px 28px;
          resize: none;
          width: 100%;
        }
        .description-textarea:focus {
          background-color: #333;
          border: 1px solid #535353;
          outline: none;
        }
        .description-counter {
          bottom: 8px;
          right: 8px;
          width: 8ch;
          background-color: #2e77d0;
          border-radius: 2px;
          padding: 0 4px;
          position: absolute;
          text-align: center;
          width: 7ch;
        }
        .hidden {
          clip: rect(0 0 0 0);
          border: 0;
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }
        .buttons {
          grid-area: buttons;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .remove-button-container,
        .save-button-container {
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          justify-self: flex-end;
        }
        .remove-button,
        .save-button {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          font-size: 1rem;
          font-weight: 700;
          font-family: var(
            --font-family,
            CircularSp,
            CircularSp-Arab,
            CircularSp-Hebr,
            CircularSp-Cyrl,
            CircularSp-Grek,
            CircularSp-Deva,
            var(--fallback-fonts, sans-serif)
          );
          background-color: transparent;
          border: 0px;
          border-radius: 500px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          text-align: center;
          text-decoration: none;
          text-transform: none;
          touch-action: manipulation;
          transition-duration: 33ms;
          transition-property: background-color, border-color, color, box-shadow,
            filter, transform;
          user-select: none;
          vertical-align: middle;
          transform: translate3d(0px, 0px, 0px);
          padding: 0px;
          min-inline-size: 0px;
          align-self: center;
        }
        .save-button {
          background-color: #f6f6f6;
        }
        .save-button span {
          background-color: var(--background-base, #ffffff);
          color: var(--text-base, #000000);
        }
        .remove-button {
          background-color: #721d1d;
        }
        .remove-button span {
          background-color: var(--background-base, #792121);
          color: var(--text-base, #ffffff);
        }
        .button:hover span {
          transform: scale(1.04);
        }
        .button:active span {
          background-color: #b7b7b7;
          box-shadow: none;
          transform: scale(1);
        }
        .remove-button:active span {
          background-color: #721d1d;
        }
        .button span {
          box-sizing: border-box;
          position: relative;
          display: flex;
          border-radius: 500px;
          font-size: inherit;
          min-block-size: 48px;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          padding-block: 8px;
          padding-inline: 32px;
        }
        .disclaimer {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          margin-block: 0px;
          font-size: 0.6875rem;
          font-weight: 500;
          color: inherit;
          grid-area: disclaimer;
          margin-top: 16px;
        }
        .color-selector {
          align-items: flex-start;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-flow: row;
          flex-flow: row;
          flex-grow: 1;
          visibility: visible;
        }
        .color-selector p {
          -webkit-box-flex: 0;
          -ms-flex-positive: 0;
          flex-grow: 0;
          margin-right: 6px;
        }
        .color-selector button {
          border: 1px solid hsla(0, 0%, 100%, 0.08);
          border-radius: 50%;
          flex-shrink: 1;
          height: 24px;
          margin: 0 6px;
          padding: 0;
          width: 24px;
        }
        .color-selector button:hover,
        .color-selector button:focus {
          border-color: #fff;
        }

        @media (max-width: 768px) {
          :global(.modal) {
            width: calc(100vw - 32px);
            height: 100%;
          }

          .container {
            grid-template-columns: 1fr;
            display: flex;
            flex-direction: column;
          }
          .container > :global(*) {
            align-items: center;
          }
          textarea {
            min-height: 120px;
          }
        }
      `}</style>
    </div>
  );
}

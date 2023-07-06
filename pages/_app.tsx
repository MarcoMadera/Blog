import Layout from "components/Layout";
import "styles/globals.css";
import { DarkModeContextProvider } from "context/DarkModeContext";
import { CookiesContextProvider } from "context/CookiesContext";
import { NotificationContextProvider } from "context/NotificationContext";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import GlobalHead from "components/GlobalHead";
import { ToolTipContextProvider } from "context/ToolTipContext";
import { PlayerContextProvider } from "context/PlayerContext";
import { ModalContextProvider } from "context/ModalContext";
import { NotesContextProvider } from "context/NotesContext";
import NoteHighlight from "components/modals/NoteHighlight";
import { useModal } from "hooks/useModal";
import ModalContainer from "components/ModalContainer";

function GlobalComponents() {
  const { modalData, setModalData } = useModal();
  return (
    <>
      <NoteHighlight />
      {modalData && (
        <ModalContainer
          title={modalData.title}
          setModalData={setModalData}
          maxHeight={modalData.maxHeight}
          maxWidth={modalData.maxWidth}
          minHeight={modalData.minHeight}
          minWidth={modalData.minWidth}
          modalRootId={modalData.modalRootId}
          handleClose={modalData.handleClose}
        >
          {modalData.modalElement}
        </ModalContainer>
      )}
    </>
  );
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <DarkModeContextProvider>
      <ToolTipContextProvider>
        <CookiesContextProvider>
          <NotesContextProvider>
            <ModalContextProvider>
              <NotificationContextProvider>
                <PlayerContextProvider>
                  <GlobalHead />
                  <Layout>
                    <Component {...pageProps} />
                    <GlobalComponents />
                  </Layout>
                </PlayerContextProvider>
              </NotificationContextProvider>
            </ModalContextProvider>
          </NotesContextProvider>
        </CookiesContextProvider>
      </ToolTipContextProvider>
    </DarkModeContextProvider>
  );
}

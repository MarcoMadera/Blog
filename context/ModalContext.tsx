import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useMemo,
  useState,
} from "react";

const ModalContext = createContext<IModalContext | undefined>(undefined);

export interface IModalContext {
  modalData: IModalData | null;
  setModalData: Dispatch<SetStateAction<IModalContext["modalData"]>>;
}

interface IModalData {
  title: string;
  modalElement: ReactElement;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  modalRootId?: string;
  handleClose?: () => void;
}

interface IModalContextProviderProps {
  value?: IModalContext;
}

export function ModalContextProvider({
  children,
  value: propsValue,
}: PropsWithChildren<IModalContextProviderProps>): ReactElement {
  const [modalData, setModalData] = useState<IModalData | null>(null);

  const value = useMemo(
    () => ({
      modalData,
      setModalData,
      ...propsValue,
    }),
    [modalData, setModalData, propsValue]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalContext;

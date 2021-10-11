import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import UserContext from "context/UserContext";
import {
  loginAnonymously,
  loginWithGithub,
  loginWithTwitter,
  logOut,
} from "lib/firebase/client";
import useNotification from "./useNotification";
import { FirebaseError } from "firebase-admin";
import { User } from "types/user";

export default function useUser(): {
  loginUserWithGithub: () => void;
  loginUserWithTwitter: () => void;
  loginUserAnonymously: () => Promise<void>;
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isLoggedIn: boolean;
  logOutUser: () => Promise<void>;
} {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { user, setUser, isLoggedIn } = context;
  const { addNotification } = useNotification();

  function validateError(err: FirebaseError) {
    err.code === "auth/account-exists-with-different-credential"
      ? addNotification({
          variant: "info",
          message: "Ya existe una cuenta asociada al mismo email",
        })
      : addNotification({
          variant: "error",
          message: "Ha ocurrido un error al iniciar sesión",
        });
  }

  function loginUserWithGithub() {
    loginWithGithub()
      .then(() => {
        addNotification({
          variant: "info",
          message: "Sesión iniciada con Github",
        });
      })
      .catch((err: FirebaseError) => {
        validateError(err);
      });
  }

  function loginUserWithTwitter() {
    loginWithTwitter()
      .then(() => {
        addNotification({
          variant: "info",
          message: "Sesión iniciada con Twitter",
        });
      })
      .catch((err: FirebaseError) => {
        validateError(err);
      });
  }

  async function loginUserAnonymously() {
    try {
      await loginAnonymously();
      addNotification({
        variant: "info",
        message: "Sesión temporal iniciada",
      });
    } catch (err: unknown) {
      validateError(err as FirebaseError);
    }
  }
  const logOutUser = useCallback(
    () =>
      logOut()
        .then(() => {
          setUser(undefined);
        })
        .then(() => {
          addNotification({
            variant: "info",
            message: "Sesión cerrada",
          });
        })
        .catch(() => {
          addNotification({
            variant: "error",
            message: "Ha ocurrido un error al cerrar sesión",
          });
        }),
    [setUser, addNotification]
  );

  return {
    loginUserWithGithub,
    loginUserWithTwitter,
    loginUserAnonymously,
    user,
    setUser,
    isLoggedIn,
    logOutUser,
  };
}

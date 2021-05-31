import { useCallback, useContext } from "react";
import UserContext from "context/UserContext";
import {
  loginAnonymously,
  loginWithGithub,
  loginWithTwitter,
  logOut,
} from "lib/firebase/client";
import useNotification from "./useNotification";

export default function useUser() {
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  const { addNotification } = useNotification();

  function validateError(err) {
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
      .catch((err) => {
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
      .catch((err) => {
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
    } catch (err) {
      validateError(err);
    }
  }
  const logOutUser = useCallback(
    () =>
      logOut()
        .then(setUser)
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

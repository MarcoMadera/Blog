import { useCallback, useContext } from "react";
import UserContext from "../context/UserContext";
import {
  loginAnonymously,
  loginWithGithub,
  loginWithTwitter,
  logOut,
  mapUserFromFirebaseAuth,
} from "../firebase/client";
import useNotification from "./useNotification";

export default function useUser() {
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  const { setNotification } = useNotification();

  function validateError(err) {
    err.code === "auth/account-exists-with-different-credential"
      ? setNotification({
          variant: "info",
          message: "Ya existe una cuenta asociada al mismo email",
        })
      : setNotification({
          variant: "error",
          message: "Ha ocurrido un error al iniciar sesión",
        });
  }

  async function loginUserWithGithub() {
    try {
      const result = await loginWithGithub();
      return setUser(result);
    } catch (err) {
      validateError(err);
    }
  }
  async function loginUserWithTwitter() {
    try {
      const result_1 = await loginWithTwitter();
      return setUser(result_1);
    } catch (err) {
      validateError(err);
    }
  }
  async function loginUserAnonymously() {
    try {
      const { user: userLoggedIn } = await loginAnonymously();
      const normalizeUser = mapUserFromFirebaseAuth(userLoggedIn);
      return setUser(normalizeUser);
    } catch (err) {
      validateError(err);
    }
  }
  const logOutUser = useCallback(
    () =>
      logOut()
        .then(setUser)
        .catch(() => {
          setNotification({
            variant: "error",
            message: "Ha ocurrido un error al cerrar sesión",
          });
        }),
    [setUser, setNotification]
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

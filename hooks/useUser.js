import { useCallback, useContext } from "react";
import UserContext from "../context/UserContext";
import { loginWithGithub, loginWithTwitter, logOut } from "../firebase/client";
import useNotification from "./useNotification";

export default function useUser() {
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useNotification();

  function loginUser(method) {
    const login = (method) => {
      if (method === "github") {
        return loginWithGithub();
      }
      if (method === "twitter") {
        return loginWithTwitter();
      }
    };
    login(method)
      .then(setUser)
      .catch((err) => {
        err.code === "auth/account-exists-with-different-credential"
          ? setNotification({
              variant: "info",
              message: "Ya existe una cuenta asociada al mismo email",
            })
          : setNotification({
              variant: "error",
              message: "Ha ocurrido un error al iniciar sesión",
            });
      });
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
    loginUser,
    user,
    setUser,
    logOutUser,
  };
}

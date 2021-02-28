import Button from "./Button";
import { Github, Twitter } from "../icons";
import PropTypes from "prop-types";
import { loginWithGithub, loginWithTwitter } from "../../../firebase/client";
import useNotification from "../../../hooks/useNotification";

export default function LoginButtons({ setInfo, setUser }) {
  const { setShowNotification } = useNotification();
  function withGithub(e) {
    e.preventDefault();
    loginWithGithub()
      .then(setUser)
      .catch((err) => {
        err.code === "auth/account-exists-with-different-credential"
          ? setInfo("Ya existe una cuenta asociada al mismo email")
          : setInfo("Ha ocurrido un error al iniciar sesión");
        setShowNotification(true);
      });
    setInfo("");
  }
  function withTwitter(e) {
    e.preventDefault();
    loginWithTwitter()
      .then(setUser)
      .catch((err) => {
        err.code === "auth/account-exists-with-different-credential"
          ? setInfo("Ya existe una cuenta asociada al mismo email")
          : setInfo("Ha ocurrido un error al iniciar sesión");
        setShowNotification(true);
      });
    setInfo("");
  }
  return (
    <div>
      <Button handleLogin={withGithub}>
        <Github width={20} height={20} />
        Identificarse con Github
      </Button>
      <Button handleLogin={withTwitter}>
        <Twitter width={20} height={20} />
        Identificarse con Twitter
      </Button>
      <style jsx>{`
        div {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          column-gap: 6px;
          row-gap: 5px;
        }
        div :global(:nth-of-type(1)) {
          background: #211f1f;
        }
        div :global(:nth-of-type(2)) {
          background: #55acee;
        }
      `}</style>
    </div>
  );
}
LoginButtons.propTypes = {
  setUser: PropTypes.func,
  setInfo: PropTypes.func,
};

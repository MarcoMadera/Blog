import Button from "./Button";
import { Github, Twitter } from "../icons";

export default function LoginButtons() {
  return (
    <div>
      <Button loginMethod="github">
        <Github width={20} height={20} />
        Identificarse con Github
      </Button>
      <Button loginMethod="twitter">
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

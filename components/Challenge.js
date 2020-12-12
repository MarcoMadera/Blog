import PropTypes from "prop-types";
import { imageCloudProvider } from "../site.config";
import { H2, P, Ul, Li, Img } from "./tags";
import ActionAnchor from "./ActionAnchor";

const Challenge = ({
  title,
  liveDemo,
  challengePage,
  repo,
  challengeImg,
  todoList,
  level,
}) => {
  return (
    <article>
      <div>
        <H2>{title}</H2>
        <ActionAnchor href={liveDemo}>Ver en vivo</ActionAnchor>
        <ActionAnchor href={challengePage}>Página del reto</ActionAnchor>
        <ActionAnchor href={repo}>Código</ActionAnchor>
        <P>
          <strong>Nivel en Frontend Mentor: {level}</strong>
        </P>
        <span>Reto:</span>
        <Ul>
          {todoList.map((todo, i) => {
            if (Array.isArray(todo)) {
              return (
                <Li key={i} className="none">
                  <Ul depth={1}>
                    {todo.map((subtodo, i) => (
                      <Li key={i}>{subtodo}</Li>
                    ))}
                  </Ul>
                </Li>
              );
            } else {
              return <Li key={i}>{todo}</Li>;
            }
          })}
        </Ul>
      </div>
      <div>
        <Img
          src={`${imageCloudProvider}/q_auto,f_auto,c_scale,w_550/${challengeImg}`}
          alt={title}
        />
      </div>
      <style global jsx>{`
        .none {
          list-style-type: none;
        }
        main article:nth-child(2n + 3) div:nth-of-type(1) {
          order: 2;
        }
        @media print, screen and (max-width: 876px) {
          main article:nth-child(2n + 3) div:nth-of-type(1) {
            order: unset;
          }
        }
      `}</style>
      <style jsx>{`
        article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 40px;
          align-items: center;
        }
        article > div {
          padding: 40px;
        }
        @media print, screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
          }
          article {
            margin-top: 0px;
            margin-bottom: 20px;
          }
          article > div,
          article > div:nth-of-type(1) {
            padding: 0px;
          }
        }
      `}</style>
    </article>
  );
};

Challenge.propTypes = {
  title: PropTypes.string,
  liveDemo: PropTypes.string,
  challengePage: PropTypes.string,
  repo: PropTypes.string,
  challengeImg: PropTypes.string,
  todoList: PropTypes.array,
  level: PropTypes.string,
};

export default Challenge;

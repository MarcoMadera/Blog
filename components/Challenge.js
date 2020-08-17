import styles from "./styles/Challenge.module.css";

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
    <article className={styles.container}>
      <h3>{title}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <a
                href={liveDemo}
                rel="noopener noreferrer"
                target="_blank"
                className={styles.link}
              >
                Live Demo
              </a>
            </th>
            <th>
              <a
                href={challengePage}
                rel="noopener noreferrer"
                target="_blank"
                className={styles.link}
              >
                Challenge
              </a>
            </th>
            <th>
              <a
                href={repo}
                rel="noopener noreferrer"
                target="_blank"
                className={styles.link}
              >
                Code
              </a>
            </th>
            <th>{level}</th>
          </tr>
        </thead>
      </table>
      <section className="challenge__links"></section>
      <img className="challenges__image" src={challengeImg} alt={title} />
      <span>Reto:</span>
      <ul>
        {todoList.map((todo, i) => {
          if (Array.isArray(todo)) {
            return (
              <ul className="challenge__subList" key={i}>
                {todo.map((subtodo, i) => (
                  <li key={i}>{subtodo}</li>
                ))}
              </ul>
            );
          } else {
            return <li key={i}>{todo}</li>;
          }
        })}
      </ul>
      <hr />
    </article>
  );
};

export default Challenge;

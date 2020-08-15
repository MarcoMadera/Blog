import styles from "./styles/Aside.module.css";
import Github from "./icons/Github";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
const Aside = () => {
  return (
    <aside className={styles.aside}>
      <div className="">
        <img src="/profile.jpg" alt="" />
      </div>
      <Github fill="#efda4c" />
      <LinkedIn fill="#efda4c" />
      <Twitter fill="#efda4c" />
    </aside>
  );
};

export default Aside;

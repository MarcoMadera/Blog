import { colors } from "styles/theme";
import Link from "next/link";
import PropTypes from "prop-types";
import useDarkMode from "hooks/useDarkMode";
import styles from "./anchor.module.css";
export function A({ classname, children, href, title, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    <a
      className={`${classname ? `${`${classname} ${styles.a}`}` : styles.a} `}
      href={href}
      title={title === "" ? undefined : title ?? href}
      {...attribs}
    >
      {children}
      <style jsx>{`
        a {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        a:hover,
        a:focus {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
    </a>
  );
}

export function ALink({ classname, children, href, title, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    <>
      <Link href={href}>
        <a
          title={title === "" ? undefined : title ?? href}
          {...attribs}
          className={`${
            classname ? `${`${classname} ${styles.a}`}` : styles.a
          } `}
        >
          {children}
        </a>
      </Link>
      <style jsx>{`
        a {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        a:focus,
        a:hover {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
    </>
  );
}

A.propTypes = {
  classname: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
};
ALink.propTypes = {
  as: PropTypes.string,
  classname: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
};

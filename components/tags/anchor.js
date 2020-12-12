import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
export const A = ({ href, title, children, classname, ...attribs }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <a href={href} title={title || href} {...attribs} className={classname}>
      {children}
      <style jsx>{`
        a {
          color: ${darkMode ? colors.darkPrimary : colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${darkMode ? colors.darkSecondary : colors.secondary};
        }
      `}</style>
    </a>
  );
};
export const ALink = ({ href, title, children, classname, ...attribs }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <Link href={href}>
        <a title={title || href} {...attribs} className={classname}>
          {children}
        </a>
      </Link>
      <style jsx>{`
        a {
          color: ${darkMode ? colors.darkPrimary : colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${darkMode ? colors.darkSecondary : colors.secondary};
        }
      `}</style>
    </>
  );
};

A.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
  classname: PropTypes.string,
};
ALink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
  classname: PropTypes.string,
};

import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../Layout";

export const A = ({ href, title, children, classname, ...attribs }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <a
      href={href}
      title={title === "" ? undefined : title ?? href}
      {...attribs}
      className={classname}
    >
      {children}
      <style jsx>{`
        a {
          display: inline;
          text-decoration: none;
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        a:hover,
        a:focus {
          text-decoration: underline;
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
    </a>
  );
};
export const ALink = ({
  href,
  title,
  children,
  classname,
  as: asref,
  ...attribs
}) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <Link href={href} as={asref}>
        <a
          title={title === "" ? undefined : title ?? (asref || href)}
          {...attribs}
          className={classname}
        >
          {children}
        </a>
      </Link>
      <style jsx>{`
        a {
          display: inline;
          text-decoration: none;
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        a:hover,
        a:focus {
          text-decoration: underline;
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
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
  node: PropTypes.object,
};
ALink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
  as: PropTypes.string,
  classname: PropTypes.string,
};

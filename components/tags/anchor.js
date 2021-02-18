import { colors } from "../../styles/theme";
import Link from "next/link";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";

export function A({ classname, children, href, title, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    <a
      className={classname}
      href={href}
      title={title === "" ? undefined : title ?? href}
      {...attribs}
    >
      {children}
      <style jsx>{`
        a {
          color: ${darkMode ? colors.dark_primary : colors.primary};
          display: inline;
          text-decoration: none;
        }
        a:hover,
        a:focus {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
          text-decoration: underline;
        }
      `}</style>
    </a>
  );
}

export function ALink({
  as: asref,
  classname,
  children,
  href,
  title,
  ...attribs
}) {
  const { darkMode } = useDarkMode();

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
          color: ${darkMode ? colors.dark_primary : colors.primary};
          display: inline;
          text-decoration: none;
        }
        a:focus,
        a:hover {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
          text-decoration: underline;
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

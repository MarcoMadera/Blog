import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import Link from "next/link";
export const A = ({ href, title, children, classname, ...attribs }) => {
  return (
    <a href={href} title={title || href} {...attribs} className={classname}>
      {children}
      <style jsx>{`
        a {
          color: ${colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${colors.secondary};
        }
      `}</style>
    </a>
  );
};
export const ALink = ({ href, title, children, classname, ...attribs }) => {
  return (
    <>
      <Link href={href}>
        <a title={title || href} {...attribs} className={classname}>
          {children}
        </a>
      </Link>
      <style jsx>{`
        a {
          color: ${colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${colors.secondary};
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

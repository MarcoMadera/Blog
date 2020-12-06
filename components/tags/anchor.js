import { colors } from "../../styles/theme";
import PropTypes from "prop-types";

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

A.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
  classname: PropTypes.string,
};

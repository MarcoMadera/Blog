import { tweets } from "../../styles/theme";
import PropTypes from "prop-types";

export const TwitterLink = ({ href, title, type, children }) => {
  if (!children) {
    return null;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title || type ? undefined : href}
    >
      {`${type ? `${type}${children}` : children}`}
      <style jsx>{`
        a {
          color: ${tweets.linkColor};
          text-decoration: none;
        }
        a:hover,
        a:focus {
          text-decoration: underline;
        }
      `}</style>
    </a>
  );
};

TwitterLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
};

import { colors } from "../../styles/theme";

// eslint-disable-next-line react/prop-types
export const A = ({ href, title, children }) => {
  return (
    <a href={href} title={title || href}>
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

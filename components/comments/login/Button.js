import PropTypes from "prop-types";

export default function Button({ children, handleLogin }) {
  return (
    <button onClick={handleLogin}>
      {children}
      <style jsx>{`
        button {
          padding: 4px;
          width: 190px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          color: #fff;
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        button :global(svg) {
          margin-right: 6px;
        }
        button:hover,
        button:focus {
          filter: brightness(1.1);
        }
      `}</style>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  handleLogin: PropTypes.func,
};

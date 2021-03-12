import PropTypes from "prop-types";

export default function Button({
  children,
  loginMethod,
  textAreaRef,
  sendCommentRef,
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        loginMethod();
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        } else {
          sendCommentRef.current.focus();
        }
      }}
    >
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
          margin: 0 6px 5px 0;
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
  loginMethod: PropTypes.func,
  textAreaRef: PropTypes.object,
  sendCommentRef: PropTypes.object,
};

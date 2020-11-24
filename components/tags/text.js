export const P = ({ children }) => {
  return (
    <p>
      {children}
      <style jsx>{`
        p {
          text-align: justify;
          line-height: 1.6;
        }
      `}</style>
    </p>
  );
};

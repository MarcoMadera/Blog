import { getSiteMetaData } from "../utils/helpers";
const Bio = () => {
  const { author, social } = getSiteMetaData();

  return (
    <section>
      <img src="/profile.jpg" alt="Profile" />
      <p>
        Escrito por <b>{author.name}</b> {author.summary}{" "}
      </p>
      <a
        href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${social.twitter}&tw_p=followbutton`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Seguir
      </a>
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
        }
        img {
          width: 40px;
          height: 40px;
          margin: 0 10px 0 0 !important;
        }
        a {
          margin-left: 10px;
          border: none;
          margin-right: 10px;
          position: relative;
          height: 20px;
          box-sizing: border-box;
          padding: 1px 8px 1px 6px;
          background-color: #1b95e0;
          color: #fff !important;
          border-radius: 3px;
          font-weight: 500;
          cursor: pointer;
          outline: 0;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
          font: normal normal normal 11px/18px "Helvetica Neue", Arial,
            sans-serif;
        }
      `}</style>
    </section>
  );
};
export default Bio;

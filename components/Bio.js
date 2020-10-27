import { getSiteMetaData } from "../utils/helpers";
import { colors } from "../styles/theme";
const Bio = () => {
  const { author, social } = getSiteMetaData();

  return (
    <div>
      <p>
        <span className="Bio__follow">
          <img src="/profile.jpg" alt="Profile" width="40" height="40" />
          <a
            href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${social.twitter}&tw_p=followbutton`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Seguir
          </a>
        </span>
        Escrito por <strong>{author.name}</strong> {author.summary}{" "}
      </p>
      <style jsx>{`
        @keyframes scale-in-center {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        p {
          margin-top: 0;
        }
        span {
          display: inline-flex;
          vertical-align: middle;
        }
        div {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        img {
          width: 40px;
          height: 40px;
          margin: 0 10px 0 0 !important;
        }
        span:hover a {
          display: inline-block;
          animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }
        img:hover + a {
          padding: 1px 7px 1px 6px;
          margin-left: -2px;
          margin-top: 22px;
        }
        a {
          margin-top: 20px;
          position: absolute;
          border: none;
          height: 20px;
          box-sizing: border-box;
          padding: 1px 5px 1px 4px;
          background-color: ${colors.twitter};
          color: ${colors.white} !important;
          border-radius: 3px 3px 10px 10px;
          font-weight: 500;
          cursor: pointer;
          outline: 0;
          display: none;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
          font: normal normal normal 11px/18px "Helvetica Neue", Arial,
            sans-serif;
          transition: 0.3s ease;
        }
      `}</style>
    </div>
  );
};
export default Bio;

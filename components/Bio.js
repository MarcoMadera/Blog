import { getSiteMetaData } from "../utils/helpers";

const Bio = () => {
  const { author, social } = getSiteMetaData();

  return (
    <div>
      <img src="/profile.jpg" alt="Profile" />
      <p>
        Escrito por <b>{author.name}</b> {author.summary}{" "}
        <a href={`https://twitter.com/${social.twitter}`}>Sigueme en twitter</a>
      </p>
    </div>
  );
};
export default Bio;

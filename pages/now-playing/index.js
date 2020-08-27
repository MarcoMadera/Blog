import PropTypes from "prop-types";
const Playing = ({ response }) => {
  console.log(response);
  return (
    <div>
      <h1>{response.is_playing ? "Escuchando" : "Último escuchado"}</h1>
      <h1>Song:</h1>
      <p>{response.item.name}</p>
      <img src={response.item.album.images[1].url} alt="album cover" />
      <h1>Album:</h1>
      <p>{response.item.album.name}</p>
      <h1>Artist:</h1>
      <p>{response.item.album.artists[0].name}</p>
    </div>
  );
};

Playing.getInitialProps = async () => {
  return await fetch("http://marcomadera.com/api/now-playing").then((res) =>
    res.json()
  );
};

Playing.propTypes = {
  response: PropTypes.object,
};

export default Playing;

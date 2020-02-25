import React, { useContext, useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
// import CardAlbum from "../components/card/CardAlbum";
// import Comments from "../components/comment/Comments";
// import List from "../components/List";
// import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";

// styles
import "./../styles/artist.css";

export default function Artists({ match }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [artist, setArtist] = useState(null)
  const [artistStyle, setArtistStyle] = useState("")

  useEffect(() => {

    const getData = async () => {
      const artistRes = await apiHandler.get(`/artists/${match.params.id}`);
      setArtist(artistRes.data);

      const styleRes = await apiHandler.get(`/styles/${artistRes.data.style}`);
      setArtistStyle(styleRes.data.name)
    }

    getData()

  }, []);

  return (
    !!artist ? <>
    <div className="page artist">
      <h1 className="title">{artist.name}</h1>
      <div className="description">
        <div>{artist.description}</div>
        <div>Band ? : {!!artist.isBand ? "YES": "NO"}</div>
        <div>Artist style : {artistStyle === "" ? 'Fetching...' : artistStyle }</div>
      </div>
      </div>
      </> :
    <div className="page artist">
      <p>Loading data ...</p>
    </div>
  );
}

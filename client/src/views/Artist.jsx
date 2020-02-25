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

  useEffect(() => {
    apiHandler.get(`/artists/${match.params.id}`)
    .then(apiRes => {
      console.log(apiRes.data)
      setArtist(apiRes.data);
    });

     return () => {};
    }, []);

  return (
    !!artist ? <>
    <div className="page artist">
      <h1 className="title">{artist.name}</h1>
      <p className="description">{artist.description}</p>
      {/* <p className="style">{artist.style}</p> */}
      <p>{!!artist.isBand ? "(BAND)": "(ALONE)"}</p>
      </div>
      </> :
    <div className="page artist">
      <p>Loading data ...</p>
    </div>
  );
}

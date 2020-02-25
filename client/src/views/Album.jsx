import React, { useContext, useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import UserContext from "../auth/UserContext";
// import Comments from "../components/comment/Comments";
import FormatDate from "../components/FormatDate";
// import Stars from "../components/star/Stars";
import HistoryBack from '../components/HistoryBack.jsx'

// styles
import "../styles/album.css";
import "../styles/comment.css";
import "../styles/star.css";

export default function Album({ match }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    apiHandler.get(`/albums/${match.params.id}`).then(apiRes => {
      setAlbum(apiRes.data);
    });

    return () => {};
  }, []);

  return (

    !!album ? <>

      <HistoryBack />

      <div className="page album">

        <h1 className="title">{album.title}</h1>
        <img className="cover" src={album.cover} alt={album.title}/>
        <p className="description">{album.description}</p>

         <p className="publishing">Album made by {album.artist.name}, created on <FormatDate date={album.createdAt} rule="DD/MM/YYYY" /></p>
      </div>
    </> :
    <div className="page album">
      <p>Loading data ...</p>
    </div>
  );
}

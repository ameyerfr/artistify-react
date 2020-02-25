import React, { useContext, useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import UserContext from "../auth/UserContext";
// import Comments from "../components/comment/Comments";
import FormatDate from "../components/FormatDate";
// import Stars from "../components/star/Stars";
import LabPreview from "../components/LabPreview";
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
      <div className="page album">

        <h1 className="title">{album.title}</h1>
        <img className="cover" src={album.cover} alt={album.title}/>
        <p className="description">{album.description}</p>

         <p className="publishing">Album made by {album.artist.name}, created on <FormatDate date={album.createdAt} rule="DD/MM/YYYY" /></p>
      </div>

      <h1 className="title diy">D.I.Y (Stars)</h1>
      <p>
        The Stars component allow the end-users to rate an artist/album.
        <br />
        The black stars represent the average rate for a given resource.
        <br />
        The yellow stars represent the logged in user rate fro the current
        album.
        <br />
        Bonus: make it modular to rate labels/styles as well.
      </p>

      <hr />

      <h1 className="title diy">D.I.Y (Comments)</h1>
      <p>
        Import a custom {`<Comments />`} allowing the end-users to post comments
        in database related to the current artist.
        <br />
      </p>

      <LabPreview name="album" />
    </> :
    <div className="page album">
      <p>Loading data ...</p>
    </div>
  );
}

import React, { useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardArtist from "../components/card/CardArtist";
import List from "../components/List";
import LabPreview from "../components/LabPreview";
// styles
import "../styles/card.css";
import "../styles/icon-favorite.css";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  
useEffect(() => {
    apiHandler.get("/artists").then(apiRes => {
      setArtists(apiRes.data.artists);
    });
    return () => {};
  }, []);

    return (
      <React.Fragment>
        <h1 className="title">All artists</h1>

        <List
          data={artists}
          Component={CardArtist}
          cssList="cards"
          cssItem="card artist"
        />
      </React.Fragment>
    );
  }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
//custom tools
import { useAuth } from "../../auth/useAuth";
import APIHandler from "../../api/APIHandler";

// Favorite list
import FavoriteList from "./FavoriteList.jsx";
import './../../styles/favorite-list.css'

export default function UserFavorites() {
  const [favoritesAlbums, setFavoritesAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    APIHandler.get(`/users/${currentUser._id}/favorites`).then(apiRes => {
      setFavoritesAlbums(apiRes.data.favoriteAlbums)
      setIsLoading(false)
    });

    return () => {};
  }, []);

  return isLoading ? <div className="page"><p>Loading ...</p></div> : (

    <div>
      <h2 className="title">Favorite Albums</h2>
      {favoritesAlbums.length === 0 && <p>No favorite albums yet ...</p>}
      {favoritesAlbums.length > 0 &&
        <div className="fav-list">
          {favoritesAlbums.map((album, i) => (
            <FavoriteList data={album} key={i} />
          ))}
        </div>
      }

    </div>

  );
}

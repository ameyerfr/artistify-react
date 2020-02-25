import React from "react";
import { Link } from "react-router-dom";

// Icon favorite
import IconFav from "./../icon/IconFavorite.jsx";

export default function FavoriteList({data}) {
  return(
    <div className="fav-list-item">
      <div className="fav-list-image">
        <img src={data.cover} alt={data.title} />
      </div>
      <div className="fav-list-details">
        <h2 className="fav-list-title">{data.title}</h2>
        <p>Description : {data.description}</p>
        <div>
          <Link to={`/albums/${data._id}`}>More details ...</Link>
        </div>
        <div className="fav-list-icon">
          <IconFav resourceType="albums" resourceId={data._id} isAlreadyFavorite={true} />
        </div>
      </div>
    </div>
  )
}

import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return (
    <Link to={`/albums/${data._id}`} className="link">
    <h3 className="title">{data.title}</h3>
    <img src={data.cover} alt={data.title} className="cover"/>
    <IconFav resourceType="albums" resourceId={data._id} />
    </Link>
  )
}

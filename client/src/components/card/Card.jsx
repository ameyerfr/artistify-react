import React from 'react'
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function Card({resourceType, data}) {

    return (
      <>
      <Link to={`/${resourceType}/${data._id}`} className="link">
      <h3 className="title">{data.title}</h3>
      <img src={data.cover} alt={data.title} className="cover"/>
      </Link>
      <IconFav resourceType={resourceType} resourceId={data._id} isAlreadyFavorite={data.isFavorite} />
      </>
    )
}

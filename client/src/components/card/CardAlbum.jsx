import React from "react";
import Card from './Card'

export default function CardAlbum({ data }) {
  return <Card resourceType='albums' data = {data} />
}

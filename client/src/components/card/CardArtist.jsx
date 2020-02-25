import React from "react";
import Card from './Card';

export default function CardArtist({ data }) {
  return <Card resourceType='artists' data = {data} />
}
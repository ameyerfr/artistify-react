import React from "react";
import { useHistory } from "react-router-dom";

export default function HistoryBack () {
  let history = useHistory();

  const onButtonClick = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <>
      <a href="" onClick={onButtonClick}>&lt;&lt; Back</a>
    </>
  );
}

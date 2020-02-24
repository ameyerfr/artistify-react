import React from "react";

export default function ImageUpload({ clbk, imageData= ""}) {
  const fileInput = React.createRef();

  const handleClick = () => {
    fileInput.current.click();
  };

  return (
    <div className={"is-clickable"} title="Choose image">
      {imageData && <img src={imageData} alt="Image url" />}
      <input
        ref={fileInput}
        type="file"
        className="is-hidden"
        onChange={clbk}
      />
      <button type="button" onClick={handleClick}>Choose Image</button>
    </div>
  );
}

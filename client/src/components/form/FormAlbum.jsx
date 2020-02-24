import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";
import ImageUpload from "./ImageUpload";

// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

export default withRouter(function FormAlbum({
  mode = "create",
  _id,
  history,
  match
}) {

  const [state,
    setState
  ] = useState({
    title: "",
    artist: "",
    artists: [],
    label: "",
    labels: [],
    releaseDate: "",
    cover: "",
    coverPreview: "",
    description: "",
    isRequesting: false
  });



  useEffect(() => {

    const getData = async () => {

      let newState = {...state}

      const artistsRes = await APIHandler.get(`/artists`);
      newState.artists = artistsRes.data.artists;

      const labelsRes = await APIHandler.get(`/labels`);
      newState.labels = labelsRes.data.labels;

      if (mode === "edit") {
        const albumRes = await APIHandler.get(`/albums/${_id}`);

        // Convert date
        albumRes.data.releaseDate =  new Date(albumRes.data.releaseDate).toISOString().slice(0,10);

        Object.assign(newState, albumRes.data)

        
      }

      setState(newState);

    };

    getData();

  }, [mode, _id]);



  const handleChange = e => {
    e.persist();
    setState({ ...state, [e.target.id] : e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({ ...state, isRequesting : true})

    const fd = new FormData();
    fd.append("title", state.title);
    fd.append("artist", state.artist);
    fd.append("label", state.label);
    fd.append("releaseDate", state.releaseDate);
    fd.append("cover", state.cover);
    fd.append("description", state.description);

    try {
      if (mode === "create") {
        const apiResult = await APIHandler.post("/albums", fd);
        console.log("apiResult : ", apiResult);
      }
      // else await APIHandler.patch(`/labels/${match.params.id}`, fd);

      history.push("/admin/albums");
    } catch (apiErr) {
      console.error(apiErr);
    }

  };

  const handleImage = file => {
    const reader = new FileReader();

    reader.onloadend = () => {
      // when the fileReader ends reading image  ...
      const base64String = reader.result;
      setState({...state, cover:file, coverPreview:base64String});
    };

    reader.readAsDataURL(file); // read the file from the local disk
  }

  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleChange}>

      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        className="input"
        id="title"
        type="text"
        defaultValue={state.title}
      />

      <label className="label" htmlFor="artist">
        Artists
      </label>
      <select id="artist" value={state.artist} required>
          <option value="" disabled>Select an artist</option>
        {state.artists.map((artist, i) => (
          <option value={artist._id} key={i}>{artist.name}</option>
        ))}
      </select>

      <label className="label" htmlFor="label">
        Labels
      </label>
      <select id="label" value={state.label} required>
        <option value="" disabled>Select a label</option>
        {state.labels.map((label, i) => (
          <option value={label._id} key={i}>{label.name}</option>
        ))}
      </select>

      <label className="label" htmlFor="releaseDate">
        Release Date
      </label>
      <input
        className="input"
        id="releaseDate"
        type="date"
        value={state.releaseDate}
      />

    <label className="label" htmlFor="cover">
      Album Cover
    </label>
    <ImageUpload imageData={state.coverPreview} clbk={e => handleImage(e.target.files[0])} />

    <label className="label" htmlFor="description">
        Description
      </label>
      <input
        className="input"
        id="description"
        type="text"
        defaultValue={state.description}
      />

    <button className="btn" disabled={state.isRequesting}>Create new ablum</button>
    </form>
  );

});

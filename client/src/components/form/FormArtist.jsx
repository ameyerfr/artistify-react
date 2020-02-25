import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";

export default withRouter(function FormArtist({
  mode = "create",
  _id,
  history,
  match
}) {
  const [state, setState] = useState({
    name: "",
    description: "",
    style: "",
    styles: [],
    isBand: false,
    isRequesting: false
  });

  useEffect(() => {
    const getData = async () => {

      let newState = {...state}

      const stylesRes = await APIHandler.get(`/styles`);
      newState.styles = stylesRes.data.styles;

      if (mode === "edit") {
        const artistsRes = await APIHandler.get(`/artists/${_id}`, state);
     
        Object.assign(newState, artistsRes.data)
      }

      setState(newState);
    };
    getData();
  }, [mode, _id]); // si tu passe [] empty array, il se comporte comme componentDidMount ==> il exec qu'une fois

  const handleChange = e => {
    e.persist();
    let val = e.target.value;
    if (e.target.id === "isBand") {
      val = !!e.target.value;
    }
    setState({...state,[e.target.id]: val});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({...state,isRequesting: true
    });

    const { name, description, style, isBand } = state;

    try {
      if (mode === "create") {
        const apiResult = await APIHandler.post("/artists", {
          name, description, style, isBand
        });
        console.log("apiResult : ", apiResult);
      }

      else await APIHandler.patch(`/artists/${match.params.id}`, state);

      history.push("/admin/artists");
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleChange}>
      <label className="label" htmlFor="name">
        Name
      </label>
      <input
        className="input"
        id="name"
        type="text"
        defaultValue={state.name}
      />
      <label className="label" htmlFor="description">
        Description
      </label>
      <input
        className="input"
        id="description"
        type="text"
        defaultValue={state.description}
      />
      <label className="label" htmlFor="style">
        Style
      </label>
      <select id="style" value={state.style} required>
        <option value="" disabled>
          
          Select a style
        </option>
        {state.styles.map((style, i) => (
          <option value={style._id} key={i}>
            
            {style.name}
          </option>
        ))}
      </select>
      <label className="label" htmlFor="isBand">
        isBand ?
      </label>
      <div className="checkboxes">
      <div>
      <label for="isBand"> Yes </label>
        <input
          className="input"
          id="isBand"
          name="isBand"
          type="radio"
          value="truthy value"
          checked={state.isBand}
        />       
      </div>
      <div>
      <label for="isNotBand"> No </label>
        <input
          className="input"
          name="isBand"
          id="isBand"
          value=""
          type="radio"
          checked={!state.isBand}
        />
      </div>
      </div>
      <button className="btn">create</button>
    </form>
  );
});

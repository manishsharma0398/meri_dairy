import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button.component";
import InputForm from "../../components/input-form/InputForm.component";
import RadioInput from "../../components/radio-input/RadioInput.component";

import { addNewAnimal } from "../../store/animal/animal-action-creator";

import "./AddAnimal.styles.scss";

const AddAnimal = () => {
  const navigate = useNavigate();
  const [animalFields, setAnimalFields] = useState({
    identifier: "",
    breed: "",
    animal_type: "",
    animal_status: "",
    date: "",
    gender: "",
    remarks: "",
    photo_url: "",
    bull_name: "",
    dam_name: "",
    bull_breed: "",
    dam_breed: "",
  });
  const [error, setError] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });

  const {
    identifier,
    breed,
    date,
    remarks,
    bull_name,
    dam_name,
    bull_breed,
    dam_breed,
  } = animalFields;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setAnimalFields({ ...animalFields, [e.target.name]: e.target.value });
  };

  const onFileChange = async (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const uploadPhoto = async () => {
    if (!image.raw && !image.preview) {
      console.log("photo not selected");
      return { error: false, data: "" };
    }
    try {
      const formData = new FormData();
      formData.append("photo_url", image.raw);
      const res = await axios.post("/file", formData);
      return { error: false, data: res.data.data };
    } catch (err) {
      console.log(err);
      return { error: true, data: "" };
    }
  };

  const addNewAnimalHandler = async (e) => {
    e.preventDefault();
    const { error, data } = await uploadPhoto();
    if (error) return;
    animalFields.photo_url = data;
    const animalAdded = await addNewAnimal(animalFields);
    const err = animalAdded.error;
    if (err) return;
    return navigate("/animals");
  };

  return (
    <div className="auth">
      <h2 className="auth-title">Add Animal</h2>
      {/* <form className="auth-form" onSubmit={uploadPhoto}> */}
      <form className="auth-form" onSubmit={addNewAnimalHandler}>
        {error && <span className="err-msg">{setError}</span>}

        <label className="label">Animal</label>
        <RadioInput
          id="cow"
          label="Cow"
          name="animal_type"
          inputValue="cow"
          onChangeHandler={onChangeHandler}
        />
        <RadioInput
          id="goat"
          label="Goat"
          name="animal_type"
          inputValue="goat"
          onChangeHandler={onChangeHandler}
        />
        <RadioInput
          id="buffalo"
          label="Buffalo"
          name="animal_type"
          inputValue="buffalo"
          onChangeHandler={onChangeHandler}
        />

        <InputForm
          id="identifier"
          label="Identifier"
          name="identifier"
          inputValue={identifier}
          onChangeHandler={onChangeHandler}
          placeholder="Animal Name/ Tag No/ Or Any Marks"
        />
        <InputForm
          id="breed"
          label="Breed"
          name="breed"
          inputValue={breed}
          onChangeHandler={onChangeHandler}
          placeholder="Animal Breed"
        />
        <label className="label">Gender</label>
        <RadioInput
          id="male"
          label="Male"
          name="gender"
          inputValue="male"
          onChangeHandler={onChangeHandler}
        />
        <RadioInput
          id="female"
          label="Female"
          name="gender"
          inputValue="female"
          onChangeHandler={onChangeHandler}
        />

        <label className="label">Animal Status</label>
        <RadioInput
          id="purchased"
          label="Purchased"
          name="animal_status"
          inputValue="purchased"
          onChangeHandler={onChangeHandler}
        />
        <RadioInput
          id="born_on_farm"
          label="Born On Farm"
          name="animal_status"
          inputValue="born_on_farm"
          onChangeHandler={onChangeHandler}
        />

        <InputForm
          id="date"
          label="Date"
          name="date"
          inputValue={date}
          onChangeHandler={onChangeHandler}
          placeholder="Date"
          type="date"
        />
        <InputForm
          id="remarks"
          label="Remarks"
          name="remarks"
          inputValue={remarks}
          onChangeHandler={onChangeHandler}
          placeholder="Remarks"
        />
        <InputForm
          id="bull_name"
          label="Bull Name"
          name="bull_name"
          inputValue={bull_name}
          onChangeHandler={onChangeHandler}
          placeholder="Bull Name"
        />
        <InputForm
          id="bull_breed"
          label="Bull Breed"
          name="bull_breed"
          inputValue={bull_breed}
          onChangeHandler={onChangeHandler}
          placeholder="Bull Breed"
        />
        <InputForm
          id="dam_name"
          label="Dam Name"
          name="dam_name"
          inputValue={dam_name}
          onChangeHandler={onChangeHandler}
          placeholder="Dam Name"
        />
        <InputForm
          id="dam_breed"
          label="Dam Breed"
          name="dam_breed"
          inputValue={dam_breed}
          onChangeHandler={onChangeHandler}
          placeholder="Dam Breed"
        />

        <div className="img-container">
          <div className="img-preview">
            {image.raw || image.preview ? (
              <img width="100%" src={image.preview} alt="" />
            ) : (
              <h1>No Image Selected</h1>
            )}
          </div>

          <div className="img-actions">
            <button type="button" className="select">
              <label htmlFor="imgFile">Select Image</label>
              <input type="file" id="imgFile" onChange={onFileChange} />
            </button>
            <button
              className="clear"
              onClick={() => setImage({ preview: "", raw: "" })}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>

        <Button text="Add Animal" type="submit" />
      </form>
    </div>
  );
};

export default AddAnimal;
import axios from "axios";
import { SET_ANIMAL_DETAILS } from "./animal-action-types";

export const setAnimalDetails = (animalDetails) => ({
  type: SET_ANIMAL_DETAILS,
  payload: animalDetails,
});

export const getAllAnimals = async () => {
  try {
    console.log("fetching");
    const animalData = await axios.get("/animals/all");
    return { ...animalData.data, error: false };
  } catch (err) {
    return { error: true, data: err.response.data.message };
  }
};

export const addNewAnimal = async (animalDetails) => {
  try {
    const animalData = await axios.post("/animals/add", animalDetails);
    return { ...animalData.data, error: false };
  } catch (err) {
    return { error: true, data: err.response.data.message };
  }
};

export const deleteAnimal = async (animalId) => {
  try {
    console.log(animalId);
    const deletedAnimal = await axios.delete(`/animals/${animalId}`);
    return { error: false, data: deletedAnimal.data };
  } catch (err) {
    return { error: true, data: err.response.data.message };
  }
};

export const removeAnimalFromAllAnimals = (animals, animalId) => {
  return animals.filter((animal) => animal.id !== animalId);
};

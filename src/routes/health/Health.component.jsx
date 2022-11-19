import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

import {
  getHealthData,
  setHealthData,
  deleteHealthData,
} from "../../store/health/health-action-creator";
import { getAnimalNameById } from "../../utils/selectAnimal";

const Health = () => {
  const dispatch = useDispatch();
  const { healthRecords } = useSelector((state) => state.health);

  const health = async () => {
    const { error, data } = await getHealthData();
    if (error) return;
    dispatch(setHealthData(data));
  };

  useEffect(() => {
    health();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHealthHandler = async (id) => {
    const { error } = await deleteHealthData(id);
    if (error) return;
    const updMilkRecords = healthRecords.filter((m) => m.id !== id);
    dispatch(setHealthData(updMilkRecords));
  };

  return (
    <div>
      <Link
        state={{ page: "addHealth", healthId: null }}
        className="btn btn-link"
        to="/health/add"
      >
        Add New Health
      </Link>

      {healthRecords &&
        healthRecords.map((health) => {
          const { id, animal_id, treatment_type, medicine } = health;
          return (
            <div
              style={{
                border: "1px solid gray",
                marginBottom: "10px",
                padding: "10px",
              }}
              key={id}
            >
              <div className="actions">
                <Link
                  state={{ page: "editHealth", healthId: id }}
                  to={`/health/edit`}
                >
                  <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
                </Link>
                <FiTrash2
                  onClick={() => deleteHealthHandler(id)}
                  className="act"
                  style={{ color: "red" }}
                />
              </div>
              <h2>Animal: {getAnimalNameById(animal_id)}</h2>
              <h2>Type: {treatment_type}</h2>
              <h2>Medicine: {medicine}</h2>
            </div>
          );
        })}
    </div>
  );
};

export default Health;

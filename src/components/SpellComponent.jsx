import React from "react";

const SpellComponent = ({ spell, onDelete }) => {
  return (
    <div>
      <div className=" flex flex-col text-center  item-detail bg-base-200 rounded-2xl w-80 h-96 overflow-auto">
        <div className="">
          <h3 className=" mt-3 font-bold text-lg">{spell.name}</h3>
          <p className="text-md m-1 font-bold">Level: {spell.level}</p>
          <p className="text-md m-1 ">
            <span className="font-bold">Components:</span>{" "}
            {spell.material ? spell.material : "none"}
          </p>{" "}
          <p className="text-md m-1 ">
            <span className="font-bold">Duration:</span> {spell.duration}
          </p>
          <p>{spell.desc}</p>
          <p>{spell.higher_level}</p>
        </div>
      </div>
      <button
        className="btn btn-secondary w-full mt-3"
        onClick={() => onDelete(spell.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default SpellComponent;

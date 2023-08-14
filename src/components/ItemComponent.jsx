import React from 'react';

function ItemComponent({ item, onDelete }) {
  return (
    <div>
    <div className=" flex flex-col just  item-detail bg-base-200 rounded-2xl w-80 h-80 overflow-auto">
      <h3 className='text-accent text-lg'>{item.type}</h3>
      <p className='font-bold text-xl'>{item.name}</p>
      <p className='m-1'>{item.description}</p>
    </div>
    <button className='btn btn-accent w-full' onClick={() => onDelete(item.id)}>Delete</button>

    </div>
  );
}

export default ItemComponent;
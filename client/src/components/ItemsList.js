import React from "react";

function ItemsList(props) {
  function handleClick(ev, item) {
    ev.preventDefault();
    props.history.push(`/item-list/${item.id}`);
  }
  
  console.log("ItemsList.js props = ", props)
  return (
    <div className="items-list-wrapper">
      {props.items.map(item => (
        <div
          onClick={ev => handleClick(ev, item)}
          className="item-card"
          key={item.id}
        >
          <img
            className="item-list-image"
            src={item.imageUrl}
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemsList;
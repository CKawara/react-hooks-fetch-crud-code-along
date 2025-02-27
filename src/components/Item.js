import React from "react";

function Item({ item , onUpdateItem, onDeleteItem}) {

  function handleAddToCartClick(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: 'PATCH',
      headers:{
        'content-Type': "application/json",
      },
      body: JSON.stringify({isInCart: !item.isInCart,}),
    })
    .then(resp => resp.json())
    .then(updatedItem => onUpdateItem(updatedItem))
  }

  function handleDelete(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: 'DELETE',
    })
    .then(resp=> resp.json())
    .then(()=> onDeleteItem('deleted!'))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;

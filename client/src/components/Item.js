import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const [item, setItem] = useState({});
  const { push } = useHistory();
  const { id } = props.match.params;
  console.log("Item props", props)
  useEffect(()=>{
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=>{
        setItem(res.data);
      });
  }, []);

  if (!item) {
    return <h2>Loading item data...</h2>;
  }

  const handleClickEdit = (e) => {
    //1. Capture a click of the edit button.
    //2. Redirect the user to the edit form.
    // e.preventDefault();
    // console.log("handleClickEdit")
    props.history.push(`/item-update/${item.id}`);
     
  }
  const handleClickDelete = (e) =>{
    console.log("handleClickDelete")
    axios.delete(`http://localhost:3333/items/${id}`)
    .then(res=>{
      console.log("axios.delete")
      props.deleteItem(id)
      props.setItems(res.data);
      push('/item-list')
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          the story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>shipping</NavLink>
      </nav>
      <Route
        exact
        path="/item-list/:id"
        render={props => <ItemDescription {...props} item={item} />}
      />
      <Route
        path="/item-list/:id/shipping"
        render={props => <ItemShipping {...props} item={item} />}
      />
      <button onClick={handleClickEdit} className="md-button">
        Edit
      </button>
      <button onClick={handleClickDelete} className="md-button">
        Delete
      </button>
    </div>
  );
}

export default Item;

import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";


function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchtxt, setsearchtxt] = useState("")



  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setsearchtxt(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault()

    const addedItem = {
      id: uuid(),
      name: event.target.name.value,
      category: event.target.category.value
    }
    setItems((preval) => [...preval, addedItem])
  } 

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All" & searchtxt=== ""){
      return true;
    }
    else if (item.category === selectedCategory & item.name.toLowerCase().startsWith(searchtxt.toLowerCase()) === true){
      return true;
    }

    else if (selectedCategory === "All" & item.name.toLowerCase().startsWith(searchtxt.toLowerCase()) === true){
      return true;
    }
  });




  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} searchtxt={searchtxt} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

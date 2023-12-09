import React, { useState } from 'react';

function AddItemForm({ onAddItem }) { // Destructure onAddItem from props
  const [itemName, setItemName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name: itemName, expirationDate: expirationDate };
    onAddItem(newItem); // Use the passed function to add the item
    setItemName(''); // Reset itemName
    setExpirationDate(''); // Reset expirationDate
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Item</h2>
      <label>
        Item Name:
        <input 
          type="text" 
          value={itemName} 
          onChange={e => setItemName(e.target.value)} 
        />
      </label>
      <br />
      <label>
        Expiration Date:
        <input 
          type="date" 
          value={expirationDate} 
          onChange={e => setExpirationDate(e.target.value)} 
        />
      </label>
      <br />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;

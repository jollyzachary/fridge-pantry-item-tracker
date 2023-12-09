import React, { useState, useEffect } from 'react';
import AddItemForm from './addItemForm';
import ItemList from './itemList';
import { calculateDaysUntilExpiration } from './utils';

function App() {
  const [items, setItems] = useState([]);
  const [expiredCount, setExpiredCount] = useState(0);
  const [expiringSoonCount, setExpiringSoonCount] = useState(0);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const deleteItem = (indexToDelete) => {
    setItems(items.filter((item, index) => index !== indexToDelete));
  };

  useEffect(() => {
    let expired = 0;
    let expiringSoon = 0;
    items.forEach(item => {
      const daysUntilExpiration = calculateDaysUntilExpiration(item.expirationDate);
      if (daysUntilExpiration < 0) {
        expired++;
      } else if (daysUntilExpiration <= 4) {
        expiringSoon++;
      }
    });
    setExpiredCount(expired);
    setExpiringSoonCount(expiringSoon);
  }, [items]);

  return (
    <div className="App">
      <h1>Fridge/Pantry Item Tracker</h1>
      <div>
        <span>{expiredCount} item(s) have expired.</span><br />
        <span>{expiringSoonCount} item(s) will expire soon.</span>
      </div>
      <AddItemForm onAddItem={addItem} />
      <ItemList items={items} onDeleteItem={deleteItem} />
    </div>
  );
}

export default App;

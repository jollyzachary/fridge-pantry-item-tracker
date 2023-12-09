import React from 'react';
import { calculateDaysUntilExpiration } from './utils';

function ItemList({ items, onDeleteItem }) {
  const goodItems = items.filter(item => calculateDaysUntilExpiration(item.expirationDate) > 4);
  const expiringSoonItems = items.filter(item => {
    const days = calculateDaysUntilExpiration(item.expirationDate);
    return days <= 4 && days >= 0;
  });
  const expiredItems = items.filter(item => calculateDaysUntilExpiration(item.expirationDate) < 0);

  const renderItem = (item, index) => (
    <li key={index}>
      {item.name} - Expires on: {item.expirationDate}
      <button onClick={() => onDeleteItem(index)}>Delete</button>
    </li>
  );

  return (
    <div>
      <h2>Items in Fridge/Pantry</h2>
      <div style={{ backgroundColor: 'green' }}>
        <h3>Good Items</h3>
        <ul>{goodItems.map(renderItem)}</ul>
      </div>
      <div style={{ backgroundColor: 'orange' }}>
        <h3>Expiring Soon</h3>
        <ul>{expiringSoonItems.map(renderItem)}</ul>
      </div>
      <div style={{ backgroundColor: 'red' }}>
        <h3>Expired Items</h3>
        <ul>{expiredItems.map(renderItem)}</ul>
      </div>
    </div>
  );
}

export default ItemList;

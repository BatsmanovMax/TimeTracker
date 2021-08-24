import React from 'react';

function IncomeItem({income, index, removeUser}) {
  let date = new Date(income.date);

  const removeHandle = i => {
    removeUser(i);
  }

  return (
    <div className="income-item">
      <button className="remove-item" onClick={() => removeHandle(index)}>x</button>
      <div className="desc">{income.choosedUser}</div>
      <div className="desc">{income.desc}</div>
      <div className="project">{income.project}</div>
      <div className="date">{income.spentTime}</div>
    </div>
  )
}

export default IncomeItem;
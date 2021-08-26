import React, { useState, useRef, useEffect } from 'react';
import IncomeItem from './IncomeItem';
import getAllUsersList from '../api';

function IncomeList({ income, setIncome }) {
  const [users, setUsers] = useState(null);
  // const [fawStatus, setFawStatus] = useState(false)

  const sortByDate = (a, b) => {
    return a.date - b.date;
  }
  const choosedUser = useRef(null);

  const getUsers = async () => {
    const usersData = await getAllUsersList()
    setUsers(usersData)
  }

  const userFilter = () => {
    var arr = fawFilter(false)
    arr = (arr.filter((item) => {
      return item.choosedUser === choosedUser.current.value
    }))
    setListItems(arr)
  }

  const fawFilter = (state) => {
    // setFawStatus(state)
    return income.filter((item, index) => {
      item.id = index
      return item.isFaw === state
    }).sort(sortByDate)
  }

  const [listItems, setListItems] = useState(fawFilter(false))

  const removeUser = i => {
    let temp = income.filter((v, index) => index !== i);
    setIncome(temp);
  }

  const markFaw = (i, state) => {
    income[i].isFaw = state
    setListItems(fawFilter(!state))
  }

  useEffect(() => {
    !users && getUsers()
  }, [users])

  return (
    <>
      {income.length > 0 ?
        <div className="income-list">
          <button onClick={() => setListItems(() => fawFilter(true))}>favourite posts</button>
          <button onClick={() => setListItems(() => fawFilter(false))}>normal posts</button>
          <select name="users" className="select" id="users" ref={choosedUser} onChange={userFilter}>
              {users && users.map((user) => {
                return <option value={user.name} key={user.id}>{user.name}</option>
              })}
            </select><br/>
          {listItems.length > 0 ?
            listItems.map((value, index) => (
              <IncomeItem
                key={index}
                income={value}
                index={value.id}
                removeUser={removeUser}
                markFaw={markFaw}
              />
            ))
            :
            <h2>No items here</h2>
          }
        </div>
        : <h2 className="income-list">No tracked time</h2>
      }
    </>
  )
}

export default IncomeList;
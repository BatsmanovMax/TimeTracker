import React, { useEffect, useRef, useState } from 'react';
import getAllUsersList from '../api';

function IncomeForm({ income, setIncome }) {
  const desc = useRef(null);
  const date = useRef(null);
  const project = useRef(null);
  const choosedUser = useRef(null);
  const [users, setUsers] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [startStop, setStartStop] = useState('Start');

  const AddIncome = (spentTime) => {
    console.log(spentTime)
    setIncome([...income, {
      "desc": desc.current.value,
      "project": project.current.value,
      "choosedUser": choosedUser.current.value,
      "spentTime": spentTime
    }]);

    desc.current.value = "";
    project.current.value = null;
  }
  const getUsers = async () => {
    const usersData = await getAllUsersList()
    setUsers(usersData)
    setIncome([...income, {
      "choosedUser": usersData[0].name
    }]);
  }

  function trackTime() {
    if (desc.current.value && project.current.value) {
      if (startTime) {
        setStartStop('Start')
        var endTime = new Date()
        var spentTime = (endTime - startTime)
        setStartTime(null)
        AddIncome(spentTime)
        
      }
      else {
        setStartTime(new Date())
        setStartStop('Stop')
      }
    }
    else {
      alert('Fill the for first')
    }

  }

  useEffect(() => {
    !users && getUsers()
  }, [users])

  return (
    <>
      {users &&
        <form className="track-form" onSubmit={AddIncome}>
          <div className="form-inner">
            <select name="users" id="users" ref={choosedUser}>
              {users.map((user) => {
                return <option value={user.name} key={user.id}>{user.name}</option>
              })}
            </select>
            <input type="text" name="project" id="project" placeholder="project..." ref={project} />
            <input type="text" name="desc" id="desc" placeholder="Description of task..." ref={desc} />
            <input type="button" value={startStop} onClick={() => trackTime()} />
          </div>
        </form>
      }
    </>
  )
}

export default IncomeForm;
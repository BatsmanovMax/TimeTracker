import React, { useEffect, useRef, useState } from 'react';
import getAllUsersList from '../api';

function IncomeForm({ income, setIncome }) {
  const desc = useRef(null);
  const project = useRef(null);
  const choosedUser = useRef(null);
  const [users, setUsers] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [startStop, setStartStop] = useState('Start');

  function AddIncome(spentTime) {
    setIncome([...income, {
      "desc": desc.current.value,
      "project": project.current.value,
      "choosedUser": choosedUser.current.value,
      "spentTime": spentTime,
      "isFaw": false
    }]);

    desc.current.value = "";
    project.current.value = null;
  }
  const getUsers = async () => {
    const usersData = await getAllUsersList()
    setUsers(usersData)
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
        <form className="track-form">
          <div className="form-inner">
            <select name="users" className="select" id="users" ref={choosedUser}>
              {users.map((user) => {
                return <option value={user.name} key={user.id}>{user.name}</option>
              })}
            </select><br/>
            <input type="text" name="project" id="project" placeholder="Name of project..." ref={project} />
            <input type="text" name="desc" id="desc" placeholder="Description of task..." ref={desc} />
            <input type="button" value={startStop} onClick={() => trackTime()} />
          </div>
        </form>
      }
    </>
  )
}

export default IncomeForm;
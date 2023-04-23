import './App.css';

import { useEffect, useState } from "react";

import "./App.css";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [response, setResponse] = useState("");


  /* Fetching the data from the backend and setting the state of activities to the data. */
  /*useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/activities`,
      );
      const data = await result.json();
      setActivities(data);
    };
    fetchData();
  });*/

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/health_check`)
      .then(data =>
        {
          if(data.status !== 200){
            throw new Error(data.statusText);
          }
          else {
            return data.text();
          }
        })
      .then(msg => {
        setResponse(msg);
      })
  })

  /**
   * When the user clicks the submit button, the function will prevent the default action of the form,
   * create a new activity object with the name and time values from the form, and then send a POST
   * request to the backend to create a new activity
   */
  const addActivity = async (event) => {
    event.preventDefault();

    const newActivity = {
      name: event.target.activity.value,
      time: event.target.time.value,
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivity),
    });

    event.target.activity.value = "";
    event.target.time.value = "";
    window.location.reload();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 data-testid="app-header-heading">Productivity Tracker</h1>
        <form onSubmit={addActivity}>
          <div>
            <label htmlFor="activity">Activity:</label>
            <input
              type="text"
              id="activity"
              name="activity"
              autoComplete="off"
              data-testid={"activity-name-input"}
            />
          </div>
          <div>
            <label htmlFor="time">Time Taken:</label>
            <input
              type="text"
              id="time"
              name="time"
              autoComplete="off"
              data-testid="activity-duration-input"
            />
          </div>
          <button type="submit" data-testid="activity-add-button">
            Add
          </button>
        </form>
      </header>
      <main className="app-main">
        <h2>Today</h2>

        {activities && activities.length > 0 ? (
          <ol>
            {activities.map((activity) => (
              <li key={activity._id}>
                {activity.name} - {activity.time}
              </li>
            ))}
          </ol>
        ) : (
          <p>No activities yet</p>
        )}
      </main>
      <p>{`From the server: ${response}`}</p>
    </div>
  );
};

export default App;

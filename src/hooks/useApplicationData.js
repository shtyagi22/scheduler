import { useEffect, useState } from "react";
import axios from "axios";


export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = function (state, appointments) {
    const dayObj = state.days.find(weekDay => weekDay.name === state.day);
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }

    }
    const day = { ...dayObj, spots };
    const days = state.days.map(weekDay => weekDay.name === state.day ? day : weekDay);

    return days;
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const days = updateSpots(state, appointments);
        setState({
          ...state,
          appointments,
          days
        });
      })
  }
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots(state, appointments);
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        console.log(all);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  };
};
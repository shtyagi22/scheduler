export function getAppointmentsForDay(state, day) {

  const dayObj = state.days.find(weekday => weekday.name === day);
  if (!dayObj) {
    return [];
  }

  const appointments = [];

  for (const id of dayObj.appointments) {
    const appointment = state.appointments[id];
   
      appointments.push(appointment)
    
  }
  return appointments;
}
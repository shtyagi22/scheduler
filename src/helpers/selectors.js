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
};

export function getInterview(state, interview){
  if(!interview){
    return null;
  }
const interviewObj = {};
interviewObj.interviewer = state.interviewers[interview.interviewer];
interviewObj.student = interview.student;
console.log("interviewObj:",interviewObj)
return interviewObj;
};


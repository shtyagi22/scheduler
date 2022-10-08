import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const InterviewerListItem = props.interviewers.map(interviewer => {


    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          <InterviewerListItem>
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        </InterviewerListItem>

        </ul>
      </section>
    );
  });
}


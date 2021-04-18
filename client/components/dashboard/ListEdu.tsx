import dayjs from "dayjs";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DelEduAction, selectProfile } from "../../state/ProfileSlice";
import { IEducation } from "../../types/profileTypes";

export default function ListEdu(): ReactElement {
  const dispatch = useDispatch();
  const { profile } = useSelector(selectProfile);
  const { education } = profile;

  const SingleEdu = ({ data }: { data: IEducation }) => (
    <tr>
      <td>{data.school}</td>
      <td className="hide-sm">{data.degree}</td>
      <td className="hide-sm">
        {dayjs(data.from).format("MM/DD/YYYY")} -{" "}
        {data.to === null ? "Present" : dayjs(data.to).format("MM/DD/YYYY")}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(DelEduAction(data._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education &&
            education.map((edu) => <SingleEdu key={edu.school} data={edu} />)}
        </tbody>
      </table>
    </>
  );
}

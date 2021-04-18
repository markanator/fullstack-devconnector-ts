import dayjs from "dayjs";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "../../state/ProfileSlice";
import { IExperience } from "../../types/profileTypes";
import { DelExpAction } from "../../state/ProfileSlice";

export default function ListExp(): ReactElement {
  const dispatch = useDispatch();
  const { profile } = useSelector(selectProfile);
  const { experience } = profile;

  const SingleExp = ({ data }: { data: IExperience }) => (
    <tr>
      <td>{data.company}</td>
      <td className="hide-sm">{data.title}</td>
      <td className="hide-sm">
        {dayjs(data.from).format("MM/DD/YYYY")} -{" "}
        {data.to === null ? "Present" : dayjs(data.to).format("MM/DD/YYYY")}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(DelExpAction(data._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience &&
            experience.map((exp) => <SingleExp key={exp.company} data={exp} />)}
        </tbody>
      </table>
    </>
  );
}

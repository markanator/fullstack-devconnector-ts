import dayjs from "dayjs";
import React, { ReactElement } from "react";

interface Props {
  data: any;
}

export default function ProfileEducation({ data }: Props): ReactElement {
  return (
    <div>
      <h3 className="text-dark">{data.fcompany}</h3>
      <p>
        {dayjs(data.from).format("MM/DD/YY")} -{" "}
        {data.to ? dayjs(data.to).format("MM/DD?YY") : "Now"}
      </p>
      <p>
        <strong>Position: </strong> {data.ftitle}
      </p>
      <p>
        <strong>Location: </strong> {data.flocation}
      </p>
      <p>
        <strong>Description: </strong> {data.fdescription}
      </p>
    </div>
  );
}

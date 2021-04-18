import React, { ReactElement } from "react";
import Link from "next/link";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

interface Props {
  data: {
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar: string;
    };
    status: string;
    company: string;
    location: string;
    skills: string[];
  };
}

export default function IndividualProfile({ data }: Props): ReactElement {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={data.user.avatar} alt={data.user.name} />
      <div>
        <h2>{data.user.name}</h2>
        <p>
          {data.status} {data.company && <span> at {data.company} </span>}
        </p>
        <p>{data.location && data.location}</p>
        <Link href={`/profile/${data._id}`}>
          <a className="btn btn-primary">View Profile</a>
        </Link>
      </div>

      <ul>
        {data.skills &&
          data.skills.slice(0, 4).map((skill, idx) => (
            <li key={idx} className="text-primary">
              <FaCheckCircle /> {skill}
            </li>
          ))}
      </ul>
    </div>
  );
}

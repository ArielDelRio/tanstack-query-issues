import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GithubIssue, State } from "../interfaces";
import { useManageIssueData } from "../hooks";
import { timeSince } from "../../helpers";

interface Props {
  issue: GithubIssue;
}

export const IssueItem = ({ issue }: Props) => {
  const { prefetchData, presetData } = useManageIssueData(issue);

  return (
    <div
      onMouseEnter={prefetchData}
      // onMouseEnter={presetData}
      className=" animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === State.Close ? (
        <FiCheckCircle size={30} color="green" className="min-w-10" />
      ) : (
        <FiInfo size={30} color="red" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <Link to={`/issues/issue/${issue.number}`} className="hover:underline ">
          {issue.title}
        </Link>
        <span className="text-gray-500">
          #{issue.number} opened {timeSince(issue.created_at)} ago by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>

        <div className="flex flex-wrap">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="px-2 py-1 my-1 mr-2 text-xs text-white  rounded-md"
              style={{ border: `1px solid #${label.color}` }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt={issue.user.login}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};

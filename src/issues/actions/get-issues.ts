import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue, State } from "../interfaces";

export const getIssues = async (
  state: State,
  labels: string[],
  page: number = 1
): Promise<GithubIssue[]> => {
  await sleep(1500);

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  if (labels.length > 0) {
    params.append("labels", labels.join(","));
  }

  params.append("page", `${page}`);
  params.append("per_page", "5");

  const { data } = await githubApi.get<GithubIssue[]>("/issues", {
    params,
  });

  return data;
};

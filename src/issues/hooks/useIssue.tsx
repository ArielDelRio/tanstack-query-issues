import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";
import { GithubIssue } from "../interfaces";
import queryKeys from "../../shared/query-keys/queryKeys";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: queryKeys.issues(issueNumber),
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60,
  });

  const commentsQuery = useQuery({
    queryKey: ["issues", issueQuery.data?.number, "comments"],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    staleTime: 1000 * 60,
    enabled: !!issueQuery.data,
  });

  return { issueQuery, commentsQuery };
};

export const useManageIssueData = (issue: GithubIssue) => {
  const queryClient = useQueryClient();

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number, "comments"],
      queryFn: () => getIssueComments(issue.number),
      staleTime: 1000 * 60,
    });
  };

  const presetData = () => {
    queryClient.setQueryData(["issues", issue.number], issue, {
      updatedAt: Date.now(),
    });
  };

  return { prefetchData, presetData };
};

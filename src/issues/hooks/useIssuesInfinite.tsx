import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { State } from "../interfaces";
import { getIssues } from "../actions";

interface Props {
  state: State;
  labels: string[];
}

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, labels }],
    queryFn: ({ pageParam, queryKey }) => {
      const [, , args] = queryKey;
      const { state, labels } = args as Props;

      return getIssues(state, labels, pageParam);
    },
    staleTime: 1000 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });

  return {
    issuesQuery,
  };
};

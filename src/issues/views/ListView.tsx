import { useState } from "react";
import { LoadingSpinner } from "../../shared/components";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { State } from "../interfaces";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels((prev) => prev.filter((l) => l !== label));
    } else {
      setSelectedLabels((prev) => [...prev, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <IssueList
              issues={issuesQuery.data ?? []}
              state={state}
              onStateChange={setState}
            />

            <div className="flex justify-between items-center">
              <button
                onClick={prevPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
              >
                Anteriores
              </button>

              <span className="text-gray-400">
                Página {page} 
              </span>

              <button
                onClick={nextPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
              >
                Siguientes
              </button>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelSelected={onLabelSelected}
        />
      </div>
    </div>
  );
};

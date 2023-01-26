import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

const useStore = create(
  persist(
    (set, get) => ({
      jobId: null,
      canSubmit: true,
      jobStatus: null,
      response: null,
      startJob: (id) =>
        set(produce(draft => {
            draft.jobId = id;
            draft.jobStatus = "UNKNOWN";
            draft.response = null;
            draft.canSubmit = false;
        })),
      stopJob: (id) =>
        set(produce(draft => {
            draft.canSubmit = true;
        })),
      setJobStatus: (status) =>
        set(produce(draft => {
            if (status === "DONE") draft.canSubmit = true;
            draft.jobStatus = status;
        })),
      setResponse: (response) =>
        set(produce(draft => {
            draft.response = response;
        })),
    }),
    {
      name: 'movie-recommender-system-local-storage'
    }
  )
)

export default useStore;
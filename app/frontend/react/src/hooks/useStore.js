import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

const useStore = create(
  persist(
    (set, get) => ({
      jobId: null,
      jobStatus: "UNKOWN",
      response: null,
      setJobId: (id) =>
        set(produce(draft => {
            draft.jobId = id;
            draft.jobStatus = null;
            draft.response = null;
        })),
      setJobStatus: (status) =>
        set(produce(draft => {
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
import { writable } from "svelte/store";

// Archive store for managing archive list and viewing state
function createArchiveStore() {
  const { subscribe, set, update } = writable({
    archives: [],
    selectedArchive: null,
    archiveData: null,
    filters: {
      conversation_id: "",
      date_from: "",
      date_to: "",
      customer: "",
    },
    pagination: null,
    isLoading: false,
    error: null,
  });

  return {
    subscribe,
    setArchives: (data) =>
      update((state) => ({
        ...state,
        archives: data.data || [],
        pagination: {
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
          next_page_url: data.next_page_url,
          prev_page_url: data.prev_page_url,
        },
        isLoading: false,
        error: null,
      })),
    selectArchive: (archive, data = null) =>
      update((state) => ({
        ...state,
        selectedArchive: archive,
        archiveData: data,
      })),
    clearSelection: () =>
      update((state) => ({
        ...state,
        selectedArchive: null,
        archiveData: null,
      })),
    setFilters: (filters) =>
      update((state) => ({
        ...state,
        filters: { ...state.filters, ...filters },
      })),
    resetFilters: () =>
      update((state) => ({
        ...state,
        filters: {
          conversation_id: "",
          date_from: "",
          date_to: "",
          customer: "",
        },
      })),
    setLoading: (isLoading) =>
      update((state) => ({
        ...state,
        isLoading,
      })),
    setError: (error) =>
      update((state) => ({
        ...state,
        error,
        isLoading: false,
      })),
    reset: () =>
      set({
        archives: [],
        selectedArchive: null,
        archiveData: null,
        filters: {
          conversation_id: "",
          date_from: "",
          date_to: "",
          customer: "",
        },
        pagination: null,
        isLoading: false,
        error: null,
      }),
  };
}

export const archiveStore = createArchiveStore();

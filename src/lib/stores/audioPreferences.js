import { writable } from "svelte/store";

function createAudioPreferencesStore() {
  const { subscribe, set, update } = writable({
    isMuted: false,
  });

  return {
    subscribe,
    mute: () => update((state) => ({ ...state, isMuted: true })),
    unmute: () => update((state) => ({ ...state, isMuted: false })),
    toggle: () => update((state) => ({ ...state, isMuted: !state.isMuted })),
    isMuted: () => {
      let muted = false;
      subscribe((state) => {
        muted = state.isMuted;
      })();
      return muted;
    },
  };
}

export const audioPreferences = createAudioPreferencesStore();

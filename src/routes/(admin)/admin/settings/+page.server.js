// Server-side load function only
// Client-side rebuild is handled by $lib/Services/aiService.js

export const load = async () => {
  return {
    canRebuild: true,
    timeUntilRebuild: null,
  };
};

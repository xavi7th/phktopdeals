import { browser } from "$app/environment";

/**
 * Play a short chime when staff joins the chat.
 * Uses Web Audio API for low-latency playback.
 * Plays always (not conditional on tab state) per CONTEXT.md.
 */
export function playStaffJoinedPing() {
  if (!browser) return;

  try {
    // Create audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    // Create oscillator for the chime
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Connect oscillator -> gain -> destination
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Set frequency (800Hz for a pleasant chime)
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.type = "sine";

    // Set volume with quick fade out
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    // Start and stop
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);

    // Add a second harmonic for richer sound
    const oscillator2 = ctx.createOscillator();
    const gainNode2 = ctx.createGain();

    oscillator2.connect(gainNode2);
    gainNode2.connect(ctx.destination);

    oscillator2.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator2.type = "sine";

    gainNode2.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator2.start(ctx.currentTime);
    oscillator2.stop(ctx.currentTime + 0.15);

    // Clean up after playing
    setTimeout(() => {
      ctx.close();
    }, 500);
  } catch (error) {
    console.warn("Failed to play staff joined ping:", error);
  }
}

/**
 * Test the audio service (for debugging).
 */
export function testAudio() {
  playStaffJoinedPing();
}

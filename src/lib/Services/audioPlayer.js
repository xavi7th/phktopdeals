/**
 * Audio player utility for notification sounds
 * Uses Web Audio API for synthesized sounds
 */

/** @type {AudioContext | null} */
let audioContext = null;

/**
 * Get or create audio context
 * @returns {AudioContext}
 */
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Play a tone using oscillator
 * @param {number} frequency - Frequency in Hz
 * @param {number} duration - Duration in milliseconds
 * @param {string} type - Oscillator type: sine, square, sawtooth, triangle
 */
function playTone(frequency, duration = 200, type = "sine") {
  try {
    const ctx = getAudioContext();

    // Create oscillator
    const oscillator = ctx.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Create gain node for volume control
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Play
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  } catch (error) {
    console.warn("Audio playback failed:", error);
  }
}

/**
 * Play notification chime - friendly tone for new chats
 */
export function playChime() {
  // Two-tone chime: 440Hz then 550Hz
  playTone(440, 150, "sine");
  setTimeout(() => {
    playTone(550, 200, "sine");
  }, 150);
}

/**
 * Play urgent tone - for AI escalations
 */
export function playUrgent() {
  // Two urgent tones: 880Hz then 660Hz
  playTone(880, 200, "triangle");
  setTimeout(() => {
    playTone(660, 300, "triangle");
  }, 200);
}

/**
 * Play message tone - subtle sound for new messages
 */
export function playMessage() {
  // Single soft tone
  playTone(330, 100, "sine");
}

/**
 * Play error tone
 */
export function playError() {
  // Low error tone
  playTone(220, 300, "sawtooth");
}

/**
 * Play notification based on type
 * @param {string} type - Notification type: chat, escalation, message, error
 */
export function playNotification(type = "chat") {
  switch (type) {
    case "escalation":
    case "urgent":
      playUrgent();
      break;
    case "message":
      playMessage();
      break;
    case "error":
      playError();
      break;
    case "chat":
    default:
      playChime();
      break;
  }
}

/**
 * Check if audio is supported
 * @returns {boolean}
 */
export function isAudioSupported() {
  return typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined";
}

import { describe, it, expect, vi, beforeEach } from "vitest";
import { playStaffJoinedPing, testAudio } from "$lib/ChatWidget/audioService.js";

describe("AudioService", () => {
  let mockAudioContext;
  let mockOscillator;
  let mockGainNode;

  beforeEach(() => {
    // Mock browser environment
    vi.stubGlobal("browser", true);

    // Mock AudioContext
    mockGainNode = {
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
    };

    mockOscillator = {
      connect: vi.fn(),
      frequency: {
        setValueAtTime: vi.fn(),
      },
      type: "sine",
      start: vi.fn(),
      stop: vi.fn(),
    };

    mockAudioContext = {
      createOscillator: vi.fn().mockReturnValue(mockOscillator),
      createGain: vi.fn().mockReturnValue(mockGainNode),
      destination: {},
      currentTime: 0,
      close: vi.fn(),
    };

    vi.stubGlobal(
      "AudioContext",
      vi.fn().mockImplementation(() => mockAudioContext),
    );
    vi.stubGlobal(
      "webkitAudioContext",
      vi.fn().mockImplementation(() => mockAudioContext),
    );
  });

  it("should create AudioContext when playing ping", () => {
    playStaffJoinedPing();

    expect(mockAudioContext.createOscillator).toHaveBeenCalled();
    expect(mockAudioContext.createGain).toHaveBeenCalled();
  });

  it("should set frequency to 800Hz", () => {
    playStaffJoinedPing();

    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(800, expect.any(Number));
  });

  it("should set gain with fade out", () => {
    playStaffJoinedPing();

    expect(mockGainNode.gain.setValueAtTime).toHaveBeenCalledWith(0.3, expect.any(Number));
    expect(mockGainNode.gain.exponentialRampToValueAtTime).toHaveBeenCalledWith(0.01, expect.any(Number));
  });

  it("should start and stop oscillator", () => {
    playStaffJoinedPing();

    expect(mockOscillator.start).toHaveBeenCalled();
    expect(mockOscillator.stop).toHaveBeenCalled();
  });

  it("should not throw if AudioContext fails", () => {
    vi.stubGlobal(
      "AudioContext",
      vi.fn().mockImplementation(() => {
        throw new Error("AudioContext not supported");
      }),
    );

    // Should not throw
    expect(() => playStaffJoinedPing()).not.toThrow();
  });

  it("should not execute if not in browser", () => {
    vi.stubGlobal("browser", false);

    // Should not create AudioContext
    playStaffJoinedPing();

    expect(mockAudioContext.createOscillator).not.toHaveBeenCalled();
  });
});

// Loudness shape of each case's audio: one value per drawn bar, sampled from the
// file itself. Stored as source so the player can draw the waveform before the
// audio is fetched (nothing streams until a visitor presses play).
export const waveforms: Record<string, number[]> = {
  "betano-easter": [
    0.05, 0.07, 0.054, 0.239, 0.319, 0.232, 0.05, 0.257, 0.235, 0.275, 0.318,
    0.408, 0.874, 0.9, 0.795, 0.733, 0.57, 0.703, 0.938, 0.651, 0.86, 0.846,
    1.0, 0.612, 0.685, 0.461, 0.635, 0.618, 0.491, 0.555, 0.453, 0.562, 0.657,
    0.341, 0.877, 0.771, 0.682, 0.394, 0.419, 0.506, 0.902, 0.757, 0.347,
    0.576, 0.633, 0.403, 0.437, 0.635, 0.473, 0.46, 0.472, 0.419, 0.505, 0.521,
    0.441, 0.455, 0.385, 0.39, 0.263, 0.383, 0.454, 0.237, 0.05, 0.05,
  ],
};

export const getWaveform = (slug: string): number[] => waveforms[slug] ?? [];

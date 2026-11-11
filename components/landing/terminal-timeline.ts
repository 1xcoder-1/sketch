const STAGE_TIMES = [800, 3400, 4800, 6500, 8500];
const SPINNER = ["✻", "✶", "✳", "✢", "·"];
export const TERMINAL_CYCLE_MS = 11000;

export function getTerminalFrame(elapsed: number, reducedMotion = false) {
  const time = reducedMotion ? 9000 : Math.max(0, elapsed) % TERMINAL_CYCLE_MS;
  return {
    stage: STAGE_TIMES.filter((start) => time >= start).length,
    progress: Math.round(Math.min(1, Math.max(0, (time - 800) / 2600)) * 100),
    spinner: reducedMotion ? "✓" : SPINNER[Math.floor(time / 100) % SPINNER.length],
  };
}

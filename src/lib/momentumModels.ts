// Momentum engine model
export interface MomentumState {
  momentumScore: number; // 0–100
  momentumState: 'low' | 'rising' | 'stable' | 'peak';
  sessionLength: number; // seconds
  streaks: number;
  combos: number;
  xpGain: number;
  deepWorkSessions: number;
  momentumCurve: number[];
}

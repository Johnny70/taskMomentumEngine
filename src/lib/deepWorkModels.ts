// Deep Work Engine model
export interface DeepWorkState {
  deepWorkScore: number;
  deepWorkState: 'none' | 'light' | 'focus' | 'deep';
  longSessions: number;
  highFocusPeriods: number;
  suitableTasks: number;
}

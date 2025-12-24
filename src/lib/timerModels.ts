// Timer event model for PWOS
export interface TimerEvent {
  id: string;
  taskId: string;
  start: string; // ISO timestamp
  stop?: string; // ISO timestamp
  duration?: number; // seconds
  offline?: boolean;
}

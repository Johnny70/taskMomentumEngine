import { writable } from 'svelte/store';


export interface AISettings {
  endpoint: string;
  model: string;
  temperature: number;
  maxTokens: number;
  top_p: number;
  systemPrompt: string;
}

export const aiSettings = writable<AISettings>({
  endpoint: 'http://192.168.32.101:8000/v1/chat/completions',
  model: 'gemma-llama-3',
  temperature: 0.7,
  maxTokens: 256,
  top_p: 1.0,
  systemPrompt: ''
});

export const aiStatus = writable<'idle' | 'loading' | 'error' | 'success'>('idle');
export const aiLastResponse = writable<string>('');

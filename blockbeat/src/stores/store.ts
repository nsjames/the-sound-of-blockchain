import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const volume:Writable<number> = writable(0.01);
export const selectedWaveType:Writable<string> = writable("square");
export const playing:Writable<boolean> = writable(false);
export const selectedBlockchain:Writable<any> = writable(null);
export const transactions:Writable<Array<string>> = writable([]);
export const currentTransaction:Writable<string> = writable('');


export const audioContext:Writable<AudioContext> = writable(null);
export const audioOscillator:Writable<OscillatorNode> = writable(null);

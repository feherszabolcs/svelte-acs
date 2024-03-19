import { writable } from "svelte/store";

export interface Reader {
  id: number;
  name: string;
  room: string;
  direction: string;
}

export const readers = writable([] as Reader[]);

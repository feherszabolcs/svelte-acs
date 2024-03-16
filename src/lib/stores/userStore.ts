import { writable } from "svelte/store";

export interface User {
  name: string;
  token: string;
  validTo: string;
}

export const user = writable({} as User);

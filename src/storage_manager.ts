import { writable } from "svelte/store";
import type { TimerData } from "./timer";

const key = "fern_timers"

export const storage_timers = writable<Array<TimerData>>(JSON.parse(localStorage.getItem(key) as string) || [])
storage_timers.subscribe(val => localStorage.setItem(key, JSON.stringify(val)))
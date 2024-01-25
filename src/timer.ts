export type TimerData = {
    id: string,
    name: string
    currentTime: number,
    isRunning: boolean,
    timerIntervals: Array<TimerInterval>
}

export type TimerInterval = {
    startTime: number,
    stopTime: number
}
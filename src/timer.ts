export type TimerData = {
    id: string,
    name: string
    startTime: number
    currentTime: number,
    endTime: number,
    totalTime: number
    isRunning: boolean,
    timerIntervals: Array<TimerInterval>
}

export type TimerInterval = {
    startTime: number,
    stopTime: number
}
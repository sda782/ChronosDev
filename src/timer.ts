export type TimerData = {
    id: string,
    name: string
    currentTime: number,
    isRunning: boolean,
    timerIntervals: Array<TimerInterval>,
    visible: boolean
}

export type TimerInterval = {
    startTime: number,
    stopTime: number
}

export function calc_total_duration(timerIntervals: TimerInterval[]): number {
    var dura: number = 0
    timerIntervals.forEach(time_int => {
        if (time_int.stopTime) {
            dura += time_int.stopTime - time_int.startTime
        }
    });
    return dura
}
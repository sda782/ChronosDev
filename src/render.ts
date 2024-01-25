export function get_display_time_from_unix_time(time: number): string {
    var formatted_time = "";
    time = Math.floor(time / 1000);
    var secs = time % 60;
    time = Math.floor(time / 60);
    var mins = time % 60;
    time = Math.floor(time / 60);
    var hours = time % 24;
    time = Math.floor(time / 24);
    formatted_time = `${hours < 10 ? "0" + hours.toString() : hours}:${mins < 10 ? "0" + mins.toString() : mins
        }:${secs < 10 ? "0" + secs.toString() : secs}`;
    return formatted_time;
}

export function display_time_to_string(time: number): string {
    return new Date(time).toLocaleTimeString()
}
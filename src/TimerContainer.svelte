<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { TimerData, TimerInterval } from "./timer";

    export var timer: TimerData;
    export var remove_timer: (id: string) => void;

    var is_running: boolean = false;
    var display_time: string = "00:00:00";
    var is_editing_name: boolean = false;
    var name_input: HTMLInputElement;
    var display_id: string;
    var currentInterval: TimerInterval;

    function update_timer() {
        timer.currentTime = Date.now();
        var diff = timer.currentTime - currentInterval.startTime;
        display_time = get_display_time_from_unix_time(diff);
    }

    function get_display_time_from_unix_time(time: number): string {
        var formatted_time = "";
        time = Math.floor(time / 1000);
        var secs = time % 60;
        time = Math.floor(time / 60);
        var mins = time % 60;
        time = Math.floor(time / 60);
        var hours = time % 24;
        time = Math.floor(time / 24);
        formatted_time = `${hours < 10 ? "0" + hours.toString() : hours}:${
            mins < 10 ? "0" + mins.toString() : mins
        }:${secs < 10 ? "0" + secs.toString() : secs}`;
        return formatted_time;
    }

    function start_timer() {
        var ti: TimerInterval = {
            startTime: Date.now(),
            stopTime: 0,
        };
        timer.timerIntervals.push(ti);
        currentInterval = ti;
        if (timer.startTime == 0) timer.startTime = ti.startTime;
        is_running = true;
        interval = setInterval(update_timer, 1000);
        console.log("starting");
    }

    function stop_timer() {
        timer.timerIntervals[timer.timerIntervals.length - 1].stopTime =
            Date.now();
        is_running = false;
    }

    function toggle_name_edit() {
        is_editing_name = !is_editing_name;
        console.log(is_editing_name);
    }

    onMount(() => {
        display_id = timer.id.substring(0, 4) + "...";
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    let interval = setInterval(update_timer, 1000);
    $: if (!is_running) clearInterval(interval);
</script>

<div class="timercontainer">
    <p style="font-size: smaller;"><em>{display_id}</em></p>
    <h1>
        {display_time}
    </h1>
    <div
        on:dblclick={() => {
            if (!is_editing_name) toggle_name_edit();
        }}
        role="button"
        tabindex="0">
        {#if is_editing_name}
            <input
                class="name_edit"
                bind:value={timer.name}
                bind:this={name_input}
                on:keypress={(event) => {
                    if (event.key === "Enter") {
                        toggle_name_edit();
                    }
                }} />
        {:else}
            <p>{timer.name}</p>
        {/if}
    </div>
    <div>
        {#if !is_running}
            <button class="btn" on:click={start_timer}><b>START</b></button>
        {:else}
            <button
                class="btn"
                on:click={stop_timer}
                style="background-color: var(--accent-dark);"
                ><b>STOP</b></button>
        {/if}
    </div>
    <div class="floating_button">
        <button
            on:click={() => {
                var res = window.confirm("Your are deleting:\n " + name);
                if (res) {
                    console.log("TC", timer.id);
                    remove_timer(timer.id);
                }
            }}>X</button>
    </div>
</div>

<style>
    .timercontainer {
        border-radius: 10px;
        max-width: 20em;
        min-width: 20em;
        max-height: 15em;
        text-align: center;
        padding-bottom: 10px;
        margin: 10px;
        background: linear-gradient(
            to bottom right,
            var(--primary),
            var(--secondary-dark)
        );
        filter: drop-shadow(0 0 var(--dropshadow-size) var(--accent-dark));
    }
    .btn {
        min-width: 80%;
        border: none;
        border-radius: 5px;
        background: var(--primary);
        padding: 7px;
    }
    .name_edit {
        text-align: center;
        width: 80%;
        margin-bottom: 16px;
        background: transparent;
        border: 1px solid white;
        border-radius: 5px;
    }
    .floating_button {
        position: absolute;
        top: 7px;
        right: 7px;
    }
    .floating_button > button {
        background-color: var(--accent-dark);
        width: 2em;
        height: 2em;
        border: none;
        border-radius: 50%;
        filter: drop-shadow(0 0 var(--dropshadow-size) var(--accent-dark));
    }
</style>

<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import {
        calc_total_duration,
        type TimerData,
        type TimerInterval,
    } from "./timer";
    import {
        get_display_time_from_unix_time,
        display_time_to_string,
    } from "./render";

    export var innerWidth: number;
    export var timer: TimerData;
    export var remove_timer: (id: string) => void;

    var show_info_box = false;
    var display_time: string = "00:00:00";
    var is_editing_name: boolean = false;
    var show_left: boolean = false;
    var name_input: HTMLInputElement;
    var currentInterval: TimerInterval;

    function update_timer() {
        timer.currentTime = Date.now();
        display_time = get_display_time_from_unix_time(
            timer.currentTime - currentInterval.startTime,
        );
    }

    function start_timer() {
        var ti: TimerInterval = {
            startTime: Date.now(),
            stopTime: 0,
        };
        timer.timerIntervals.push(ti);
        currentInterval = ti;
        timer.isRunning = true;
        interval = setInterval(update_timer, 1000);
    }

    function stop_timer() {
        timer.timerIntervals[timer.timerIntervals.length - 1].stopTime =
            Date.now();
        timer.isRunning = false;
    }

    function toggle_name_edit() {
        is_editing_name = !is_editing_name;
    }

    function open_info_box(e: MouseEvent): void {
        show_left = e.clientX > innerWidth / 2;
        show_info_box = true;
    }

    function close_info_box(): void {
        show_info_box = false;
    }

    onDestroy(() => {
        clearInterval(interval);
    });

    let interval = setInterval(update_timer, 1000);
    $: if (!timer.isRunning) clearInterval(interval);
</script>

<div
    class="container"
    on:mouseenter={(e) => open_info_box(e)}
    on:mouseleave={() => close_info_box()}
    role="contentinfo">
    <h1>
        {display_time}
    </h1>
    <div
        on:dblclick={(e) => {
            e.preventDefault();
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
        {#if !timer.isRunning}
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
                var res = window.confirm("Your are deleting:\n " + timer.name);
                if (res) {
                    remove_timer(timer.id);
                }
            }}>X</button>
    </div>
    {#if show_info_box}
        <div
            class="info_box container {show_left
                ? 'info_box_left'
                : 'info_box_right'} ">
            <h2><em>Intervals</em></h2>
            <table class="log_table">
                <tbody>
                    <tr>
                        <th>start</th>
                        <th>end</th>
                        <th>time</th>
                    </tr>
                    {#each timer.timerIntervals as time_int}
                        <tr>
                            <td>
                                {display_time_to_string(time_int.startTime)}
                            </td>
                            <td>
                                {#if time_int.stopTime}
                                    {display_time_to_string(time_int.stopTime)}
                                {/if}
                            </td>
                            <td>
                                {#if time_int.stopTime}
                                    {get_display_time_from_unix_time(
                                        time_int.stopTime - time_int.startTime,
                                    )}
                                {/if}
                            </td>
                        </tr>
                    {/each}
                    <tr>
                        <td></td>
                        <td></td>
                        <td
                            >{get_display_time_from_unix_time(
                                calc_total_duration(timer.timerIntervals),
                            )}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .info_box_left {
        right: calc(20em - 50px);
    }
    .info_box_right {
        right: calc(-20em - 25px);
    }
    .info_box {
        position: absolute;
        top: 10px;
        padding: 0px 20px 0px 20px;
    }
    .container {
        border-radius: 10px;
        max-width: 20em;
        min-width: 20em;
        text-align: center;
        padding-bottom: 10px;
        margin: 10px;
        background: linear-gradient(
            to bottom right,
            var(--primary),
            var(--accent-dark)
        );
        filter: drop-shadow(0 0 var(--dropshadow-size) var(--accent-dark));
    }
    .container:hover {
        z-index: 100;
    }
    .btn {
        min-width: 80%;
        border: none;
        border-radius: 5px;
        background: var(--primary);
        padding: 7px;
        margin-bottom: 1em;
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
        background-color: transparent;
        width: 2em;
        height: 2em;
        border: 1px solid white;
        border-radius: 50%;
        filter: drop-shadow(0 0 var(--dropshadow-size) var(--accent-dark));
    }
    .log_table {
        width: 100%;
    }
</style>

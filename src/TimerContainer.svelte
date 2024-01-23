<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    export var id: string;
    var is_running: boolean = false;
    var start_time = 0;
    var current_time = 0;
    export var name = "test";
    export var remove_timer: (id: string) => void;

    var secs_diff: number = 0;
    var mins_diff: number = 0;
    var hours_diff: number = 0;
    var diff: number = 0;
    var is_editing_name: boolean = false;
    var name_input: HTMLInputElement;
    var display_id: string;

    function update_timer() {
        current_time = Date.now();
        diff = current_time - start_time;
        diff = Math.floor(diff / 1000);
        secs_diff = diff % 60;
        diff = Math.floor(diff / 60);
        mins_diff = diff % 60;
        diff = Math.floor(diff / 60);
        hours_diff = diff % 24;
        diff = Math.floor(diff / 24);
        console.log("running");
    }

    function start_timer() {
        start_time = Date.now();
        is_running = true;
        interval = setInterval(update_timer, 1000);
        console.log("starting");
    }

    function stop_timer() {
        is_running = false;
    }

    function toggle_name_edit() {
        is_editing_name = !is_editing_name;
        console.log(is_editing_name);
    }

    onMount(() => {
        display_id = id.substring(0, 4) + "...";
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
        {hours_diff < 10
            ? "0" + hours_diff.toString()
            : hours_diff}:{mins_diff < 10
            ? "0" + mins_diff.toString()
            : mins_diff}:{secs_diff < 10
            ? "0" + secs_diff.toString()
            : secs_diff}
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
                bind:value={name}
                bind:this={name_input}
                on:keypress={(event) => {
                    if (event.key === "Enter") {
                        toggle_name_edit();
                    }
                }} />
        {:else}
            <p>{name}</p>
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
                    console.log("TC", id);
                    remove_timer(id);
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

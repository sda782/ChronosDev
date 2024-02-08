<script lang="ts">
    import { onMount } from "svelte";
    import TimerContainer from "./TimerContainer.svelte";
    import Globalsearch from "./Globalsearch.svelte";
    import type { TimerData } from "./timer";
    import { storage_timers } from "./storage_manager";

    var innerWidth = 0;
    var birdnames: Array<string> = [];

    function add_new_timer() {
        var timer: TimerData = {
            id: crypto.randomUUID(),
            currentTime: 0,
            name: getbird(),
            isRunning: false,
            timerIntervals: [],
            visible: true,
        };
        $storage_timers = [...$storage_timers, timer];
    }

    function clear_timers() {
        $storage_timers = [];
    }

    function getbird(): string {
        return birdnames[Math.floor(Math.random() * birdnames.length)];
    }
    function remove_timer(id: string): void {
        var remove_index = $storage_timers.findIndex((i) => i.id === id);
        $storage_timers.splice(remove_index, 1);
        $storage_timers = [...$storage_timers];
    }

    onMount(async () => {
        var res = await fetch("./names.txt");
        var text = await res.text();
        birdnames = [...text.split("\n")];
        if ($storage_timers.length <= 0) {
            add_new_timer();
        }
        console.log($storage_timers);
    });
</script>

<svelte:window bind:innerWidth />
<div class="container">
    <Globalsearch></Globalsearch>
    <button class="menu_btn" on:click={add_new_timer}>add</button>
    <button class="menu_btn" on:click={clear_timers}>clear</button>
    <span style="font-size: smaller;"><em>Fern - Aevum - 2024</em></span>
    <div class="grid">
        {#each $storage_timers as timer}
            <TimerContainer {timer} {remove_timer} {innerWidth} />
        {/each}
    </div>
</div>

<style>
    .menu_btn {
        padding: 5px;
        margin-right: 0.5em;
        min-width: 125px;
        border: none;
        border-radius: 5px;
        background: linear-gradient(
            to bottom right,
            var(--primary),
            var(--secondary-dark)
        );
        filter: drop-shadow(0 0 var(--dropshadow-size) var(--accent-dark));
    }
    .container {
        margin-top: 50px;
        max-width: 90vw;
        margin-left: 5vw;
        margin-right: 5vw;
    }
    .grid {
        justify-content: center;
        margin-top: 25px;
        display: flex;
        flex-wrap: wrap;
    }
</style>

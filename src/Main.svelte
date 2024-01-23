<script lang="ts">
    import { onMount } from "svelte";
    import TimerContainer from "./TimerContainer.svelte";
    var timers: Array<string> = [];
    var birdnames: Array<string> = [];
    function add_new_timer() {
        timers = [...timers, crypto.randomUUID()];
        console.log(timers);
    }
    function getbird(): string {
        return birdnames[Math.floor(Math.random() * birdnames.length)];
    }
    function remove_timer(id: string): void {
        console.log("app", id);
        const index = timers.indexOf(id, 0);
        if (index > -1) {
            timers.splice(index, 1);
        }
        timers = [...timers];
        console.log(timers);
    }
    onMount(async () => {
        var res = await fetch("/names.txt");
        var text = await res.text();
        birdnames = [...text.split("\n")];
        if (timers.length <= 0) {
            add_new_timer();
        }
    });
</script>

<div class="container">
    <button class="add_btn" on:click={add_new_timer}>Add</button>
    <div class="grid">
        {#each timers as timer}
            <TimerContainer id={timer} name={getbird()} {remove_timer} />
        {/each}
    </div>
</div>

<style>
    .add_btn {
        font-size: large;
        padding: 5px;
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
        justify-content: center;
    }
    .grid {
        margin-top: 25px;
        display: flex;
        flex-wrap: wrap;
    }
</style>

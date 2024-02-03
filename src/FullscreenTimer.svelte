<script lang="ts">
    import type { TimerData } from "./timer";

    export var current_timer: TimerData | null;
</script>

<div class="fullscreen">
    <button
        class="btn"
        on:click={() => {
            current_timer = null;
        }}>close</button>
    <p>{current_timer?.name}</p>
</div>

<style>
    .fullscreen {
        position: fixed;
        z-index: 100;
        border-radius: 10px;
        width: calc(90% - 4em);
        min-height: calc(90vh - 4em);
        padding: 2em;
        background: linear-gradient(
            to bottom right,
            var(--primary),
            var(--accent-dark)
        );
        filter: drop-shadow(0 0 var(--dropshadow-size) var(--accent-dark));
    }
    .btn {
        min-width: 200px;
        border: none;
        border-radius: 5px;
        background: var(--accent-dark);
        padding: 7px;
    }
</style>

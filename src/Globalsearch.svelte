<script lang="ts">
    var links = [
        "euroskateshop.cz",
        "euroskateshop.at",
        "euroskateshop.de",
        "euroskateshop.ch",
        "euroskateshop.pt",
        "euroskateshop.es",
        "euroskateshop.fi",
        "euroskateshop.pl",
        "euroskateshop.it",
        "euroskateshop.uk",
        "euroskateshop.be",
        "euroskateshop.nl",
        "euroskateshop.fr",
        "euroskateshop.se",
        "kitedanmark.dk",
        "kitenorge.no",
        "usaskateshop.com",
    ];

    var form_search_word: string;
    var form_search_url: string;

    function onsubmit(e) {
        var search_url =
            "https://" +
            form_search_url +
            "/catalogsearch/result/?q=" +
            form_search_word;
        console.log(search_url);
        window.open(search_url, "_blank");
        e.preventDefault();
    }
</script>

<form on:submit={onsubmit}>
    <label style="margin-right: 10px; font-size: smaller;">Globalsearch</label>
    <input
        class="input"
        type="text"
        placeholder="common name"
        bind:value={form_search_word} />
    <select class="input" bind:value={form_search_url}>
        {#each links.sort() as link}
            <option value={link}>{link}</option>
        {/each}
    </select>
    <input class="input" type="submit" value="search" />
</form>

<style>
    form {
        margin-bottom: 1em;
    }
    select {
        width: 150px;
    }
    select > option {
        background-color: var(--accent-dark);
    }

    .input {
        padding: 5px;
        padding-left: 10px;
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
</style>

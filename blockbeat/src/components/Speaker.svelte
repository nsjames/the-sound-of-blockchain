<section class="speaker">
    {#each Array.from({ length: 6 }) as i}
        <div class="bar"></div>
    {/each}
</section>

<style lang="scss">

    .speaker {
        width: 100%;
        max-width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .bar {
            height: 10px;
            border-radius: 6px;
            border: 1px solid #616972;
            background: #171717;
        }
    }
</style>

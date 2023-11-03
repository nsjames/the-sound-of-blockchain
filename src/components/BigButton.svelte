<section on:click class="button" class:pressed>
    <slot></slot>
</section>

<script lang="ts">
    export let pressed: boolean = false;
</script>

<style lang="scss">
    .button {
        cursor: pointer;
        width: 100%;
        border-radius: 6px;
        background: linear-gradient(180deg, #40444A 0%, #2A2F34 100%);
        box-shadow: 0 1px 1px 1px #5C6268 inset;
        display: flex;
        align-content: center;
        justify-content: center;
        padding: 20px 40px;

        color: #D3D3D3;

        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        :global(svg) {
            fill:#1E2022;
            filter: drop-shadow(0px 2px 0px rgb(255 255 255 / 0.3));
        }

        &.pressed {
            border-radius: 6px;
            background: linear-gradient(180deg, #3E4349 0%, #282D32 100%);
            box-shadow: 0px 6px 7px 3px #2A2E33 inset;

            :global(svg) {
                fill: #f3f3f3;
            }
        }
    }
</style>

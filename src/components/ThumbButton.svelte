<section on:click class="thumb-button" class:pressed>
    <figure class="highlight"></figure>
    <figure class="icon">
        <slot></slot>
    </figure>
</section>

<script lang="ts">
    export let pressed:boolean = false;
</script>

<style lang="scss">
    .thumb-button {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        background: #393D43;
        box-shadow: -1px 1px 1px 0px #565D66, 1px -1px 1px 0px #313336;
        display: flex;
        align-content: center;
        justify-content: center;
        cursor: pointer;

        .icon {
            z-index: 1;
            display: flex;
            align-content: center;
            justify-content: center;
            flex-wrap: wrap;
            padding-left: 1px;
            padding-bottom: 1px;

            :global(svg){
                stroke: #79828E;
            }

        }

        &.pressed {
            .highlight {
                position: absolute;
                margin-left: 2px;
                margin-top: 1px;
                width: 33px;
                height: 33px;
                border-radius: 6px;
                background: #48586A;
                z-index: 0;
            }

            .icon {
                :global(svg){
                    stroke: #B7C6DB;
                }
            }
        }
    }
</style>

<section class="volume">
    <section bind:this={barElement} class="bar">
        <section class="lines">
            {#each Array.from(Array(10).keys()) as i}
                <section class="line left"></section>
                <section class="line right"></section>
            {/each}
        </section>
        <section class="thumb" style="top: {thumbY}px;"
                 on:mousedown={startDrag}
                 on:mouseup={stopDrag}
                 on:mousemove={drag}>

        </section>
    </section>
</section>

<script lang="ts">
    import {volume} from "../stores/store";

    let barElement;
    const THUMB_POS_MIN = 5; // %
    let THUMB_POS_MAX;

    let holding = false;
    let startY = 0;
    let thumbY = 5;

    function startDrag(e: MouseEvent) {
        holding = true;
        startY = e.clientY;
        THUMB_POS_MAX = barElement.clientHeight - 50;
    }

    function stopDrag() {
        holding = false;
    }

    function drag(e: MouseEvent) {
        if (holding) {
            let diff = startY - e.clientY;
            const newPost = thumbY - diff;
            thumbY = Math.max(THUMB_POS_MIN, Math.min(THUMB_POS_MAX, newPost));
            startY = e.clientY;

            let newVolume = (100 - Math.round((thumbY / THUMB_POS_MAX) * 100)) / 100 * 0.1;
            console.log(newVolume);
            volume.set(newVolume);
        }
    }





</script>

<style lang="scss">
    .volume {
        width: 50px;

        .bar {
            position: relative;
            height: 160px;
            width: 20px;
            border-radius: 4px;
            border: 1px solid #575D64;
            background: #202224;
            box-shadow: 0px 0px 8px 4px #020202 inset;

            .lines {
                position: relative;
                margin-top:5px;

                .line {
                    width: 10px;
                    height: 2px;
                    background: #8E8E8E;

                    &.left {
                        margin-left: -10px;
                    }

                    &.right {
                        margin-left: 18px;
                        margin-top:-2px;
                    }

                    /* for every child, add 2px to the top */
                    & + .line {
                        &.left {
                            margin-top: 13px;
                        }
                    }
                }
            }

            .thumb {
                position: absolute;
                top: calc(20% - 25px); // 20% min / 90% max
                cursor: pointer;
                margin-left:-15px;
                width: 50px;
                height: 28px;
                border-radius: 6px;
                background: linear-gradient(180deg, #40444A 0%, #2A2F34 100%);
                box-shadow: 0px 1px 1px 1px #5C6268 inset, 0 7px 0 #1D2023;
            }
        }
    }
</style>

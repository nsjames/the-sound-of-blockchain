<section bind:this={graphElem} class="graph">
    <canvas bind:this={canvar} width="100%" height="100%"></canvas>
    <canvas bind:this={canvarBlur} width="100%" height="100%"></canvas>
</section>

<script lang="ts">
    import { Oscilloscope } from "@teropa/oscilloscope";
    import {onMount} from "svelte";
    import {audioContext, audioOscillator, playing} from "../stores/store";

    let graphElem;
    let canvar;
    let canvarBlur;
    let oscilloscope;

    onMount(() => {
        canvar.width = graphElem.offsetWidth;
        canvar.height = graphElem.offsetHeight - 20;
        canvarBlur.width = graphElem.offsetWidth;
        canvarBlur.height = graphElem.offsetHeight - 20;
        canvarBlur.style.webkitFilter = "blur(10px)";
    });

    const bindToCanvas = (_canvas) => {
        oscilloscope = new Oscilloscope(_canvas, $audioContext, {
            fftSize: 4096,
            backgroundColor: 'rgba(0,0,0,0)',
            lineColor: '#2E47BD',
            lineWidth: 2,
        });
        oscilloscope.connect($audioOscillator);
        oscilloscope.start();
    }

    audioOscillator.subscribe(_oscy => {
        if(_oscy){
            bindToCanvas(canvar);
            bindToCanvas(canvarBlur);
        } else {
            if(oscilloscope) {
                oscilloscope.stop();
            }
        }
    })
</script>

<style lang="scss">
    .graph {
        width: 100%;
        height: 190px;
        border-radius: 6px;
        background: linear-gradient(180deg, #0B1029 0%, #121C4E 100%);
        position: relative;
        
        canvas {
            position:absolute;
            top:10px; bottom:0; left:0; right:0;
        }
    }
</style>

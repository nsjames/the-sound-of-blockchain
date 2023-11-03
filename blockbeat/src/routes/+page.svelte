{#if $playing}
    <Player />
{/if}


<section class="blockbeat">
    <section class="plugin">
        <section class="top-bar">
            <Speaker />
            <section class="texts">
                <figure>{$selectedBlockchain.name.toUpperCase()}</figure>
                <figure><b>{$transactions.length}</b> txs per second</figure>
                <figure>{$currentTransaction}</figure>
            </section>
            <Speaker />
        </section>

        <section class="main-section">

            <section class="graph-container">
                <section class="gray-container">
                    <WaveVisualizer />
                </section>
            </section>

            <section class="mt-2 gray-container button-grid">
                {#each Object.keys(BLOCKCHAINS) as blockchain}
                    <Button on:click={() => selectBlockchain(blockchain)} pressed={$selectedBlockchain.name === blockchain}>{blockchain.toUpperCase()}</Button>
                {/each}
            </section>

            <section class="flex p-2 px-4">
                <Volume on:volume={onVolumeChange} />
                <section class="flex flex-col gap-1.5">
                    <ThumbButton pressed={$selectedWaveType === WAVES.SQUARE} on:click={() => selectWaveType(WAVES.SQUARE)}>
                        <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.0002 17.2H17.5282V1.59998H5.6722V17.2H0.200195" stroke-width="2"/>
                        </svg>
                    </ThumbButton>
                    <ThumbButton pressed={$selectedWaveType === WAVES.TRIANGLE} on:click={() => selectWaveType(WAVES.TRIANGLE)}>
                        <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.3999 16.2L12.0566 1.79999L21.7999 16.2" stroke-width="2"/>
                        </svg>
                    </ThumbButton>
                    <ThumbButton pressed={$selectedWaveType === WAVES.SINE} on:click={() => selectWaveType(WAVES.SINE)}>
                        <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.3999 16.2C2.0999 11.4 5.1199 1.79999 11.5999 1.79999C18.0799 1.79999 21.0999 11.4 21.7999 16.2" stroke-width="2"/>
                        </svg>
                    </ThumbButton>
                    <ThumbButton pressed={$selectedWaveType === WAVES.SAWTOOTH} on:click={() => selectWaveType(WAVES.SAWTOOTH)}>
                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 17.2L22.6 2.79999V17.2" stroke-width="2"/>
                        </svg>
                    </ThumbButton>
                </section>
                <section class="play-controls">
                    <section class="mt-2 gray-container flex gap-1">
                        <BigButton pressed={$playing} on:click={play}>
                            <svg width="37" height="43" viewBox="0 0 37 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.24551 0.513916L2.64599 0.538024L3.04169 0.706779L35.4528 20.1402C36.4584 20.7433 36.4584 22.2094 35.4528 22.8125L3.04169 42.2448C2.01298 42.862 0.708984 42.115 0.708984 40.9093V2.04252C0.752064 1.35062 1.14576 0.727041 1.85175 0.539835L2.24551 0.513916Z" />
                            </svg>
                        </BigButton>
                        <BigButton on:click={stop}>
                            <svg width="36" height="43" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M33.0583 0.741028C34.3666 0.741028 35.4424 1.81682 35.4424 3.12515V33.3171C35.4424 34.6254 34.3666 35.7012 33.0583 35.7012H2.86635C1.55802 35.7012 0.482224 34.6254 0.482224 33.3171V3.12515C0.482224 1.81682 1.55802 0.741028 2.86635 0.741028H33.0583Z"/>
                            </svg>
                        </BigButton>
                    </section>
                </section>
            </section>

        </section>
    </section>
</section>

<script lang="ts">
    import Speaker from "../components/Speaker.svelte";
    import Button from "../components/Button.svelte";
    import Volume from "../components/Volume.svelte";
    import ThumbButton from "../components/ThumbButton.svelte";
    import BigButton from "../components/BigButton.svelte";
    import {transactions, currentTransaction, selectedBlockchain, playing, selectedWaveType} from "../stores/store";
    import {BLOCKCHAINS} from "../data/blockchains";
    import Player from "../components/Player.svelte";
    import WaveVisualizer from "../components/WaveVisualizer.svelte";

    const onVolumeChange = ({detail: volume}) => {
        console.log(volume)
    }

    const WAVES = {
        SQUARE: 'square',
        SAWTOOTH: 'sawtooth',
        TRIANGLE: 'triangle',
        SINE: 'sine',
    }

    selectedWaveType.set(WAVES.SQUARE);

    const selectWaveType = (waveType:string) => {
        selectedWaveType.set(waveType);
    }

    const play = () => {
        playing.set(true);
    }

    const stop = () => {
        playing.set(false);
    }



    selectedBlockchain.set(BLOCKCHAINS.eos);
    let pressed = 'eos';

    const selectBlockchain = (blockchain:string) => {
        let wasPlaying = $playing;
        playing.set(false);

        setTimeout(() => {
            console.log('hi')
            selectedBlockchain.set(BLOCKCHAINS[blockchain]);
            if (wasPlaying) {
                playing.set(true);
            }
        }, 1);
    }

</script>


<style lang="scss">
    .blockbeat {
        width: 100vw;
        height: 100vh;
        background: #212129;
        display: flex;
        align-content: center;
        justify-content: center;
        padding: 50px 20px;
    }

    .plugin {
        max-width: 800px;
        width: 100%;
        border-radius: 6px;
        background: #42474D;

        .top-bar {
            width: 800px;
            border-radius: 6px;
            background: linear-gradient(180deg, #596169 0%, #454B52 100%);
            box-shadow: 0px 15px 21px 0px rgba(0, 0, 0, 0.49);
            padding: 20px;

            display: flex;

            :global(.speaker) {
                flex: 0 auto;
            }

            .texts {
                flex: 1;
                text-align: center;

                figure {
                    color:white;
                    &:nth-child(1) {
                        font-size: 48px;
                        line-height: 52px;
                        margin-bottom: 6px;
                        font-weight: 700;
                    }
                    &:nth-child(2) {
                        font-size: 18px;
                        line-height: 22px;
                        margin-bottom: 6px;
                    }
                    &:nth-child(3) {
                        font-size: 9px;
                        line-height: 11px;
                        opacity: 0.5;
                    }
                }
            }
        }

        .main-section {
            padding: 20px;

            .graph-container {


            }

            .button-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-gap: 3px;
            }

            .play-controls {
                flex: 1;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
            }
        }
    }
</style>

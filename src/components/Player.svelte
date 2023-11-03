<section>

</section>

<script lang="ts">
    import {BLOCKCHAINS} from "../data/blockchains";
    import {
        transactions,
        volume,
        selectedWaveType,
        selectedBlockchain,
        currentTransaction,
        playing, audioContext, audioOscillator
    } from "../stores/store";
    import {onDestroy, onMount} from "svelte";


    let context;
    let oscillator;
    let gain;
    let fetchInterval = $selectedBlockchain.fetchInterval;

    selectedWaveType.subscribe(x => {
        if(oscillator) {
            oscillator.type = x;
        }
    });

    const sha256 = async (message) => {
        const msgBuffer = new TextEncoder('utf-8').encode(message);                     // encode as UTF-8
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);             // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer));                       // convert ArrayBuffer to Array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');   // convert bytes to hex string
        return hashHex;
    }


    let lastKnownBlock = 0;
    const getTransactionHashes = async () => {
        if($selectedBlockchain.name === BLOCKCHAINS.eos.name) {
            const block_num = await fetch('https://eos.newdex.one/v1/chain/get_info').then(x => x.json()).then(x => x.fork_db_head_block_num);
            const block = await fetch(`https://eos.greymass.com/v1/chain/get_block`, {
                method: 'POST',
                body: JSON.stringify({
                    block_num_or_id: block_num
                })
            }).then(x => x.json());
            return block.transactions.map(x => x.trx.id);
        }

        if($selectedBlockchain.name === BLOCKCHAINS.wax.name) {
            const block_num = await fetch('https://wax.api.eosnation.io/v1/chain/get_info').then(x => x.json()).then(x => x.fork_db_head_block_num);
            const block = await fetch(`https://wax.api.eosnation.io/v1/chain/get_block`, {
                method: 'POST',
                body: JSON.stringify({
                    block_num_or_id: block_num
                })
            }).then(x => x.json());
            return block.transactions.map(x => x.trx.id);
        }

        if($selectedBlockchain.name === BLOCKCHAINS.sol.name){
            // https://mainnet.infura.io/v3/e4c182dc9c3541c2a80951f0aeb4df29

            const block = await fetch(`https://rpc.ankr.com/solana_devnet`, {
                method: 'POST',
                body: JSON.stringify({
                    "jsonrpc": "2.0","id":1,
                    "method":"getBlock",
                    "params": [
                        lastKnownBlock++,
                    ]
                })
            }).then(x => x.json());

            if(block.error) {
                if(block.error.message.includes(':')) {
                    lastKnownBlock = block.error.message.split(":")[1].trim();
                } else {
                    console.log('block.error', block.error);
                    lastKnownBlock = 0;
                }
                return getTransactionHashes();
            }

            return await Promise.all(block.result.transactions.map(async tx => {
                return await sha256(JSON.stringify(tx));
            }));
        }

        let rpc = $selectedBlockchain.rpc;
        console.log('using RPC', rpc);

        const block = await fetch(rpc, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_getBlockByNumber",
                params: ["latest", false],
                id: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(x => x.json());
        console.log('block', block);
        return block.result.transactions;

    }


    let fetcher:any = null;
    const fetchTransactions = async () => {
        clearTimeout(fetcher);
        if(stopped) return;


        fetcher = setTimeout(async () => {
            transactions.set(await getTransactionHashes());
            playTransactions();
            fetchTransactions();
        }, fetchInterval);
    }

    let stopped = false;

    const playTransactions = async () => {
        const waitTime = (fetchInterval*2)/$transactions.length;
        for(let id of $transactions) {
            if(stopped) break;

            currentTransaction.set(id);
            const hash = await sha256(id);
            let hashNum = parseInt(Number('0x'+hash).toString());
            const freq = hashNum*$selectedBlockchain.MOD;
            // console.log(freq);
            oscillator.frequency.value = freq;



            gain.gain.value = $volume;

            await new Promise(r => setTimeout(r, waitTime))
        }
    }

    onDestroy(() => {
        stopped = true;
        console.log('unloaded')
        clearTimeout(fetcher);

        oscillator.stop();
        oscillator.disconnect();
        gain.disconnect();
        context.close();
    });

    onMount(() => {
        console.log('mounted')
        context = new AudioContext();
        oscillator = context.createOscillator();
        gain = context.createGain();
        oscillator.type = $selectedWaveType;
        oscillator.connect(gain);
        gain.connect(context.destination);
        gain.gain.value = $volume;
        oscillator.start()

        audioContext.set(context);
        audioOscillator.set(oscillator);

        fetchTransactions();
    })

</script>

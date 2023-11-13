export const BLOCKCHAINS = {
    'eos': {
        name: 'eos',
        fetchInterval: 500,
    },
    'eth': {
        name: 'eth',
        fetchInterval: 15000,
        rpc:'https://mainnet.infura.io/v3/e4c182dc9c3541c2a80951f0aeb4df29',
    },
    'sol': {
        name: 'sol',
        fetchInterval: 400,
    },
    'bnb': {
        name: 'bnb',
        fetchInterval: 3000,
        rpc:'https://bsc-dataseed.bnbchain.org',
    },
    'polygon': {
        name: 'polygon',
        fetchInterval: 2200,
        rpc:'https://polygon-rpc.com',
    },
    'tron': {
        name: 'tron',
        fetchInterval: 3000,
        rpc:'https://api.trongrid.io/jsonrpc',
    },
    'avalanche': {
        name: 'avalanche',
        fetchInterval: 1000,
        rpc:'https://api.avax.network/ext/bc/C/rpc',
    },
    'fantom': {
        name: 'fantom',
        fetchInterval: 2500,
        rpc:'https://rpc.ankr.com/fantom/',
    },
    'arbitrum': {
        name: 'arbitrum',
        fetchInterval: 250,
        rpc:'https://arb1.arbitrum.io/rpc',
    },
    'wax': {
        name: 'wax',
        fetchInterval: 500,
    },
}

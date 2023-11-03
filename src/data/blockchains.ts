export const BLOCKCHAINS = {
    'eos': {
        name: 'eos',
        fetchInterval: 500,
        MOD: 60,
    },
    'eth': {
        name: 'eth',
        fetchInterval: 15000,
        MOD: 100,
        rpc:'https://mainnet.infura.io/v3/e4c182dc9c3541c2a80951f0aeb4df29',
    },
    'sol': {
        name: 'sol',
        fetchInterval: 400,
        MOD: 60,
    },
    'bnb': {
        name: 'bnb',
        fetchInterval: 3000,
        MOD: 60,
        rpc:'https://bsc-dataseed.bnbchain.org',
    },
    'polygon': {
        name: 'polygon',
        fetchInterval: 2200,
        MOD: 60,
        rpc:'https://polygon-rpc.com',
    },
    'tron': {
        name: 'tron',
        fetchInterval: 3000,
        MOD: 60,
        rpc:'https://api.trongrid.io/jsonrpc',
    },
    'avalanche': {
        name: 'avalanche',
        fetchInterval: 3000,
        MOD: 60,
        rpc:'https://avalanche.drpc.org/',
    },
    'fantom': {
        name: 'fantom',
        fetchInterval: 2500,
        MOD: 60,
        rpc:'https://rpc.ankr.com/fantom/',
    },
    'arbitrum': {
        name: 'arbitrum',
        fetchInterval: 12000,
        MOD: 60,
        rpc:'https://arb1.arbitrum.io/rpc',
    },
    'wax': {
        name: 'wax',
        fetchInterval: 500,
        MOD: 60,
    },
}

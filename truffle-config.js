require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider')
mnemonic = "barrel print sniff hammer vivid parrot into adjust large disagree atom animal"


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    live: {
      provider: () => {
          return new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/cdc987ef7f6f46c99606585cc061b6af")// Url to an Ethereum Node
      },

      gas: 5000000,
      gasPrice: 25000000000,
      network_id: '42'
    },

  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

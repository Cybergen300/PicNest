require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider')
mnemonic = ""


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    live: {
      provider: () => {
          return new HDWalletProvider(mnemonic, "")// Url to an Ethereum Node
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

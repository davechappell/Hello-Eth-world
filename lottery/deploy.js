const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const path = require('path');
const fs = require('fs');

const secretsPath = path.resolve(__dirname, '../../secrets', 'MetaMask Seed Words.csv');

const secretWords = fs.readFileSync(secretsPath, 'utf8');

const provider = new HDWalletProvider(
  secretWords,
  'https://rinkeby.infura.io/jg4KYzy0gfpeaKozuU2T'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0] );

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Say hello to your mother!']})
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to ', result.options.address);
};

deploy();
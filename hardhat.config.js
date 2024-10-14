/** @type import('hardhat/config').HardhatUserConfig */




require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "PxjjF7O054vr9caqKo5Z76N-wbu6Zqz0";
const ROPSTEN_PRIVATE_KEY = "b188b20ea8abe367efb56e37c1b7ba0f9af659f4ff41cd611705f6ac3bfcb505";

module.exports = {
  solidity: "0.8.18",

  networks: {
    ropsten:  {
      url : `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts : [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
}
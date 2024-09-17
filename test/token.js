// import { expect } from 'chai';


// describe("Token contract", function () {

//     it("Deployment should assign the total supply of tokens to the owner", async function () {
//         const [owner] = await ethers.getSigners();

//         console.log("Signers Object: ", owner);
//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy();

//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         console.log("Owner Address: ", owner.address);

//         // Compare owner's balance with total supply
//         expect(ownerBalance.toString()).to.equal((await hardhatToken.totalSupply()).toString());
//     });

//     it("Should transfer tokens between accounts", async function () {
//         const [owner, address1, address2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token"); // Instantiate contract
//         const hardhatToken = await Token.deploy();

//         // Transfer 10 tokens from owner to address1
//         await hardhatToken.transfer(address1.address, 10);
//         expect((await hardhatToken.balanceOf(address1.address)).toNumber()).to.equal(10);

//         // Transfer 5 tokens from address1 to address2
//         await hardhatToken.connect(address1).transfer(address2.address, 5);
//         expect((await hardhatToken.balanceOf(address2.address)).toNumber()).to.equal(5);

//         // Check if address1 balance is reduced by 5 (it had 10, sent 5 to address2)
//         expect((await hardhatToken.balanceOf(address1.address)).toNumber()).to.equal(5);
//     });
// });

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Token Contract", function () {
    let Token;
    let hardhatToken;
    let owner, address1, address2, addresses;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, address1, address2, ...addresses] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });

    describe("Deployment", function () {
        it("should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            const totalSupply = await hardhatToken.totalSupply();

            expect(totalSupply.toString()).to.equal(ownerBalance.toString());
        });
    });

    describe("Transactions", function () {
        it("should transfer tokens between accounts", async function () {
            // Transfer 5 tokens from owner to address1
            await hardhatToken.transfer(address1.address, 5);
            const address1Balance = await hardhatToken.balanceOf(address1.address);
            
            expect(address1Balance.toString()).to.equal('5');

            // Transfer 5 tokens from address1 to address2
            await hardhatToken.connect(address1).transfer(address2.address, 5);
            const address2Balance = await hardhatToken.balanceOf(address2.address);
            
            expect(address2Balance.toString()).to.equal('5');
        });

        it("should fail if sender does not have enough tokens", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(address1).transfer(owner.address, 1))
                .to.be.revertedWith("Insufficient balance");
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balance after transfer", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(address1.address, 5);
            await hardhatToken.transfer(address2.address, 10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance.toString()).to.equal((initialOwnerBalance - 15).toString());

            const address1Balance = await hardhatToken.balanceOf(address1.address);
            expect(address1Balance.toString()).to.equal('5');
            const address2Balance = await hardhatToken.balanceOf(address2.address);
            expect(address2Balance.toString()).to.equal('10');
        });
    });
});

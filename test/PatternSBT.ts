import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PatternSBT", function () {
  async function deployPatternSBTFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const PatternSBT = await ethers.getContractFactory("PatternSBT");
    const patternSBT = await PatternSBT.deploy();
    return { patternSBT, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { patternSBT, owner } = await loadFixture(deployPatternSBTFixture);
      expect(await patternSBT.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    it("Should mint a token", async function () {
      const { patternSBT, owner } = await loadFixture(deployPatternSBTFixture);
      await patternSBT.mintLitSBT("Ronald", "https://abc", "secret_desc", "secret_key");

      expect(await patternSBT.balanceOf(owner.address)).to.equal(1);

      await patternSBT.fetchNfts().then((nfts) => {
        expect(JSON.stringify(nfts[0])).to.equal('["Ronald","https://abc","secret_desc","secret_key"]');
      });
    });
  });

  describe("Transfer", function () {
    it("Should NOT transfer a token", async function () {
      const { patternSBT, owner, otherAccount } = await loadFixture(deployPatternSBTFixture);
      await patternSBT.mintLitSBT("Ronald", "https://abc", "secret_desc", "secret_key");

      await expect(patternSBT.transferFrom(owner.address, otherAccount.address, 1)).to.be.revertedWith("This a Soulbound token. It cannot be transferred. It can only be burned by the token owner.");
    });
  });

  describe("Burn", function () {
    it("Should burn a token", async function () {
      const { patternSBT, owner } = await loadFixture(deployPatternSBTFixture);
      await patternSBT.mintLitSBT("Ronald", "https://abc", "secret_desc", "secret_key");
      await patternSBT.burn(1);
      expect(await patternSBT.balanceOf(owner.address)).to.equal(0);
    });
  });
});

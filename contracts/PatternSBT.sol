// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract PatternSBT is ERC721URIStorage, ERC721Burnable, ReentrancyGuard, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("PatternSBT", "DATA") {}

    mapping(uint256 => nft) private tokenIdToNft;

    struct nft {
        string name;
        string imageUrl;
        string encryptedDescription;
        string encryptedSymmetricKey;
    }    

    function getTokenURI(string memory name, string memory imageUrl, string memory encryptedDescription, string memory encryptedSymmetricKey) private pure returns (string memory) {
        bytes memory dataURI = abi.encodePacked("{", '"name": "', name, '",', '"image": "', imageUrl, '",', '"description": "', encryptedDescription, '",', '"symmetricKey": "', encryptedSymmetricKey, '"', "}");
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(dataURI)));
    }

    function mintLitSBT(string memory name, string memory imageUrl, string memory encryptedDescription, string memory encryptedSymmetricKey) public nonReentrant {
        _tokenIds.increment();
        uint256 newNftTokenId = _tokenIds.current();
        _safeMint(msg.sender, newNftTokenId);
        _setTokenURI(newNftTokenId, getTokenURI(name, imageUrl, encryptedDescription, encryptedSymmetricKey));
        tokenIdToNft[newNftTokenId] = nft(name, imageUrl, encryptedDescription, encryptedSymmetricKey);
    }

    // Fetch all the NFTs to display
    function fetchNfts() public view returns (nft[] memory) {
        nft[] memory nfts = new nft[](_tokenIds.current());
        for (uint256 idx = 1; idx < _tokenIds.current() + 1; idx++) {
            nft memory currNft = tokenIdToNft[idx];
            nfts[idx - 1] = currNft;
        }

        return nfts;
    }

  function _beforeTokenTransfer(
        address from,
        address to,
        uint256 /*tokenId*/,
        uint256 /*batchSize*/
    ) internal pure override(ERC721) {
        require(
            from == address(0) || to == address(0),
            "This a Soulbound token. It cannot be transferred. It can only be burned by the token owner."
        );        
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {        
        // delete ownerToTokenIds[msg.sender][tokenId];
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

}

import MerkleTree from "merkletreejs"

const keccak256 = require("keccak256")

export const makeMerkleTree = (arr = []) => {
  const leafNodes = arr.map((e) => keccak256(e))
  const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true
  })
  return merkleTree
}
const DogToken = artifacts.require('DogToken')
const CatToken = artifacts.require('CatToken')

module.exports = function (_deployer) {
  _deployer.deploy(DogToken)
  _deployer.deploy(CatToken)
}

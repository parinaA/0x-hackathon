import React from 'react';
import axios from 'axios';
import { HttpClient } from '@0x/connect';
import {
  assetDataUtils,
  BigNumber,
  ContractWrappers,
  generatePseudoRandomSalt,
  Order,
  orderHashUtils,
  signatureUtils,
} from '0x.js';
import Web3 from 'web3';
import { MetamaskSubprovider } from '@0x/subproviders';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { RINKEBY_CONFIGS, TX_DEFAULTS } from '../configs';
import { DECIMALS, NULL_ADDRESS, ZERO } from '../constants';
import { contractAddresses } from '../contracts';
import { getRandomFutureDateInSeconds } from '../utils';




export default class connectApp extends React.Component {


  async signfunc(providerEngine, orderHashHex, maker) {
    return await signatureUtils.ecSignHashAsync(new MetamaskSubprovider(providerEngine), orderHashHex, maker)

  }
  componentDidMount() {

    const providerEngine = Web3.givenProvider;
    const contractWrappers = new ContractWrappers(providerEngine, { networkId: RINKEBY_CONFIGS.networkId });
    const web3Wrapper = new Web3Wrapper(providerEngine);
    const maker = web3.eth.accounts.toString();
    const taker = '0x018883Ae1b7C8f17B8864b9DAca92A227A6CEc20';
    const zrxTokenAddress = contractAddresses.zrxToken;
    const etherTokenAddress = contractAddresses.etherToken;
    // console.log(zrxTokenAddress);
    // console.log(etherTokenAddress);
    const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(5), DECIMALS);
    const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.1), DECIMALS);
    const makerAssetData = assetDataUtils.encodeERC20AssetData(zrxTokenAddress);
    const takerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress);
    let txHash;
    let txReceipt;

    // Allow the 0x ERC20 Proxy to move ZRX on behalf of makerAccount
    contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(zrxTokenAddress, maker)
      .then(makerZRXApprovalTxHash => {
        console.log(makerZRXApprovalTxHash);


        const randomExpiration = getRandomFutureDateInSeconds();
        const exchangeAddress = contractAddresses.exchange;
        const feeRecipientAddress = "0xb046140686d052fff581f63f8136cce132e857da";
        // Create the order
        const order = {
          exchangeAddress,
          makerAddress: maker,
          takerAddress: NULL_ADDRESS,
          senderAddress: NULL_ADDRESS,
          feeRecipientAddress,
          expirationTimeSeconds: randomExpiration,
          salt: generatePseudoRandomSalt(),
          makerAssetAmount,
          takerAssetAmount,
          makerAssetData,
          takerAssetData,
          makerFee: ZERO,
          takerFee: ZERO,
        };



        const orderHashHex = orderHashUtils.getOrderHashHex(order);
        // web3.eth.sign(maker, orderHashHex, (err, signature) => {
        // const sign = this.signfunc (providerEngine,orderHashHex,maker);
        signatureUtils.ecSignHashAsync(new MetamaskSubprovider(providerEngine), orderHashHex, maker)
          .then(sign => {
            console.log("signature callback", sign);
            order.signature = sign;
            console.log(order);
            axios.post('http://localhost:3000/v2/order', order).then(result => {
                  console.log("result from post request ", result);
                })
                  .catch(err => {
                    console.log("err", err);
                  })           
            contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(order, takerAssetAmount, taker)
              .then(() => {
                console.log("order validated");
                axios.post('http://localhost:3000/v2/order', order).then(result => {
                  console.log("result from post request ", result);
                })
                  .catch(err => {
                    console.log("err", err);
                  })
                // contractWrappers.exchange.fillOrderAsync(signedOrder, takerAssetAmount, taker, {
                //   gasLimit: TX_DEFAULTS.gas,
                // }).then(txhash => {
                //   console.log("tx hash");
                //   console.log(txhash);
                // })
                //   .catch(err => {
                //     console.log("error in exchange");
                //   })
              })

          })

      })
      .catch(err => {
        console.log("contract wrapper .erc20");
        console.log(err);
      });
    //0x0b9b1c0ffe7d4613c8564570a957d8b912d7a0ef9c67575d7bed640b5f2aa688      
  }

  render() {
    return (
      <div>

        <form>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }

}



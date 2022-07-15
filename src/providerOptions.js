import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "https://mainnet.infura.io/v3/0f159be7aada4d6894c662d7694672c6" // required
    }
  }
};

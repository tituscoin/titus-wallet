<img src="https://avatars1.githubusercontent.com/u/23140191?s=200&v=4" alt="Copay" width="79">

# Titus Wallet

Titus Wallet is a secure titus coin wallet platform for both desktop and mobile devices. Titus Wallet uses Tituscore Wallet Service (TWS) for peer synchronization and network interfacing.

## Main Features

- Multiple wallet creation and management in-app
- Intuitive, multisignature security for personal or shared wallets
- Easy spending proposal flow for shared wallets and group payments
- [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) Hierarchical deterministic (HD) address generation and wallet backups
- Device-based security: all private keys are stored locally, not in the cloud
- Support for Titus Coin testnet wallets
- Synchronous access across all major mobile and desktop platforms
- Payment protocol (BIP70-BIP73) support: easily-identifiable payment requests and verifiable, secure titus coin payments
- Support for over 150 currency pricing options and unit denomination in TTS or bits
- Mnemonic (BIP39) support for wallet backups
- Paper wallet sweep support (BIP38)
- Email notifications for payments and transfers
- Push notifications (only available for ios and android versions)
- Customizable wallet naming and background colors
- Multiple languages supported

## Testing in a Browser

> **Note:** This method should only be used for development purposes. When running Titus Wallet in a normal browser environment, browser extensions and other malicious code might have access to internal data and private keys. For production use, see the latest official releases.

Clone the repo and open the directory:

```sh
git clone https://github.com/tituscoin/titus-wallet.git
cd titus-wallet
```

Ensure you have [Node](https://nodejs.org/) installed, then install and start Copay:

```sh
npm install
npm run apply:copay
npm run start
```

Visit [`localhost:8100`](http://localhost:8100/) to view the app.

## Unit & E2E Tests (Karma & Protractor)

To run the tests, run:

```
 npm run test
```

## Testing on Real Devices

It's recommended that all final testing be done on a real device – both to assess performance and to enable features that are unavailable to the emulator (e.g. a device camera).

### Android

Follow the [Cordova Android Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/) to set up your development environment.

When your developement enviroment is ready, run the `start:android` package script.

```sh
npm run apply:copay
npm run prepare:copay
npm run start:android
```

### iOS

Follow the [Cordova iOS Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/) to set up your development environment.

When your developement enviroment is ready, run the `start:ios` package script.

```sh
npm run apply:copay
npm run prepare:copay
npm run start:ios
```

### Desktop (Linux, macOS, and Windows)

The desktop version of Copay currently uses NW.js, an app runtime based on Chromium. To get started, first install NW.js on your system from [the NW.js website](https://nwjs.io/).

When NW.js is installed, run the `start:desktop` package script.

```sh
npm run apply:copay
npm run start:desktop
```

## Build Titus Wallet App Bundles

Before building the release version for a platform, run the `clean-all` command to delete any untracked files in your current working directory. (Be sure to stash any uncommited changes you've made.) This guarantees consistency across builds for the current state of this repository.

The `final` commands build the production version of the app, and bundle it with the release version of the platform being built.

### Android

```sh
npm run clean-all
npm run apply:copay
npm run prepare:copay
npm run final:android
```

### iOS

```sh
npm run clean-all
npm run apply:copay
npm run prepare:copay
npm run final:ios
```

### Desktop (Linux, macOS, and Windows)

```sh
npm run clean-all
npm run apply:copay
npm run final:desktop
```

## Configuration

### Enable External Services

To enable external services, set the `COPAY_EXTERNAL_SERVICES_CONFIG_LOCATION` or `BITPAY_EXTERNAL_SERVICES_CONFIG_LOCATION` environment variable to the location of your configuration before running the `apply` task.

```sh
COPAY_EXTERNAL_SERVICES_CONFIG_LOCATION="~/.copay/externalServices.json" npm run apply:copay
# or
BITPAY_EXTERNAL_SERVICES_CONFIG_LOCATION="~/.bitpay/externalServices.json" npm run apply:bitpay
```

## About

### General

Titus Wallet implements a multisig wallet. It supports multiple wallets, each with its own configuration, such as 3-of-5 (3 required signatures from 5 participant peers) or 2-of-3. To create a multisig wallet shared between multiple participants, Titus Wallet requires the extended public keys of all the wallet participants. Those public keys are then incorporated into the wallet configuration and combined to generate a payment address where funds can be sent into the wallet. Conversely, each participant manages their own private key and that private key is never transmitted anywhere.

To unlock a payment and spend the wallet's funds, a quorum of participant signatures must be collected and assembled in the transaction. The funds cannot be spent without at least the minimum number of signatures required by the wallet configuration (2-of-3, 3-of-5, 6-of-6, etc.). Once a transaction proposal is created, the proposal is distributed among the wallet participants for each to sign the transaction locally. Finally, when the transaction is signed, the last signing participant will broadcast the transaction to the Titus Coin network.

Titus Wallet also implements [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) to generate new addresses for peers. The public key that each participant contributes to the wallet is a BIP32 extended public key. As additional public keys are needed for wallet operations (to produce new addresses to receive payments into the wallet, for example) new public keys can be derived from the participants' original extended public keys. Once again, it's important to stress that each participant keeps their own private keys locally - private keys are not shared - and are used to sign transaction proposals to make payments from the shared wallet.

For more information regarding how addresses are generated using this procedure, see: [Structure for Deterministic P2SH Multisignature Wallets](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki).

## Titus Wallet Backups and Recovery

Titus Wallet uses BIP39 mnemonics for backing up wallets. The BIP44 standard is used for wallet address derivation. Multisig wallets use P2SH addresses, while non-multisig wallets use P2PKH.

## Wallet Export Format

Titus Wallet encrypts the backup with the [Stanford JS Crypto Library](http://bitwiseshiftleft.github.io/sjcl/). To extract the private key of your wallet you can go to settings, choose your wallet, click in "more options", then "wallet information", scroll to the bottom and click in "Extended Private Key". That information is enough to sign any transaction from your wallet, so be careful when handling it!

The backup also contains the key `publicKeyRing` that holds the extended public keys of the co-payers.
Depending on the key `derivationStrategy`, addresses are derived using [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) or [BIP45](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki).

| Wallet Type               | Derivation Strategy | Address Type |
| ------------------------- | ------------------- | ------------ |
| Non-multisig              | BIP44               | P2PKH        |
| Multisig                  | BIP44               | P2SH         |
| Multisig Hardware wallets | BIP44 (root m/48’)  | P2SH         |

## Tituscore Wallet Service

Titus Wallet depends on Tituscore Wallet Service (TWS) for blockchain information, networking and co-payer synchronization. A TWS instance can be setup and operational within minutes or you can use a public instance like `https://bws.bitpay.com`. Switching between ТWS instances is very simple and can be done with a click from within Titus Wallet. TWS also allows Titus Wallet to inter-operate with other wallets.

## Release Schedules

Titus Wallet uses the `MAJOR.MINOR.BATCH` convention for versioning. Any release that adds features should modify the MINOR or MAJOR number.

### Bug Fixing Releases

We release bug fixes as soon as possible for all platforms. Usually around a week after patches. There is no coordination so all platforms are updated at the same time.

## License

Code released under the MIT license.

Copyright 2018-2019 Titus Coin Core Developers.

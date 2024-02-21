# CasualOS cmi5 Examples

This repository contains example courses that demonstrate how CasualOS can be used with cmi5-compatible Learning Management Systems.

[cmi5](https://github.com/AICC/CMI-5_Spec_Current) is a specification for a [xAPI](https://github.com/adlnet/xAPI-Spec) "profile". That is, it extends xAPI with a vocabulary of Verbs, and other features to make integration with Learning Mangement Systems easier.

## Getting Started

1. Install the required programs:
    -   [Node.js](https://nodejs.org/en/download/) v18.17.1 or later.
    -   If installing for the first time, it is reccommended that you install it via Node Version Manager. ([Mac][nvm-mac], [Windows][nvm-windows])
    -   Once NVM is installed, you can install the correct version of Node by running `nvm install v18.17.1` in your favorite terminal.
2. Install dependencies:
    -   `$ corepack enable`
    -   `$ pnpm install`
3. Zip a course:
    -   `$ pnpm start zip ab1-cmi5-sandbox`

[nvm-mac]: https://github.com/creationix/nvm
[nvm-windows]: https://github.com/coreybutler/nvm-windows

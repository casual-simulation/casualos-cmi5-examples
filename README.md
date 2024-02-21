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

## Development in CasualOS

CasualOS supports cmi5 by using the [cmi5 JavaScript library](https://github.com/xapijs/cmi5).
It doesn't work out of the box, but it only needs a simple modification to support running in CasualOS.
Luckily, the only thing we need to do is teach the cmi5 library to load the launch parameters from the configBot url tag instead of the window.

The below code can be placed in the `@onInstJoined` tag on a bot to initialize the cmi5 session (don't forget to also call this from `@onEggHatch` if you are using an egg):
```javascript
// Import the cmi5 javascript library
const { default: Cmi5 } = await import('https://esm.run/@xapi/cmi5');
const { default: XAPI } = await import("https://esm.run/@xapi/xapi");

// Create a custom class that is able to retrieve the launch parameters from the url tag
class Ab1Cmi5 extends Cmi5 {

    getLaunchParametersFromLMS() {
        const url = new URL(configBot.tags.url);
        return XAPI.getSearchQueryParamsAsObject(
            url.search
        );
    }

}

const cmi5 = new Ab1Cmi5();

// initialize cmi5
await cmi5.initialize();

// store in an os variable
// It can be stored anywhere, just not in a tag.
os.vars.cmi5 = cmi5;
```

From here, we can use any of the documented functions and methods like `cmi5.pass()` to send a statement that indicates the AU has been passed by the student or `cmi5.complete()` to indicate that the AU has been completed.

See an example AB on ab1.bot: [https://ab1.bot/?pattern=kg-cmi5-example&studio=8057ac27-0741-48a7-9ddd-c71b9cbe5fc2&bios=free%20inst](https://ab1.bot/?pattern=kg-cmi5-example&studio=8057ac27-0741-48a7-9ddd-c71b9cbe5fc2&bios=free%20inst)

Also be sure to check out the [cmi5 library documentation](https://www.xapijs.dev/cmi5-profile-library/introduction).


[nvm-mac]: https://github.com/creationix/nvm
[nvm-windows]: https://github.com/coreybutler/nvm-windows

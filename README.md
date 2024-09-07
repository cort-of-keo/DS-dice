# Draw Steel Mod for Owlbear Rodeo Dice

Added a new menu for Draw Steel bonuses and dice mechanics.

![Example](/docs/DS-dice.jpg)

NOTE: Power Roll button removed until it is functional.

## Installing

Follow this
[guide](https://docs.owlbear.rodeo/extensions/tutorial-hello-world/install-your-extension)
and use this [manifest link](https://ds-dice.onrender.com/manifest.json)
to install the extension in Owlbear.

## How it Works

- Generate 2d10 as you would normally, by clicking on the d10 dice twice. 
- Click on the 'DS' button on the sidebar.
- Adjust your Characteristic Score and select the appropriate modifiers.

I removed the Power Roll button until I can get it fuctioning as intended.

There is no logic to make sure you don't apply a Edge/Bane when you have a Double Edge/Bane.

The Double Edge/Bane buttons will return a total value to put the result just into the next Tier up/down. eg. if you have a Double Edge and roll a total of 15 (dice plus modifiers) it will return a total value of 17 to bump it from a Tier 2 result to a Tier 3 result.

To try out the dice roller outside of Owlbear Rodeo you can head to <https://ds-dice.onrender.com>.

Feedback welcome!

## From Base Owlbear Rodeo Dice Extenstion

This project uses [React](https://reactjs.org/) for UI, [Three.js](https://threejs.org/) for rendering and [Rapier](https://rapier.rs/) for physics.

The physics simulation is used to both generate the animation for the roll as well as the final roll values.

> Wait is it really random if physics is used to determine the result? How do I know the dice rolls are fair?

Short answer yes, the dice are fair. Long answer [here's a statistical analysis](https://blog.owlbear.rodeo/are-owlbear-rodeos-dice-fair/) of the rolling methodology.

In order to sync rolls over the network efficiently we rely on the fact the Rapier is a deterministic physics engine. This means that across two different computers we'll get the same result given the same initial parameters.

So we only need to make sure that all the initial parameters are synced and then each client can run its own simulation and end up with the correct animation.


## Building

This project uses [Yarn](https://yarnpkg.com/) as a package manager.

To install all the dependencies run:

`yarn`

To run in a development mode run:

`yarn dev`

To make a production build run:

`yarn build`

## Project Structure

All source files can be found in the `src` folder.

If you'd like to create a new dice set with the existing dice styles edit the `diceSets.ts` file in the `sets` folder.

If you'd like to add a new dice style the 3D models for the dice are split across four folders: `materials`, `meshes`, `colliders` and `previews`.

The `materials` folder contains the PBR materials for each dice style.

The `meshes` folder contains the 3D geometry used for the dice.

The `colliders` folder contains the simplified collider geometry for the dice.

The `previews` folder contains 2D image previews for each dice.

All the code specific for the Owlbear Rodeo extension is in the `plugin` folder.

## License

GNU GPLv3

## Contributing

This project is provided as an example of how to use the Owlbear Rodeo SDK. As such it is unlikely that we will accept pull requests for new features.

Instead we encourage you to fork this repository and build the dice roller of your dreams.

Copyright (C) 2023 Owlbear Rodeo

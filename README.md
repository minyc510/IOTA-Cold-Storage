# IOTA Cold Storage

This web-app generates IOTA addresses given a private seed and prints them onto a graphical paper wallet. Includes a seed generation tool which uses entropy collected from the user to further randomize a pseudo-random seed generated by javascript. However, it is highly recommended to only use the seed generator for testing/demonstrative purposes as seed generators are inherently insecure. Please take caution when using this tool.

A live demo can be found here: [iota-cold-storage.surge.sh](http://iota-cold-storage.surge.sh/)

Here is an example of a paper wallet generated by this tool. 
(Clearly you shouldn't use this address, as the private seed is public and anyone would have access to funds sent to it)
![Wallet Example](src/images/WalletExample.png?raw=true "Wallet Example")

## Build and Compile Locally

Requires `node js`.
Use `node -v` to check if you have it installed.

    git clone https://github.com/minyc510/IOTA-Cold-Storage.git
    cd IOTA-Cold-Storage
    npm install
    npm start

## Tools Used
- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- Front-end framework: [React-Bootstrap](https://react-bootstrap.github.io/).
- Image manipulation done using [React-Konva](https://github.com/lavrton/react-konva).
- Addresses generated using the official IOTA javascript API [iota.lib.js](https://github.com/iotaledger/iota.lib.js).

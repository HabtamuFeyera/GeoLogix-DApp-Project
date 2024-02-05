# GeoLogix DApp Project

GeoLogix Solutions revolutionizes the logistics and delivery industry with its state-of-the-art GPS and blockchain technology. This repository contains the source code for the Ethereum-based decentralized application (dApp) developed by GeoLogix Solutions.

## Project Structure

GeoLogix-DApp-Project/
|-- contracts/
| |-- RefundByLocation.sol
| |-- ERC20.sol
|-- frontend/
| |-- index.html
| |-- app.js
|-- scripts/
| |-- deploy.js
|-- test/
| |-- RefundByLocation.test.js
|-- node_modules/
|-- hardhat.config.js
|-- package.json


## Contracts

- `RefundByLocation.sol`: Smart contract implementing the Refund By Location logic.
- `ERC20.sol`: ERC-20 token contract for managing rewards within the system.

## Frontend

- `index.html`: Main HTML file for the dApp.
- `app.js`: JavaScript file for interacting with the smart contract and updating the dApp's user interface.

## Scripts

- `deploy.js`: Deployment script for deploying smart contracts to the Ethereum network.

## Test

- `RefundByLocation.test.js`: Test file for testing the RefundByLocation smart contract.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/HabtamuFeyera/GeoLogix-DApp-Project.git
    cd GeoLogix-DApp-Project
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run Hardhat tasks:

    ```bash
    npx hardhat
    ```

4. Deploy smart contracts:

    ```bash
    npx hardhat run scripts/deploy.js --network YOUR_NETWORK_NAME
    ```

5. Start the dApp:

    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! If you have any suggestions or find issues, please open an [issue](https://github.com/HabtamuFeyera/GeoLogix-DApp-Project.git).
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

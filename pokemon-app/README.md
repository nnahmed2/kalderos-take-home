# Welcome to the Pokemon Web App!

To run the web app, make sure to have the following installed if you don't already have it:

- Node (v18 or higher) - [Download Node.js](https://nodejs.org/en/download/package-manager)
- npm (v8 or higher) - [Installing npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Run `npm install --legacy-peer-deps` to install all the dependencies (there is a peer dependency conflict with Typescript).

Make sure that the PokemonAPI is running before starting this app.

#### `npm start`

To run the app use the above command. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You may need to update the port number in setupProxy.js to the port the API is running on if it is different from 5282.

## More about the design

- Redux: Nate mentioned Kalderos uses Redux so I thought it would be fun to learn to use for a centralized store in this project! I used it to store the comprehensive list of all pokemon and the summary data instead of passing this data through props to components.
- Material UI: I utilized Material UI for all the UI components. [Getting started with Material UI](https://mui.com/material-ui/getting-started/)

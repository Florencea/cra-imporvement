# Create React App Imporvement

![CI](https://github.com/Florencea/create-react-app-imporvement/actions/workflows/test.yml/badge.svg)

This project was bootstrapped with [Create React App](https://create-react-app.dev/) and then eject and apply some imporvement on it.

- [Create React App Imporvement](#create-react-app-imporvement)
  - [Features](#features)
    - [Proxy Path Rewrite](#proxy-path-rewrite)
  - [Available Scripts](#available-scripts)
    - [`npm/yarn/pnpm/bun run start`](#npmyarnpnpmbun-run-start)
    - [`npm/yarn/pnpm/bun run test`](#npmyarnpnpmbun-run-test)
    - [`npm/yarn/pnpm/bun run build`](#npmyarnpnpmbun-run-build)
    - [`npm/yarn/pnpm/bun run preview`](#npmyarnpnpmbun-run-preview)
    - [`npm/yarn/pnpm/bun run lint`](#npmyarnpnpmbun-run-lint)
    - [`npm/yarn/pnpm/bun run format`](#npmyarnpnpmbun-run-format)
  - [Recipes](#recipes)
    - [Compatibale with IE 11](#compatibale-with-ie-11)
      - [Step-1 Use packages version support IE 11](#step-1-use-packages-version-support-ie-11)
      - [Step-2 Change react render to react17 and import polyfill](#step-2-change-react-render-to-react17-and-import-polyfill)
      - [Step-3 Set build target to IE11](#step-3-set-build-target-to-ie11)
  - [Learn More](#learn-more)

## Features

- All packages are the `latest`, no npm audit warning.
  - Package issues are fixed.
  - Run GitHub Actions matrix CI on:
    - Different OS (windows-latest/macos-latest/ubuntu-latest)
    - Different Node.js version (maintenance LTS/active LTS/current)
    - Different package manager (npm/yarn/yarn-berry/pnpm/bun)
- Add `pathRewrite` feature.
- Add `npm/yarn/pnpm/bun run preview`, which share same proxy config with development server.
- Add `npm/yarn/pnpm/bun run lint` for `eslint`.
- Add `npm/yarn/pnpm/bun run format` for `prettier`.
- Despite above features, behaves the same as [Create React App](https://create-react-app.dev/)
  - Which means CRA documents can still be referenced
  - Webpack, Babel, Jest, Browserslist, ESLint configs are all in `package.json`, behaves the same as CRA

### Proxy Path Rewrite

- Add `proxy` and `proxyRewrite` objects to `package.json`
- According to CRA [Proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development), `proxyRewrite` will not load unless `proxy` key is set.
- **Note**: [`src/setupProxy.js`](https://create-react-app.dev/docs/proxying-api-requests-in-development#configuring-the-proxy-manually) will ignore `proxyRewrite`, which behaves the same as CRA.

```json
{
  "proxy": "https://jsonplaceholder.typicode.com/",
  "proxyRewrite": {
    "/api": "/",
    "/other/api": "/"
  }
}
```

## Available Scripts

In the project directory, you can run:

### `npm/yarn/pnpm/bun run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm/yarn/pnpm/bun run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.

### `npm/yarn/pnpm/bun run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

### `npm/yarn/pnpm/bun run preview`

After build the app for production to the `build` folder.\
Preview the app in the prodiction mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\

Preview server share same proxy config with development server.

### `npm/yarn/pnpm/bun run lint`

Use `eslint` to check issues.

### `npm/yarn/pnpm/bun run format`

Format codes with `prettier`

## Recipes

### Compatibale with IE 11

#### Step-1 Use packages version support IE 11

- Check pacakges manually and install proper version

```sh
# npm
npm i react@17 react-dom@17 @testing-library/react@12
# yarn
yarn add react@17 react-dom@17 @testing-library/react@12
# pnpm
pnpm add react@17 react-dom@17 @testing-library/react@12
```

#### Step-2 Change react render to react17 and import polyfill

- `src/index.tsx`

```tsx
// prettier-ignore-start
import "react-app-polyfill/ie11";
// prettier-ignore-end
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {
  reportCLS,
  reportFCP,
  reportFID,
  reportINP,
  reportLCP,
  reportTTFB,
} from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportCLS(console.log))
// or send to an analytics endpoint. Learn more: https://github.com/GoogleChrome/web-vitals
reportCLS();
reportFCP();
reportFID();
reportINP();
reportLCP();
reportTTFB();
```

#### Step-3 Set build target to IE11

- `package.json`

```json
{
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all", "IE 11"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

## Learn More

You can learn more in the [Create React App documentation](https://create-react-app.dev/).

To learn React, check out the [React documentation](https://reactjs.dev/).

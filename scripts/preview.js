// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const chalk = require("react-dev-utils/chalk");
const openBrowser = require("react-dev-utils/openBrowser");
const clearConsole = require("react-dev-utils/clearConsole");
const {
  choosePort,
  prepareUrls,
  prepareProxy,
} = require("react-dev-utils/WebpackDevServerUtils");
const paths = require("../config/paths");

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const isInteractive = process.stdout.isTTY;

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST),
      )}`,
    ),
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`,
  );
  console.log(
    `Learn more here: ${chalk.yellow("https://cra.link/advanced-config")}`,
  );
  console.log();
}

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `choosePort()` Promise resolves to the next free port.
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port == null) {
      // We have not found a port.
      return;
    }

    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const appName = require(paths.appPackageJson).name;
    const buildPath = paths.appBuild;

    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyRewrite = require(paths.appPackageJson).proxyRewrite;
    const webpackProxyConfig = prepareProxy(
      proxySetting,
      paths.appPublic,
      paths.publicUrlOrPath,
    );
    const proxytarget = proxySetting;
    const proxyPathSource = proxyRewrite
      ? `${[...Object.keys(proxyRewrite)][0] ?? "/"}`
      : "/";
    const proxyPathDestination = proxyRewrite
      ? `${[...Object.values(proxyRewrite)][0] ?? "/"}`
      : "/";
    const proxyConfig = webpackProxyConfig
      ? {
          target: proxytarget,
          changeOrigin: true,
          secure: false,
          pathRewrite: (path) =>
            path.replace(proxyPathSource, proxyPathDestination),
          logger: console,
        }
      : undefined;

    const urls = prepareUrls(
      protocol,
      HOST,
      port,
      paths.publicUrlOrPath.slice(0, -1),
    );

    const previewServer = express();

    if (proxyConfig) {
      previewServer.use([proxyPathSource], createProxyMiddleware(proxyConfig));
    }

    previewServer.use(
      paths.publicUrlOrPath.slice(0, -1),
      express.static(buildPath),
    );

    // Launch previewServer.
    previewServer.listen(port, () => {
      if (isInteractive) {
        clearConsole();
      }

      console.log(
        `\n\nYou can now view ${chalk.bold(appName)} in the browser.\n`,
      );
      console.log(`  ${urls.localUrlForBrowser}\n`);
      console.log(
        `This is a preview for ${chalk.cyan("production")} build.\n\n`,
      );
      openBrowser(urls.localUrlForBrowser);
    });

    ["SIGINT", "SIGTERM"].forEach(function (sig) {
      process.on(sig, function () {
        process.exit();
      });
    });

    if (process.env.CI !== "true") {
      // Gracefully exit when stdin ends
      process.stdin.on("end", function () {
        process.exit();
      });
    }
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

const path = require("path");

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html}

module.exports = {
  process(sourceText, sourcePath) {
    const assetFilename = JSON.stringify(path.basename(sourcePath));

    if (sourcePath.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const souceFile = path.parse(sourcePath).name;
      const pascalCaseFilename = souceFile.replace(
        /(\w)(\w*)/g,
        (g0, g1, g2) => `${g1.toUpperCase()}${g2.toLowerCase()}`,
      );
      const componentName = `Svg${pascalCaseFilename}`;
      return {
        code: `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`,
      };
    } else {
      return { code: `module.exports = ${sourcePath};` };
    }
  },
};

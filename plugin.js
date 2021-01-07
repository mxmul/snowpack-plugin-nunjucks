const { promisify } = require('util');
const nunjucks = require('nunjucks');
const chokidar = require('chokidar');

const watchers = {};

function watchDependencies({
  env,
  filePath,
  onChange,
}) {
  if (!(filePath in watchers)) {
    watchers[filePath] = chokidar.watch([]);
    watchers[filePath].on('change', onChange);
  }

  env.on('load', (name) => {
    if (name !== filePath) {
      watchers[filePath].add(name);
    }
  });
}

module.exports = function () {
  return {
    name: 'snowpack-plugin-nunjucks',
    resolve: {
      input: ['.njk'],
      output: ['.html'],
    },
    async load({ filePath, isDev }) {
      const env = nunjucks.configure(process.cwd());

      if (isDev) {
        watchDependencies({
          env,
          filePath,
          onChange: () => { this.markChanged(filePath) },
        });
      }

      return promisify(env.render.bind(env))(filePath);
    },
  };
};

module.exports.watchDependencies = watchDependencies;

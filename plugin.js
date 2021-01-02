const { promisify } = require('util');
const nunjucks = require('nunjucks');
const chokidar = require('chokidar');

const render = promisify(nunjucks.render);

module.exports = function (snowpackConfig, options) {
  return {
    name: 'snowpack-plugin-nunjucks',
    resolve: {
      input: ['.njk', '.html'],
      output: ['.html'],
    },
    watchers: {},
    async load({ filePath, isDev }) {
      const { path = process.cwd(), opts, extendEnv } = options;

      const env = nunjucks.configure(path, opts);

      if (isDev) {
        if (!(filePath in this.watchers)) {
          this.watchers[filePath] = chokidar.watch([]);
          this.watchers[filePath].on('change', () => {
            this.markChanged(filePath);
          });
        }

        env.on('load', (name) => {
          if (name !== filePath) {
            this.watchers[filePath].add(name);
          }
        });
      }

      if (extendEnv) {
        extendEnv(env);
      }

      return render(filePath);
    },
  };
};

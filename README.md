# `cmu-fencing`

Website for CMU Fencing.

Thanks to `webpack@^3` and friends, this project supports tree shaking, hot
module replacement, dynamic requires, code splitting, and more.

## Usage
1. Clone the repo.
2. Install the dependencies: `npm install`

Several build-related scripts can be run using `npm run <script>`:
- `doc`: generates HTML documentation and places it into `doc`
- `doc-watch`: same as `doc`, but watches for changes and automatically rebuilds
- `lint`: runs [eslint] on all source files
- `build`: builds the project and places the bundle into `./dist`
- `dist`: same as above, excepts does production-level optimizations
- `start`: starts a server that serves the built bundle in `./dist`
- `watch`: watches for changes, automatically rebuilding when necessary
- `live`: starts a [webpack-dev-server] and enables [hot module replacement].
  Access the server at [http://localhost:8080](http://localhost:8080).

[eslint]: https://eslint.org/
[webpack-dev-server]: https://webpack.js.org/guides/development/#using-webpack-dev-server
[hot module replacement]: https://webpack.js.org/guides/hot-module-replacement/


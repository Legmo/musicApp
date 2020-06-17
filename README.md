# musicapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

The dist directory is meant to be served by an HTTP server (unless you've configured publicPath to be a relative value), so it will not work if you open dist/index.html directly over file:// protocol. The easiest way to preview your production build locally is using a Node.js static file server, for example serve:
```
npm install -g serve
# -s flag means serve it in Single-Page Application mode which deals with the routing problem below
serve -s dist
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Client

- `yarn add openid-client`
- `node src/App.js`

You'll get an error about HTTPS when you submit, so run a proxy. One way, in any other directory:
- `yarn add node-http-server`
- `cd node_modules/node-http-server/example/proxy`
- edit https-and-http-google-proxy.js: set `config.port` to 80 & `config.https.port` to 443 & `url` to `https:...` (including your port)
- `node ./https-and-http-google-proxy.js`




## Background

Found at OAuth.net: https://oauth.net/code/nodejs/ (and others at https://oauth.net/code/javascript/ )

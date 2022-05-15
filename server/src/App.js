PORT=4000

const { Provider } = require('oidc-provider');
const configuration = {
  // ... see the available options in Configuration options section
  clients: [{
    client_id: 'endorser.ch',
    client_secret: 'unused-TQV5U29k1gHibH5bx1layBo0OSAvAbRT3UYW3EWrSYBB5swxjVfWUa1BS8lqzxG/0v9wruMcrGadany3',
    redirect_uris: ['https://client.local.gd/oidc-callback', 'https://jwt.io'],
    response_types: ['id_token'],
    grant_types: ['implicit'],
    //token_endpoint_auth_method: 'none'? 'client_secret_basic'?
  }],
  findAccount: async (ctx, id) => ({
    accountId: id,
    claims: async (use, scope) => ({ sub: id })
  }),
};

const oidc = new Provider('http://localhost:' + PORT, configuration);

const server = oidc.listen(PORT, () => {
  console.log('oidc-provider listening on port ' + PORT + ', check http://localhost:' + PORT + '/.well-known/openid-configuration');
});


PORT=4000

const { Provider } = require('oidc-provider');
const configuration = {
  // ... see the available options in Configuration options section
  clients: [{
    client_id: 'endorser.ch',
    client_secret: 'TQV5U29k1gHibH5bx1layBo0OSAvAbRT3UYW3EWrSYBB5swxjVfWUa1BS8lqzxG/0v9wruMcrGadany3',




    ////////////////////////////////////////////////////////////////
    /**
       This implicit approach is for browsers.
       It shows users a screen to enter their username & password and a screen to authorize (if devInteractions isn't disabled).
       It can redirect with a post (if client sets response_mode to to form_post) or a fragment (if that's not set).
    **/

    grant_types: ['implicit'],
    redirect_uris: ['https://client.local.gd/oidc-callback', 'https://jwt.io'],
    response_types: ['id_token'],


    ////////////////////////////////////////////////////////////////
    /**
       This client_credentials approach allows direct API calls to the /token & /token/introspection endpoints.

       $ curl -X POST -H 'Authorization: Basic ZW5kb3JzZXIuY2g6VFFWNVUyOWsxZ0hpYkg1YngxbGF5Qm8wT1NBdkFiUlQzVVlXM0VXclNZQkI1c3d4alZmV1VhMUJTOGxxenhHLzB2OXdydU1jckdhZGFueTM=' "http://localhost:4000/token" -d "grant_type=client_credentials&scopes=openid"

       Result: {"access_token":"53C-nq3jIiwrbZJWVjKmI4sFYtce1o1Q2tt3w0QNGcY","expires_in":600,"token_type":"Bearer"}

       $ curl -X POST -H 'Authorization: Basic ZW5kb3JzZXIuY2g6VFFWNVUyOWsxZ0hpYkg1YngxbGF5Qm8wT1NBdkFiUlQzVVlXM0VXclNZQkI1c3d4alZmV1VhMUJTOGxxenhHLzB2OXdydU1jckdhZGFueTM=' "http://localhost:4000/token/introspection" -d "token=53C-nq3jIiwrbZJWVjKmI4sFYtce1o1Q2tt3w0QNGcY"

       Result: {"active":true,"client_id":"endorser.ch","exp":1652671339,"iat":1652670739,"iss":"http://localhost:4000","token_type":"Bearer"}

       From https://www.scottbrady91.com/openid-connect/getting-started-with-oidc-provider

       Enable these settings (plus features.clientCredentials and features.introspection below):

    grant_types: ['client_credentials'],
    redirect_uris: [],
    response_types: [],
    token_endpoint_auth_method: 'client_secret_basic', // auth is enforced even without this
    //token_endpoint_auth_method: 'none', // supposedly this is a valid setting but it still complains if Authorization missing
    **/

  }],
  features: {
    //clientCredentials: { enabled: true }, // see client_credentials approach with /token & /introspection endpoints above
    //devInteractions: { enabled: false },
    //introspection: { enabled: true } // see client_credentials approach with /introspection endpoint above
  },

  /** Not sure the utility of this but I may play with it.
  findAccount: async (ctx, id) => {
    console.log('findAccount context', ctx)
    console.log('findAccount id', id)
    return {
      accountId: id,
      claims: async (use, scope) => ({ sub: id })
    }
  },
  **/

  /** Not sure the utility of this but I may play with it.
  // This causes it to not show the Authorize screen to ask to continue after login.
  loadExistingGrant: async (ctx) => {
    //console.log('loadExistingGrant context', ctx)
    const grant = new ctx.oidc.provider.Grant({
      clientId: ctx.oidc.client.clientId,
      accountId: ctx.oidc.session.accountId,
    });

    grant.addOIDCScope('openid email profile');
    grant.addOIDCClaims(['first_name']);
    grant.addResourceScope('urn:example:resource-indicator', 'api:read api:write');
    await grant.save();
    return grant;
  },
  **/
};

const oidc = new Provider('http://localhost:' + PORT, configuration);

const server = oidc.listen(PORT, () => {
  console.log('oidc-provider listening on port ' + PORT + ', check http://localhost:' + PORT + '/.well-known/openid-configuration');
});

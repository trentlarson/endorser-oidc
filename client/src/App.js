const { generators, Issuer } = require('openid-client')

const discover = async () => {
  const issuer = await Issuer.discover('http://localhost:4000');
  //console.log('issuer', issuer);
  //console.log('issuer metadata', issuer.metadata);

  // from https://github.com/panva/node-openid-client#implicit-id-token-flow

  const client = new issuer.Client({
    client_id: 'endorser.ch',
    redirect_uris: ['https://client.local.gd/oidc-callback'],
    //redirect_uris: ['https://jwt.io'], // for jwt.io, comment out response_mode below (so it's not form_post)
    response_types: ['id_token'],
    // id_token_signed_response_alg (default "RS256")
  })

  //console.log('client',client)

  const nonce = generators.nonce();
  // store the nonce in your framework's session mechanism, if it is a cookie based solution
  // it should be httpOnly (not readable by javascript) and encrypted.

  const authUrl = client.authorizationUrl({
    scope: 'openid email profile',
    response_mode: 'form_post', // sends id_token in post; without this, sends as fragment (with URL ending in "#id_token=")
    nonce,
  })
  console.log(authUrl)

}

discover()

# endorser-oidc

OpenID Connect to check for the right Endorser confimations

To use:

- Run the server (see server/README.md).
- Run the client, including the proxy (see client/README.md).
- Copy the result of the client call into a browser.
- Fill out the information & continue to see it redirect to the callback with a valid token in the post.

Other options:

- Redirect with the token as a fragment in the URL instead of as a post body (see client/src/App.js).
- Redirect to jwt.io instead of the local callback (see client/src/App.js).
- Do the authentication via an API call instead of a browser (see server/src/App.js).




# Background

This example Heroku app really helped: https://github.com/panva/node-oidc-provider-example/tree/main/00-oidc-minimal

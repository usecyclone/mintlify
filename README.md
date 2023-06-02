# Mintlify source code

### npm packages

Mintlify has a few NPM packages licensed under Elastic V2 license. They start with `@mintlify`. Here, we have downloaded the tarballs for
- `@mintlify/preview`
- `@mintlify/cli`

The preview package is used by the cli package to render the doc site locally. The bulk of the frontend
code is actually kept away from NPM. They are downloaded by the preview package.

### Mintlify frontend client

This is downloadable, by version, from:

```
https://mint-releases.b-cdn.net/mint-0.0.21.tar.gz
```

There you can find the actual frontend logic, including when to load PostHog and when not to.

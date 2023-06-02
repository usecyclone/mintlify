# Running CLI Locally

Note: contributing requires `yarn` and it's recommended you install it as a global installation. If you don't have yarn installed already run `npm install -g yarn` in your terminal.

Run `yarn` or `yarn install` to install dependencies. Then, run `npm link` once to link to your local version of the CLI in the npm global namespace (`npm list -g`). Make sure you are working in `packages/mintlify-cli` and not its alias package, `packages/mintlify`.

If you already have a non-local version of the CLI, you will need to uninstall it (`npm uninstall -g mintlify`) or force overwrite the executable file. Otherwise, you will get an `EEXIST` error on the mintlify binary. You can overwrite the file using the `--force` flag (`npm link --force`), but always double check the file(s) you are overwriting.

Make sure to build the CLI using `yarn build` or `yarn watch` to see your local changes reflected. Tip: keep `yarn watch` running in a separate terminal for changes to be quickly and continuously reflected while developing.

To uninstall locally, run `npm uninstall -g @mintlify/cli`.

If you wish to continue using the production version of the CLI, you will need to reinstall it (`npm install -g mintlify`). If you do not uninstall `@mintlify/cli`, then you will need to force overwrite the executable file (`npm install -g mintlify --force`) for the same reasons as mentioned above. As a best practice, we recommend always uninstalling `@mintlify/cli` first.

## Updating Version of Mint Client

The CLI uses GitHub releases to download specific versions of the client code used in `mintlify dev`. Older CLI versions will continue using the client code they were bundled with. Users need to update to a newer version of the CLI to get the newest client code. CLI contributors bump the client version used by the CLI whenever there are major changes.

Here's how to publish new client changes to the CLI:

1. Bump the version of the client package, as well as the value of `TARGET_MINT_VERSION`. ([example PR](https://github.com/mintlify/old-mint/pull/567/files))
2. If the version in `packages/mintlify-prebuild/package.json` is ahead of the version in `dependencies` of `client/package.json`, update the dependency and run `yarn` from the root folder. ([example PR](https://github.com/mintlify/old-mint/pull/553/files))
3. Create PR, copy/pasting test plan from above PRs.
4. Start a new `Upload zip` workflow. **BE SURE TO SPECIFY YOUR PR BRANCH** and the new client version number.
   <img width="800" alt="Screenshot 2023-04-24 at 10 03 15 PM" src="https://user-images.githubusercontent.com/63772591/234178961-ab33c765-8b42-41e8-942f-f0a929d7abbf.png">
5. Execute test plan.
6. Merge PR.
7. Wait for `Bump packages` workflow to succeed on your squashed commit. At this point, all npm packages have been updated.
8. For completeness, download the zip from bunny.net and create a new GitHub release with the given version.
   <img width="800" alt="Screenshot 2023-04-24 at 10 10 26 PM" src="https://user-images.githubusercontent.com/63772591/234179953-9d0976db-9a3b-4678-b844-245b95385671.png">

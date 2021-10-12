## Workflows for js/ts {docsify-ignore-all}

Let's take a quick look 👀 at a few workflow examples. These examples explore how to do some basic CI/CD with JavaScript using Node.js. NPM is **not** the only option when it comes to JavaScript, but the focus here is on workflow syntax and not necessarily the exact tooling in place.

### Node.js CI

```yaml
name: Node.js CI

on: [push]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x]

    steps:
      - name: Checkout repo code into runner environment
        uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm install

      - name: Build code with npm
        run: npm run build --if-present

      - name: Test code with npm
        run: npm test
          env:
            CI: true
```

### Publish packages to NPM and GitHub packages

```yaml
name: Node.js Package

on:
  release:
    types: [created]

jobs:
  publish-packages:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code from repo to runner
        uses: actions/checkout@v2

      - name: Setup .npmrc file to publish to npm
        uses: actions/setup-node@v1
        with:
          node-version: "10.x"
          registry-url: "https://registry.npmjs.org"

      - name: Install deps
        run: npm install

      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Setup .npmrc file to publish to GitHub Packages
        uses: actions/setup-node@v1
        with:
          registry-url: "https://npm.pkg.github.com"
          scope: "@octocat" # Defaults to the user or organization that owns the workflow file

      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

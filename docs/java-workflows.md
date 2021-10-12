## Workflows for java {docsify-ignore-all}

Let's take a quick look 👀 at a few workflow examples. These examples explore how to do some basic CI/CD with Java packages using Maven. Maven is **not** the only option when it comes to Java, but the focus here is on workflow syntax and not necessarily the exact tooling in place.

### Maven workflow examples

**Build, test and stage a Java package**

```yaml
name: Java CI

on: [push]

jobs:
  build-package:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code into runner environment
        uses: actions/checkout@v2

      - name: Set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
          architecture: x64

      - name: Build using Maven
        run: mvn -B package --file pom.xml

      - name: Creating staging directories on runner
        run: mkdir staging && cp target/*.jar staging

      - name: Stage artifact for delivery
        uses: actions/upload-artifact@v1
        with:
          name: my-package-name
          path: staging
```

**Publish a Java package**

```yaml
name: Publish package to the Maven Central Repository and GitHub Packages

on:
  release:
    types: [created]

jobs:
  publish-packages:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code into the runner environment
        uses: actions/checkout@v2

      - name: Set up Java for publishing to Maven Central Repository
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
          server-id: ossrh
          server-username: MAVEN_USERNAME
          server-password: MAVEN_PASSWORD

      - name: Publish to the Maven Central Repository
        run: mvn -B deploy
        env:
          MAVEN_USERNAME: ${{ secrets.OSSRH_USERNAME }}
          MAVEN_PASSWORD: ${{ secrets.OSSRH_TOKEN }}

      - name: Set up Java for publishing to GitHub Packages
        uses: actions/setup-java@v1
        with:
          java-version: 1.8

      - name: Publish to GitHub Packages
        run: mvn -B deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

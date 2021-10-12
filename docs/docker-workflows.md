## Workflows for Docker {docsify-ignore-all}

Let's take a quick look 👀 at publishing a Docker image to the Docker Hub as well as GitHub Container registry.

### Publish an image

```yaml
name: Publish Docker image

on:
  release:
    types: [published]

jobs:
  push_to_registries:
    name: Push Docker image to multiple registries
    runs-on: ubuntu-latest

    steps:
      - name: Check out the repo
        uses: actions/checkout@v2

      - name: Push to Docker Hub
        uses: docker/build-push-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          repository: my-docker-hub-namespace/my-docker-hub-repository
          tag_with_ref: true

      - name: Push to GitHub Packages
        uses: docker/build-push-action@v1
        with:
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
          registry: containers.pkg.github.com
          repository: my-org/my-repo/my-image
          tag_with_ref: true
```

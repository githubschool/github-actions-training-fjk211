** # Deprecated please do not follow links in this guide**
# Migrating to GitHub Actions Facilitator Guide

Welcome to the Migrating to GitHub Actions offering repo. In this repo, you will find the content used by GitHub during our official actions training and consulting.

If you have access to this repository, it is because your company has an agreement with GitHub to use these materials. Your use of these materials is described by that agreement.

## Deploy the manual

This guid is currently deployed to GitHub pages and can be found here

If you would like to contribute to the guide follow the steps in the **Preview changes on your machine** section.

<!--
These manuals are designed to be generated using [docsify](https://docsify.js.org). To get your own manuals up and running, all you have to do is:

1. Fork this repository
2. In your fork, click on **Settings**
3. Scroll down to the GitHub Pages section, and set **Source:** to `master branch /docs folder`.
4. Click **Save**.
5. Return to the GitHub Pages section of Settings, and you'll receive the URL of your published manual.
-->

## Make changes

The official [docsify documentation](https://docsify.js.org/#/?id=docsify) is your best bet for getting up to speed with the tool.

In general, you'll find all of the manual content in the [`docs/`](docs/) folder of this repository. All content is written in Markdown, and it's all stitched together in [`docs/_sidebar.md`](docs/_sidebar.md), which specifies the order and hierarchy of the content.

#### Mermaid-js

This manual makes use of [mermaid-js](https://mermaid-js.github.io/mermaid/#/) specifically for the use of `stateDiagram`. Should you need to update, or want to add, a new `stateDiagram` using this library will allow the custom CSS to be applied for consistency.

Any diagrams can be written directly in markdown with the [mermaid syntax](https://mermaid-js.github.io/mermaid/#/stateDiagram) however it is important to note that docsify and mermaid struggle to work well together, so once a new `stateDiagram` is created it is best to save a screenshot of it and use it within the markdown vs the raw mermaid chart.

Doing so will prevent mermaid from breaking as you go to a new page.

## Preview changes on your machine

You can install, and serve the contents of the `docs/` folder locally with minimal setup. The steps are thoroughly described in the [doscify quick start](https://docsify.js.org/#/quickstart) guide.

**steps:**

1. `npm i docsify-cli -g`
2. `docsify serve docs`

View the locally running version of this guide at `http://localhost:3000`

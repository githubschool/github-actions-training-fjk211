# Delivery guidance

This document is designed to help facilitators understand the intent of the sections within this guide. Alongside intent, facilitators will find additional questions and discussion topics throughout this document that will aide them in the presentation of this offering.

**This is meant to be an internal document**.

#### Notes

As per the facilitators discretion, based on your scoping call with the customer, take time at the end of each section to discuss implementing the preceding training into the project that was decided upon.

This will allow the customer to immediately apply what they learned to an implementation plan for their project.

---

## Getting Started

### 00.0_getting-started.md

#### Purpose

This activity is just an opportunity for introductions and for the facilitator to start to gauge the current level of GitHub Actions familiarity. This activity is best served in a round robin approach with everyone in the room having a few seconds to introduce themselves.

This is especially important when the people attending are **not** a part of the same team or organization!

#### Notes

Although this activity is slated for **~15 minutes** there are many cases where this could be a much shorter, or longer activity. These timings are loose and cab be flexible to meet the needs of the group attending the offering.

#### Questions

During delivery, some attendees may have prior CI/CD, automation or actions experience. In that event here are some follow up questions that can be asked to make the conversation more robust.

- Do you find yourself using community driven actions or are you confined to private actions?
- What are some of the benefits you've gained from using actions opposed to another platform?
- Can you describe the process you used while adopting GitHub Actions?
- Have you written any custom actions?
  - Were they Docker container or JavaScript actions?
  - Did you publish them to the marketplace?
  - Are they open-source?
- How does you currently share workflows/actions across teams?

---

## Introduction to GitHub Actions

### 01.0_actions-intro.md

#### Notes

This portion of the presentation introduces the first of many workflows. This workflow is incredibly simple and attempts to demonstrate the very basics of how a workflow executes.

It is advisable to keep it very high-level at this point as there are many more workflow snippets that cover more complex use cases as you progress through the presentation.

### 01.1_actions-about.md

#### Purpose

This portion introduces us to the first of many case studies surrounding GitHub Actions. Although it may seem a bit early to introduce a case study, the purpose of this examination is not to dive deep into actions. Rather, this case study exists at this point because Coletiv used workflows that were **not overly complex** to reach their desired end state.

This was also Coletiv's first attempt at integrating GitHub Actions into their software development life cycle.

#### Notes

Although we will ideally keep things relatively high level at this point in the training, the two workflows presented in this case study do offer the facilitator the ability to go into more detail if the attendees of this offering have some experience with GitHub Actions.

A nice thing to highlight here is the variety of techniques used for a given step in their workflows. For example, some steps use `run` commands, others use public actions from the community and the remaining use the actions that are maintained by GitHub.

#### Questions

If the discussion at the end of the case study does not yield the desired results, here are some ideas to help create a better experience:

1. Consider adding discussion around these keys in the yaml file:

- env
- if
- with

2. Be advised that you may be asked about the differences between `with` and `env` while covering this case study, you can elaborate here or you can defer to a section that will cover those keywords later.

3. You could potentially discuss how the branch filtering and step logic are working together, again that is covered a bit later.

4. You can also point the attendees to the actual article to look through that as well, there are some pictures of the output and intermediate workflow files they worked with.

### 01.2_actions-pricing.md

#### Purpose

This slide exists to show the pricing model.

#### Notes

We think it's best to not only talk about pricing here, but also to help define what counts as "usage".

A major point to make here, is that under the **free** tier the pricing and usage limits apply to **private repos** and not their **public repos**.

### 01.3_actions-starter-workflows.md

#### Purpose

Getting started with GitHub Actions is easy. There are templates to help you get going.

#### Notes

This is a really good opportunity to break from the presentation and go explore a few of these starter workflows in the actions tab of a repository.

### 01.4_actions-hello.md

#### Purpose

This exercise will take the course to Learning Lab to get a little hands on experience with writing a really basic "hello world" for workflows.

#### Notes

As a facilitator, you should familiarize yourself with each of these courses so you can answer questions and troubleshoot the course if need be.

We recommend guiding the attendees through these courses by doing it alongside of them and having them keep pace with you as you progress through the lab.

**Changes to Learning Lab and the courses within it, especially those which utilize actions, happen frequently. Please go through the Learning Path with a fresh registration before every delivery to ensure there are no breaking changes.**

If you do notice a breaking change contact the `services-programs` team by opening an issue in the [services repo](https://github.com/github/services) using the `Programs: Request Help` issue template.

---

## Creating Workflows

### 02.1_actions-ecosystem.md

#### Purpose

The overarching purpose of this section is to get the attendees very comfortable with writing workflow files.

#### Notes

This section contains as series of diagrams made with `Mermaid.js`. The digram in this file should read like this:

- Events trigger workflows
- Workflows contain jobs
- Jobs are what are responsible for execution of actions
- During, and after, action execution status reports about the workflow run are generated.

The arrows don't label well with `docsify` and `Mermaid.js` but are intended to be a cause and effect sort of relationship.

### 02.2 through 02.5

#### Purpose

I wanted to really dive into the keywords in the workflow syntax and spend some time explaining all of the options each bring to the table.

You will find supporting workflow snippets that show how to implement these keywords and their options.

#### Notes

Again, these diagrams are designed to show at which phase in a workflow life cycle the current component exists. I have also expanded all of the properties for a given component to help highlight the options available to those writing workflow files.

### 02.6_reporting.md

#### Purpose

Since we don't interact with logs directly, I felt it necessary to add screenshot on what these may look like.

#### Notes

A really good use of this section would be to leave the presentation and go explore the logs in some public repositories.

Here are a few repos that utilize actions that you can explore the logs of:

[Pandas Python Library](https://github.com/pandas-dev/pandas/actions)
[Go Cobra Module](https://github.com/spf13/cobra/actions)
[NumPy Python Library](https://github.com/numpy/numpy/actions)
[Commander.js](https://github.com/tj/commander.js/actions)
[Free Code Camp](https://github.com/freeCodeCamp/freeCodeCamp/actions)

Consider tracing back the logs to identify the exact event that triggered the workflow. Be sure to look at both failed and successful workflows for a complete experience.

---

## Continuous Deliver/Deployment

### 04.5_cd-learning-path.md

#### Purpose

Guide attendees through the specified courses in the Learning Path.

#### Notes

This path contains courses to deploy to Azure and AWS. Both of which require initial setup, such as having Azure and AWS accounts.

You should at a minimum demo at least one of these courses if the attendees do not have the ability to create accounts on their own.

You could, if you and the attendees want to, cover both of these courses. Even though the application in these courses is the same, the deployment method varies.

- AWS deploys a Node.js app in a serverless fashion
- Azure deploys a Docker container with the same Node.js app inside of it

Both have extra workflow examples if you'd like more material to talk through.

---

## Action Overview

### 05.5_actions-runner-env.md

#### Purpose

It is important that developers/users are aware of the runner nuances. This sections hopes to introduce more information about a runner and establish best practices in using what is already provide by the runner rather than rolling your own solution.

#### Notes

This section is a perfect spot to explore the environment variables within each runner.

Some variables that are worth talking about are:

- `GITHUB_ACTOR`
- `GITHUB_REF`
- `GITHUB_EVENT_NAME`

It is also worthwhile to talk about how these variables work alongside as well as differ from the `github context` as there is a fair amount of naming overlap.

The way Docker behaves in a runner is also something that should be discussed here. One point of contention that shows up in a lot of issues is that GitHub Actions overwrites the `workdir` when it spawns the Docker container. **There does not seem to be a way to change this behavior** as such, every containers working directory will be `/github/workspace/` and that makes working with Docker a bit challenging.

A ton of software comes packed into these runners as well, so much that it doesn't make sense to include it in the presentation. This would be the perfect area to open the help docs and explore some of the available pieces of software so that the attendees have an idea of what exists.

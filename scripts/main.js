const { throttling } = require("@octokit/plugin-throttling");
const { retry } = require("@octokit/plugin-retry");
const { Octokit } = require("@octokit/rest");
const git = require("@npmcli/git");
const fs = require("fs");
const MyOctokit = Octokit.plugin(throttling).plugin(retry);

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

let main = async () => {
    const argv = require("yargs")
        .option("token", {
            alias: "t",
            description: "personal access token with which to authenticate",
            global: true,
            demandOption: true,
        })
        .option("org", {
            alias: "o",
            description: "Org to add the new repos",
            global: true,
            demandOption: true,
        })
        .option("template", {
            alias: "p",
            description:
                "Template repository that we will create for each user",
            demandOption: true,
            global: true,
        })
        .option("file", {
            alias: "f",
            description: "json file with users",
            global: true,
            demandOption: true,
        })
        .option("verbose", {
            alias: "v",
            description: "Print logs for debugging",
            global: true,
        }).argv;

    const client = new MyOctokit({
        auth: `token ${argv.token}`,
        throttle: {
            onRateLimit: (retryAfter, options) => {
                console.warn(
                    `Request quota exhausted for request ${options.method} ${options.url}`
                );
                console.warn(
                    `Retrying after ${retryAfter} seconds! Retry Count: ${options.request.retryCount}`
                );
                return true;
            },
            onAbuseLimit: (retryAfter, options) => {
                console.warn(
                    `Abuse detected for request ${options.method} ${options.url}`
                );
                return true;
            },
        },
    });

    const log = (action, result) => {
        if (argv.verbose) {
            console.log(`${action}: ${result}`);
        }
    };

    const users = JSON.parse(
        fs.readFileSync(argv.file, { encoding: "utf8", flag: "r" })
    );
    // Get each user
    for (let user of users) {
        const repoName = `${argv.template.split("/")[1]}-${user}`;
        try {
            // Bare Clone of "template"
            let result = await git.spawn([
                "clone",
                "--bare",
                `https://${argv.token}@github.com/${argv.template}.git`,
            ]);
            log("Cloning template", JSON.stringify(result));

            // Create repo in org
            result = await client.repos.createInOrg({
                org: argv.org,
                name: repoName,
            });

            log("Creating user repo", JSON.stringify(result));

            // Push mirror?
            result = await git.spawn(
                [
                    "push",
                    "--mirror",
                    `https://${argv.token}@github.com/${argv.org}/${
                        argv.template.split("/")[1]
                    }-${user}`,
                ],
                {
                    cwd: `${argv.template.split("/")[1]}.git`,
                }
            );
            log("Pushing template to new repo", JSON.stringify(result));

            result = await client.repos.addCollaborator({
                owner: argv.org,
                repo: repoName,
                username: user,
                permission: "admin",
            });
            log("Adding user as collaborator", JSON.stringify(result));

            result = await client.repos.createPagesSite({
                owner: argv.org,
                repo: repoName,
                source: { branch: "main", path: "/docs" },
            });
            log("Enabling pages site", JSON.stringify(result));

            result = await client.repos.update({
                owner: argv.org,
                repo: repoName,
                description: result.data.html_url,
            });
            log(
                "Updating description to show the pages URL",
                JSON.stringify(result)
            );
        } catch (e) {
            console.error(e);
            client.repos.delete({ org: argv.org, name: repoName });
        } finally {
            fs.rmdirSync(`${argv.template.split("/")[1]}.git`, {
                recursive: true,
            });
        }
    }
};

main();

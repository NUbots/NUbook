# NUbook

## Getting started

1. Clone repo and `cd` into the cloned directory

```sh
git clone https://github.com/NUbots/NUbook.git
cd NUbook
```

2. Install dependencies

```sh
yarn
```

3. Run the Gatsby development server

```sh
yarn dev
```

4. Preview the site by visiting [localhost:8000](http://localhost:8000) in a browser

## Adding content

## Deploying

> **Note:** deploys should only be run from `master`, after changes have been reviewed and merged in. Don't run deploys for your work in progress!

To deploy, run:

```sh
yarn deploy
```

Running a deploy does the following:

- Lint the code for formatting and other issues. The deploy will be aborted if an issue is found.
- Clean Gatsby's `.cache` and `public` folders and run a fresh build
- Copy the built artifacts from the `public` folder into the `gh-pages` branch
- Commit and push the changes, triggering an automatic deploy to live site on Github Pages

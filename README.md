# NUbook

NUbook is the handbook and high-level documentation for the NUbots team. You can read the latest version at https://nubots.github.io/NUbook/.

Read on if you want to add or update content.

## Getting started

You'll need [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed. Get those first, then:

1. Clone this repo and `cd` into the cloned directory

```sh
git clone https://github.com/NUbots/NUbook.git
cd NUbook
```

2. Install dependencies

```sh
yarn
```

3. Run the [Gatsby](https://www.gatsbyjs.org/) development server

```sh
yarn dev
```

4. Preview the site by visiting [localhost:8000](http://localhost:8000) in a browser

## Contributing content

All additions and edits are done through GitHub pull requests. To add or edit content:

1. Clone the repo, install dependencies, and run the development server as shown in [Getting started](#getting-started) above.
2. Create a new branch for your changes, in the format `your_last_name/short_description_of_change`:

```sh
git checkout -b paye/add_2019_debrief
```

3. Make your changes by adding or editing MDX files in [`src/book/`](src/book/). See below for how to write and organise pages.
4. Preview your changes by visiting [localhost:8000](http://localhost:8000) in a browser.
5. Commit and push your changes to GitHub.
6. Go to the repo on GitHub and create a pull request for your branch. Your pull request will be reviewed, merged, and deployed to the live site.

## Writing Markdown

NUbook content is written using [MDX](https://mdxjs.com/), an extension of [Markdown](https://daringfireball.net/projects/markdown/) with support for dynamic content via [JSX](https://reactjs.org/docs/introducing-jsx.html) and [React](https://reactjs.org/) components. Markdown provides a minimal syntax for writing and styling text content.

GitHub has [a good guide](https://guides.github.com/features/mastering-markdown/) for getting started with Markdown. There's also [this short video series](https://www.youtube.com/playlist?list=PLu8EoSxDXHP7v7K5nZSMo9XWidbJ_Bns3) if you prefer watching.

### Adding images

- Add image files in the [`src/images/`](src/images/) directory
- Reference images in Markdown:

```md
![Image caption](../images/image.png)
```

### Adding syntax-highlighted code blocks

Use triple backticks ` ``` ` on separate lines to open and close code blocks. Specify the language with a file extension after the opening backticks for syntax highlighting.

Example C++ code block:

````md
```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!";
    return 0;
}
```
````

### Adding math symbols and equations

- For inline math, wrap TeX-formatted content with a `$`:

```md
The equation is $c^2 = a^2 + b^2$.
```

- For math blocks, wrap with `$$` on separate lines:

```md
$$
e^{i\phi} = \cos(\phi) + i\sin(\phi)
$$
```

NUbook uses [KaTeX](https://katex.org/) to render math. See https://katex.org/docs/support_table.html for supported symbols and functions.

## Organising pages

Pages are written in MDX files in the [`src/book/`](src/book/) directory, and organised as follows:

- Each page's filename is numbered to create the order that will be used for menus and the previous/next page navigation links.
- Each page has "frontmatter" at the top of the file specifying details such as title and description:

```md
---
chapter: Introduction
title: Introduction to NUbots
description: Learn about what we do, key people, and where to find the lab.
slug: /
---
```

- The frontmatter is written in [YAML](https://gettaurus.org/docs/YAMLTutorial/), with the following supported fields:

| Field         | Type    | Presence | Description                                                                 |
| ------------- | ------- | -------- | --------------------------------------------------------------------------- |
| `chapter`     | String  | Required | The section the page will appear under in the sidebar menu (case sensitive) |
| `title`       | String  | Required | The page title                                                              |
| `description` | String  | Required | A short, one-sentence description of the page content                       |
| `slug`        | String  | Required | The page URL relative to the root of the site, starting with `/`            |
| `keywords`    | List    | Optional | Keywords for the page content, used for SEO                                 |
| `hidden`      | Boolean | Optional | When `true`, removes the page from menus and disables search indexing       |

## Formatting code

All code in NUbook (including Markdown) is formatted using [Prettier](https://prettier.io/) for a consistent style.

This style will be checked automatically when you push code to the repo. If there are any issues, the push will be aborted with an error message listing the files that have issues.

If you need to, you can:

- check formatting by running `yarn format:check`.
- automatically fix formatting issues by running `yarn format`.

## Deploying

> **Note:** deploys can only be run from `master`, after changes have been reviewed and merged via a pull request.

To deploy, run:

```sh
yarn deploy
```

Deploying does the following:

- Verifies that the current Git branch is `master`.
- Lints the code for formatting and other issues. The deploy will be aborted with an error if any issues are found.
- Cleans Gatsby's `.cache` and `public` folders and runs a fresh build.
- Copies the built artefacts from the `public` folder into the `gh-pages` branch.
- Commits and pushes the changes, triggering an automatic deploy to the live site on GitHub Pages.

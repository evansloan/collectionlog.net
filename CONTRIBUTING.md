# Contributing

## Project setup
1. Install the [Yarn package manager](https://classic.yarnpkg.com/lang/en/docs/install/)
2. Clone the repository `git clone https://github.com/evansloan/collectionlog.net && cd collectionlog.net`
3. Install dependencies `yarn install`
4. Run the project `yarn start`

## Code style/standards
* ESLint is configured to try to keep things in a uniform style. Before committing or submitting a PR, make sure to run `yarn run lint` and `yarn run lint:fix` to catch and correct any style issues.
* If using VSCode, the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) is highly recommended. It will show any style inconsistencies as errors to make them easier to find/fix.

## Branching
* When creating a new branch, you'll most likely want to branch from the `master` branch. `master` holds the source code for the site in it's current live state.
* Prefix branch names with a name that fits the scope in which you are contributing. 
  * Fixing a bug? `bug/branch-name`
  * Adding a new feature? `feature/branch-name`
* Try to keep your branch up to date by rebasing your branch with master (`git rebase master`) to limit possible merge conflicts.

## Submitting Pull Requests

1. Give your pull requests a decent title that gives a general idea of what your PR is accomplishing, e.g.: `Adds the ability to ...`, `Fixes bug preventing ...`
2. Try to be as descriptive as possible in the description as to what your PR is accomplishing.
3. If your PR fixes any open issues, make sure to include `Closes #[ISSUE_NUMBER]` in the description of your PR

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

## Unit Testing
When creating new components or change existing functionality of components it is important to ensure that the component still works after the changes. Unit tests are created alongside the existing component files to keep them together. Snapshots will be (automatically) created in a `__snapshots__` directory.

### Executing all tests locally
To locally execute tests, open a terminal and run the following command:
```bash
yarn test
```

This will activate watch mode, allowing tests to be quickly rerun as changes are made. To execute all tests at once, press 'a'.

### Updating snapshots
If a component is modified, the corresponding snapshots must also be updated to reflect these changes. After making modifications, open a terminal and run the following command: 
```bash
yarn test
```
This will activate watch mode, to update snapshots, press 'u'. This will replace the old snapshot with a new one that reflects the modifications made. After this, tests can be rerun to confirm that everything is functioning as intended.
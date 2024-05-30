## Make sure you have

- [Node.js](https://nodejs.org/en/download)
- [git](https://git-scm.com/downloads)
- [prettier](https://www.humankode.com/javascript/set-up-prettier-and-vs-code-to-format-your-code/)

## How to clone:

- Create directory.
- Open the directory in VSCode.
- Go to the repository in GitHub.
- Go to `Code`.
- Under the `HTTPS` - copy the URL.
- Open terminal in your open VSCode.
- Enter `git clone [the URL]`.
- Go over the directory the was created (`cd hike-with-me-server`).
- Run `npm i`.
- For checking - [activate the server](#how-to-activate-the-server) and see if it returns `Express server running at http://localhost:3000/`

## How to use git in VSCode

- https://code.visualstudio.com/docs/sourcecontrol/overview
- https://www.youtube.com/watch?v=z5jZ9lrSpqk&ab_channel=MaxonTech

## Creating new branch

`git checkout -b [branch_name]`

## Moving to another branch

`git checkout [branch_name]`

## How to Push in terminal

After making a change -

- `git status` - need to see all the files with the changes in red.
- `git add --all` - for adding all the changes to the commit (instead of `--all` - can specify the files you want).
- `git status` - need to see all the files with the changes that you want to push in green.
- `git commit -am "[the_commit_message]"` - creating the commit.
- `git push --set-upstream origin [branch_name]` or `git push --set-upstream` and click on the available blue button in the Source Control tab - doing push (after the first push in branch that is not main, you can simply do `git push` in the nexts pushes).

## How to Merge the changes in the branch to origin main

- Getting into the repo in GitHub.
- Going to `Pull requests`.
- Entering for the PR and creating him.
- Clicking on the green Merge button when available.

## How to Merge new changes into local main from origin main

- Checkout to main - `git checkout main`.
- Pulling from origin main - `git pull origin main`.
- In the Source Control tab in VSCode - clicking on the Synchronize blue button.
- `npm i`.

## How to merge main into existing branch

- If you made changes on the branch - `git stash`.
- [Merge new changes into local main](#how-to-merge-new-changes-into-local-main-from-origin-main).
- [Go to your branch](#moving-to-another-branch).
- `git merge main`.
- If you had changes before the merge - `git stash pop`.
- Deal with conflicts if any.

## Start Work Routine

- Two situations:
  - If you don't have existing branch - [merge new changes into your local main](#how-to-merge-new-changes-into-local-main-from-origin-main).
  - If you have existing branch with changes - [merge main into existing branch](#how-to-merge-main-into-existing-branch).

## How to activate the server

In terminal - `node server.js` or [`nodemon server.js`](#how-to-activate-nodemon) (if activated nodemon).

## How to activate nodemon

https://www.youtube.com/watch?v=ZIbAtxPq5_I&ab_channel=SherlockZz

## How to undo commits

- `git reset HEAD~[number_of_commits] --soft` - for undoing the commits.
- `git reset HEAD~[number_of_commits] --hard` - for undoing the commits and the changes (deleting it all).

## Handle the README

https://github.com/fefong/markdown_readme

## .gitignore

Last Update - 30/5/24, 19:55
## ץעןאןעמםרק

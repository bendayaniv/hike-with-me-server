## Make sure you have on your computer

- Node.js
- npm
- git

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

https://code.visualstudio.com/docs/sourcecontrol/overview
https://www.youtube.com/watch?v=z5jZ9lrSpqk&ab_channel=MaxonTech

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
- `git push --set-upstream origin [branch_name]` or `git push --set-upstream` and click on the available blue button in the Source Control tab - doing push.

## How to Merge the changes in the branch to origin main

- Getting into the repo in GitHub.
- Going to `Pull requests`.
- Entering for the PR and creating him.
- Clicking on the green Merge button when available.

## How to Merge new changes into local main from origin main

- [Creating new branch](#creating-new-branch) and [move to him](#moving-to-another-branch).
- [Create the change, commit and push](#how-to-push-in-terminal).
- [Merge the changes](#how-to-merge-after-doing-changes-in-branch).
- Checkout to main - `git checkout main`.
- Pulling from origin main - `git pull origin main`.
- In the Source Control tab in VSCode - clicking on the Synchronize blue button.

## Work Routine

- Get to the main branch.
- `git pull origin main`.
- `npm i`.
- Go to your branch.
- Here you have to situations:
  - If you do'nt have changes before commit - do `git merge main`.
  - If you do have changes before commit - first need to do `git stash`, then `git merge main`, and then `git stash pop`.
- Deal with conflicts if any.

## How to activate the server

In terminal - `node server.js` or `nodemon server.js` (if activated nodemon).

## How to activate nodemon

https://www.youtube.com/watch?v=ZIbAtxPq5_I&ab_channel=SherlockZz

## Handle the README

https://github.com/fefong/markdown_readme

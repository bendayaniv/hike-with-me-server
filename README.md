## Make sure you have on your computer
1. Node.js
2. npm
3. git

## How to clone:
1. Create directory.
2. Open the directory in VSCode.
3. Go to the repository in GitHub.
4. Go to `Code`.
5. Under the `HTTPS` - copy the URL.
6. Open terminal in your open VSCode.
7. Enter `git clone [the URL]`.
8. Go over the directory the was created (`cd hike-with-me-server`).
9. Run `npm i`.
10. For checking - run the command `node server.js` and see if it returns `Express server running at http://localhost:3000/`

## How to use git in VSCode
https://www.youtube.com/watch?v=i_23KUAEtUM&t=69s&ab_channel=VisualStudioCode

## How to Push in terminal
After making a change - 
1. `git status` - need to see all the files with the changes in red.
2. `git add --all` - for adding all the changes to the commit (instead of `--all` - can specify the files you want).
3. `git status` - need to see all the files with the changes that you want to push in green.
4. `git commit -am "[the_commit_message]"` - creating the commit.
5. `git push --set-upstream` - doing push

## How to merge after doing changes in branch
1. Getting into the repo in GitHub.
2. Going to `Pull requests`.
3. Entering for the PR and creating him.
4. Clicking on the greem Merge button when available.

## Merge new changes into local main from remote main
1. Creating new branch (`git checkout -b [branch_name]`).
2. [Create the change, commit and push.](##how-to-push-in-terminal)
3. [Merge the changes.](##how-to-merge-after-doing-changes-in-branch)
4. Checkout to main - `git checkout main`.
5. Pulling from origin main - `git pull origin main`.
6. In the Source Control tab in VSCode - clicking on the synchronize blue button.

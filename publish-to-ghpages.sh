
#!/bin/sh

if [ "`git status -s`" ]
then
	echo "The working directory is dirty. Please commit any pending changes."
	exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out publishing branch into public"
git worktree add -B master public origin/master

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
../hugo

echo "Updating publish branch (for you it's master)"
cd public && git add --all && git commit -m "Publish updates"

echo "Pushing to GitHub"
git push --all


# Spotify Sleep Cycle

## Steps to Run
1) `git clone` this repo
2) `npm install`
3) `npm run ios`

## Technologies
- React Native
- Expo
- Eslint

## Branches
- A production ready build will be hosted from the `production` branch. Once `production` is ready to be updated to the latest `master`, merge `master` to `production`
- A working development build of the app will be hosted from the `master` branch.
- Any new developments should be kept on a feature branch until in working order

### Steps for creating new feature branches
1) Ensure you are on the `master` branch
2) `git pull`
3) `git checkout -b *name-of-branch*` (You are now on the feature branch)

### Steps for merging feature branches to `master`
1) Ensure you are on the master branch
2) `git pull`
3) `git checkout *name-of-branch*`
4) `git merge master` and resolve if any conflicts
5) `git push`
6) Create a Pull Request in Github

## Eslint
Be sure your code is in line with eslint before adding new features
1) From the root directory `eslint .` will tell you of any style warnings/errors
2) From the root directory `eslint . --fix` will automatically resolve most/all warnings/errors
# Engenius Email Signature Generator

A simple React application to generate email signatures for [Engenius](https://engeniusweb.com/).

## Current Stack Organization

- React
- [GitHub](https://github.com/engeniusweb/engeniusweb.github.io) (source code)
- [GitHub Pages](https://engeniusweb.github.io/) (deployment)

## Local Development

- Clone this repository (`git clone https://github.com/engeniusweb/engeniusweb.github.io.git`).
- Install `node`/`npm` and be sure to use `node` >= 16.x.
- Run `npm install` from the repository on your computer to install the required dependencies/libraries.
- Run `npm run dev` to spin up a development server, and navigate to the link it provides.

## Adding/Updating Users

Navigate to [users.json](https://github.com/engeniusweb/engeniusweb.github.io/blob/master/src/users.json) and create/modify any user information you need. Each user requires 3 fields to function:

- `name`: The user's full name.
- `username`: The user's "username", which is also the beginning of their email (e.g. `arianna` -> `arianna@engeniusweb.com`).
- `title`: The user's title at the company.

## Committing Changes

After you've made any necessary changes to the files on your local machine, run the following commands to add the files and deploy them.

- `git add .`
- `git commit -m "<example message>"`
- `git push`

GitHub CI/CD has been set up, so whenever you push any changes, they will go live within minutes assuming nothing goes wrong with the build.

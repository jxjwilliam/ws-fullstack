bin: db connect/init/back scripts, init projects
etc: drawio, general usage/config: docker, travis, netlify,

### monorepo, lerna + yarn workspace

### eslint + prettier + airbnb

### husky + lint-staged + commitizen

### pm2, nodemon, rimraf, run-all

### env, cross-env

### mocha + chai

### markdown

## Client

### material-ui

### react-router-dom

### react-hook-form

### react-icons (svg)

### react-table (table, filter, sort)

### proxy-middleware

## Gateway

## RDBMS

## NoSQL

## Redis

## GraphQL

## Auth

### fetch options default setting

- needAuth: false
- isProxy: false
- isUpload: false

| Fetch Options                         | default                           | Annotation                |
| ------------------------------------- | --------------------------------- | ------------------------- |
| `local` auth access                   | `default`                         | login, register           |
| `local` microservices api/rest access | `needAuth`=true                   | ms-access                 |
| `local` static contetns access        | `needdAuth`=true, `isUpload`=true | file-upload               |
| cloud/saas access                     | `isProxy`=true                    | 3rd api: sms, public-apis |

## Nginx, Docker

## Q / A

### 1. jest

Issue: `jest` test cases work in command-line, but not in VSCode
Resolve: By default, VS Code auto start `jest`. To disable it:

- Preferences -> settings
- search `jest`
- uncheck `Automatically start jest for this project`
- run `yarn test` manually in command-line

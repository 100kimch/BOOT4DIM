# DevNotes

## Installation

### scss

```bash
npm install --save-dev sass-loader node-sass
```

### AWS Amplify

see ![this page.](https://aws-amplify.github.io/docs/)

```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Build Methods on AWS Amplify

```bash
version: 0.1
frontend:
  phases:
    # IMPORTANT - Please verify your build commands
    build:
      commands: [
          'cd web',
          'npm install -g vue-cli',
          'npm install -g quasar-cli',
          'npm install',
          'quasar build -m pwa'
          ]
  artifacts:
    # IMPORTANT - Please verify your build output directory
    baseDirectory: /web/dist/pwa-mat
    files:
      - '**/*'
  cache:
    paths: []
```

### Codegen for GraphQL Schema

```bash
amplify codegen
amplify push
```

## To-dos

1. connect Project - Request Model.
1. id verification on projectNew

## Comments

### friendlyName Plugin

- [과일이름, 야채, 채소이름](https://soonsin.com/376)
- [분류:한국어 음식](https://ko.wiktionary.org/w/index.php?title=분류:한국어_음식)

## Trouble Shoots

### git

#### Git merge local repositories with remote

```bash
git merge origin/master --allow-unrelated-histories
git commit -m "Initialization"
git push --set-upstream origin master
```

### local

---

#### Vue command not found

```bash
# place at ~/.zshrc
export PATH=$PATH:/Users/KJH/.npm-global/bin
```

#### v-for elements not updated

```javascript
// content.isModifying = !content.isModifying
this.$set(content, "isModifying", !content.isModifying);
```

### quasar

#### Error: Cannot find module 'webpack-merge'

```bash
npm i -D webpack-merge
```

#### Error in ./src/aws-exports.js

- JSlint Problem. Set grammar as JSlint hints or edit .eslintignore

### Vue

#### Creating a global event bus

![See this page](http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components/)

### How to import an external library on Vue

![See this page](https://forum.quasar-framework.org/topic/734/how-to-load-external-dependencies-cdn-async/2)

### Handling Static Assets

![See this page](http://vuejs-templates.github.io/webpack/static.html)

### Amplify GraphQL Client

#### Important

![See This](https://github.com/aws-amplify/amplify-cli/issues/82)

- '@connection' and '@searchable' should be done at last! (once push them, cannot modify the schema again!)

#### when editing

- Should amplify codegen add with typescript

### GraphQL

#### remake codegen

1. delete .graphqlconfig.yml
1. type this:

```bash
amplify codegen add
```

#### GraphQL schema file should contain a valid GraphQL introspection query result

![see this page](https://github.com/aws-amplify/amplify-cli/issues/159)

> > Did you make a change to your schema.graphql and did not do a amplify push?
> > Codegen uses the introspection schema and not the schema.graphql. So if you make any changes to your schmea.graphql please use the following workflow
> > Push your changes using amplify push
> > Make sure the code gen is using the latest introspection schema by forcing it to download it by running amplify codegen generate --download

```bash
amplify push
amplify codegen generate --download
```

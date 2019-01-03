# DevNotes

## Installation

### scss

``` bash
npm install --save-dev sass-loader node-sass
```

### AWS Amplify

see ![this page.](https://aws-amplify.github.io/docs/)

``` bash
npm install -g @aws-amplify/cli
amplify configure
```

## Trouble Shoots

### git

#### Git merge local repositories with remote

``` bash
git merge origin/master --allow-unrelated-histories
git commit -m "Initialization"
git push --set-upstream origin master
```

### local

#### Vue command not found

``` bash
# place at ~/.zshrc
export PATH=$PATH:/Users/KJH/.npm-global/bin
```

### quasar

#### Error: Cannot find module 'webpack-merge'

``` bash
npm i -D webpack-merge
```

### Vue

#### Creating a global event bus

![See this page](http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components/)

### How to import an external library on Vue

![See this page](https://forum.quasar-framework.org/topic/734/how-to-load-external-dependencies-cdn-async/2)

### Handling Static Assets

![See this page](http://vuejs-templates.github.io/webpack/static.html)

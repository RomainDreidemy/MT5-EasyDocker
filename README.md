# VSCode Webview React

This project was bootstrapped with 
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Create React App TypeScript](https://github.com/wmonk/create-react-app-typescript)
* [VSCode Extension Webview Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/webview-sample)

[The webview API](https://code.visualstudio.com/docs/extensions/webview) allows extensions to create customizable views within VSCode. Single Page Application frameworks are perfect fit for this use case. However, to make modern JavaScript frameworks/toolchains appeal to VSCode webview API's [security best practices](https://code.visualstudio.com/docs/extensions/webview#_security) requires some knowledge of both the bundling framework you are using and how VSCode secures webview. This project aims to provide an out-of-box starter kit for Create React App and TypeScript in VSCode's webview.

## Development

Run following commands in the terminal

```shell
yarn install --ignore-engines
yarn run build
```
And then press F5, in Extension Development Host session, run `Start React Webview` command from command palette.

### Docker

If you don't want to install nodejs and yarn, you can use docker to build the project.

```shell
make up # start docker container
make install # install yarn dependencies
make watch # watch file changes and build
```

If you want to kill your docker container, run `make down`.

# Production

## Build api Docker image

```shell
docker build -t easydocker/api -f ./api/Dockerfile ./api
```

## Build front Docker image

```shell
docker build --tag easydocker/front \
  --build-arg VITE_API_URL=<API_URL> \
  -f front/Dockerfile.prod ./front
```

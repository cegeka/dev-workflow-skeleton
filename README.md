# Components
This branch contains an example setup for an Angular 1.5 frontend application. It makes extensive use of the `component` method instead of using directives and controllers. This way it should be easier to later on upgrade to Angular 2. Checkout `src/app/home` for an example.

## Tools Used
* NodeJS: environment to execute the gulp build 
* npm: node package manager to install gulp and helper libraries   
* Gulp: building the application, including transpiling ES6 -> ES5
* Bower: frontend dependencies
* ESLint
* Karma + Jasmine for testing
* BrowserSync to locally serve the application
* Angular 1.5
* Bootstrap + Angular Bootstrap
* ui-router
* $resource for doing REST calls
* SystemJS for module loading
 
## Run It
* Install NodeJS + npm
* Run `npm install`
    * Will install all npm and bower dependencies
    * When an error occurs on windows mentioning `node-gyp` check out this [link](https://github.com/nodejs/node-gyp/issues/629#issuecomment-153196245)
* Run `npm run build` to build the application
* Run `npm run dev` to start the application locally

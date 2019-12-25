# Spring Boot API with React+Typescript UI

 
This example app shows how to create a Spring Boot API and display its data with a React UI and also deploy it on Docker by maven plugin.

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Node.js](https://nodejs.org/).



## Getting Started

To install this example application, run the following commands:

**1-Create a spring boot application from https://start.spring.io**

**2-Create React.js and Typescript by below cli command in linux or mac os :**

```bash
npx create-react-app my-app --template typescript
# or
yarn create react-app my-app --template typescript
```
After creating react.js project move root folder of react.js into main folder in spring project.

**3-For integrating `React.js with Spring boot` you can follow below instruction:**

#### Client Configuration

a- go to Cli and cd into to root folder of react and install `rimraf` library by following command:
 
```bash
npm install --save @types/rimraf
```
b- install `mkdirp` with:
 
```bash
npm install --save mkdirp
```

c-install `copyfiles` with:

```bash
npm install --save copyfiles
```

d- insert folllow commands in `package.json` inside `scripts` tag:

```bash
"postbuild": "npm run deploy",
 
"predeploy": "rimraf ../resources/static/ && mkdirp ../resources/static/",
     
"deploy": "copyfiles -f build/** ../resources/static/ && copyfiles -f build/static/js/** ../resources/static/static/js/ && copyfiles -f build/static/css/** ../resources/static/static/css/ && copyfiles -f build/static/media/** ../resources/static/static/media/"
```

e-install `copyfiles` with: 

```bash
npm install --save http-proxy-middleware
```
after that cd into react project and create .js file and then pate below code for wiring port of react with spring boot port:

```typescript
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:8081',
            changeOrigin: true
        })
    );
    app.use(
        '/authenticate',
        proxy({
            target: 'http://localhost:8081',
            changeOrigin: true
        })
    );
};
```



#### Server Configuration

It will complete it in near future...

Really apologize for that...



## Links

This example uses the following libraries and frameworks:

* [JAVA 8](https://www.oracle.com/technetwork/java/javase/overview/java8-2100321.html)
* [Spring Boot](https://start.spring.io)
* [Spring Security + JWT Token](https://dzone.com/articles/spring-boot-security-json-web-tokenjwt-hello-world)
* [Spring AOP](https://docs.spring.io/spring/docs/2.5.x/reference/aop.html)
* [Docker](https://www.docker.com/)
* [JUnit + Spring Boot Test](https://spring.io/guides/gs/testing-web/)
* [JACOCO test code coverage](https://www.eclemma.org/jacoco)
* [H2 Database](https://www.h2database.com/html/main.html)
* [Liquibase](https://www.liquibase.org/documentation/spring.html)
* [React.js + TypeScript](https://create-react-app.dev/docs/adding-typescript/)
* [Redux-React](https://react-redux.js.org/)

## Open for new opportunities

 see my [LinkedIn profile](https://www.linkedin.com/in/mehdi-najafian/).
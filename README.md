[![Build Status](https://travis-ci.org/hisptz/action-tracker.svg?branch=master)](https://travis-ci.org/hisptz/action-tracker)
[![dependencies Status](https://david-dm.org/hisptz/action-tracker/status.svg)](https://david-dm.org/hisptz/action-tracker)
[![devDependencies Status](https://david-dm.org/hisptz/action-tracker/dev-status.svg)](https://david-dm.org/hisptz/action-tracker?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/dbe97dbdfbd55344c38f/maintainability)](https://codeclimate.com/github/hisptz/action-tracker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dbe97dbdfbd55344c38f/test_coverage)](https://codeclimate.com/github/hisptz/action-tracker/test_coverage)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Greenkeeper badge](https://badges.greenkeeper.io/hisptz/action-tracker.svg)](https://greenkeeper.io/)

# Action Tracker App

The action tracker is a management tool that helps improve effective coverage of priority interventions at district and community level, covering various intervention such as maternal, newborn, and child health (MNCH), HIV, and nutrition. This process ensures appropriate equity analysis at the sub-national level with the aim of identifying underserved populations and the specific bottlenecks they face in accessing life-saving healthcare. The action tracker is part of the coverage, and bottleneck analysis that utilizes DHIS2’s analytical features to track and assess national and sub-national level performance for purposes of improving health service delivery.

## Prerequisites

1. [NodeJs (10 or higher)](https://nodejs.org)
2. npm (6.4.0 or higher), can be installed by running `apt install npm`
3. git, can be installed by running `apt install git`

## Setup

Clone repository

```bash
 git clone https://github.com/hisptz/action-tracker.git
```

Navigate to application root folder

```bash
cd action-tracker
```

Install all required dependencies for the app

```bash
npm install
```

## Development server

To start development server

`npm start`

Navigate to [http://localhost:4200](http://localhost:4200).

This command will require proxy-config.json file available in the root of your source code, usually this file has this format

```json
{
  "/api": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  }
}
```

We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Index DB Setup

This app support index DB as based on [dexie library](https://dexie.org/). In order to initiatiate index db then you have to passed index db configuration in forRoot of core module, so in app.module.ts

```ts
........
@NgModule({
  declarations: [AppComponent, ...fromPages.pages],
  imports: [
   ..........
    CoreModule.forRoot({
      namespace: 'iapps',
      version: 1,
      models: {
        users: 'id',
        dataElement: 'id',
        .......
      }
    })
    .......
    ]
    ......
    })
```

where in the models, for example user will be a table "user" and 'id' will be a keyIndex for the table

## Build

To build the project run

`npm run build`

The build artifacts will be stored in the `dist/`, this will include a zip file ready for deploying to any DHIS2 instance.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

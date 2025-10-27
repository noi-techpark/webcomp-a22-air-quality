<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Brennerlec air quality

[![REUSE Compliance](https://github.com/noi-techpark/webcomp-a22-air-quality/actions/workflows/reuse.yml/badge.svg)](https://github.com/noi-techpark/odh-docs/wiki/REUSE#badges)
[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-a22-air-quality)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-a22-air-quality)
[![CI/CD](https://github.com/noi-techpark/webcomp-a22-air-quality/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-a22-air-quality/actions/workflows/main.yml)

A responsive webcomponent for showing travel times on Brennerlec A22 road

- [Brennerlec air quality](#brennerlec-air-quality)
  - [Usage](#usage)
    - [Attributes](#attributes)
      - [language](#language)
      - [layout](#layout)
    - [CSS varialbles](#css-variables)
      - [--color-primary, --color-primary-rgb](#--color-primary---color-primary-rgb)
      - [--color-secondary](#--color-secondary)
      - [--color-tertiary](#--color-tertiary)
      - [--color-text](#--color-text)
      - [--color-background](#--color-background)
      - [--color-footer](#--color-footer)
      - [--map-line-color](#--map-line-color)
      - [--color-air-good](#--color-air-good)
      - [--color-air-good-contrast](#--color-air-good-contrast)
      - [--color-air-fair](#--color-air-fair)
      - [--color-air-fair-contrast](#--color-air-fair-contrast)
      - [--color-air-moderate](#--color-air-moderate)
      - [--color-air-moderate-contrast](#--color-air-moderate-contrast)
      - [--color-air-poor](#--color-air-poor)
      - [--color-air-poor-contrast](#--color-air-poor-contrast)
      - [--color-air-very-poor](#--color-air-very-poor)
      - [--color-air-very-poor-contrast](#--color-air-very-poor-contrast)
      - [--color-air-extremely-poor](#--color-air-extremely-poor)
      - [--color-air-extremely-poor-contrast](#--color-air-extremely-poor-contrast)
      - [--color-air-unknown](#--color-air-unknown)
      - [--scrollbar-color](#--scrollbar-color)
      - [--scrollbar-bg](#--scrollbar-bg)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Source code](#source-code)
    - [Dependencies](#dependencies)
    - [Build](#build)
  - [Tests and linting](#tests-and-linting)
  - [Deployment](#deployment)
  - [Run with docker](#run-with-docker)
    - [Installation](#installation)
    - [Start the docker containers](#start-the-docker-containers)
    - [Publish a new version of your webcomponent](#publish-a-new-version-of-your-webcomponent)
    - [Stop the docker containers](#stop-the-docker-containers)
    - [Delete your webcomponents from the store](#delete-your-webcomponents-from-the-store)
  - [Information](#information)
    - [Support](#support)
    - [Contributing](#contributing)
    - [Documentation](#documentation)
    - [Boilerplate](#boilerplate)
    - [License](#license)

## Usage

Include the web-component JS wile located in `/www` folder

```html
<script type="module" src="./noi-a22-air-quality.js"></script>
```

Define the web component like this:

```html
  <noi-a22-air-quality></noi-a22-air-quality>
```

You may adjust the size and font of the component with regular CSS properties.


### Attributes


#### language

Language.

Type
: string

Default
: browser language or 'en' if the language is not supported

Options
: "en", "it"


#### layout

Layout appearance.
We support three layouts: desktop and mobile.

Type
: string

Default
: 'auto', which means the layout will dynamically adjust to screen size

Options
: "desktop", "mobile", "auto"


### CSS variables

The component supports the following variables to adjust the appearance.
Here is an example of dark mode styles:

```css
noi-a22-air-quality.dark {
  font-family: cursive;
  outline: 1px solid red;

  --color-primary: rgb(224, 224, 224);
  --color-secondary: rgb(224, 224, 224);
  --color-text: #EEE;
  --color-background: #333;

  --map-line-color: #5d8d58;

  --map-filter: grayscale(100%) invert(1);

  --scrollbar-color: #CCC;
  --scrollbar-bg: #333;

  --color-air-good: #36a39c;
  --color-air-good-contrast: #EEE;

  --color-air-fair: #327f6a;
  --color-air-fair-contrast: #EEE;

  --color-air-moderate: #a39c2c;
  --color-air-moderate-contrast: #EEE;

  --color-air-poor: #b237;
  --color-air-poor-contrast: #EEE;

  --color-air-very-poor: #490018;
  --color-air-very-poor-contrast: #EEE;

  --color-air-extremely-poor: #320d34;
  --color-air-extremely-poor-contrast: #EEE;
}

noi-a22-air-quality.dark::part(marker){
  background: #333;

  border: 1px solid currentColor;
  border-radius: 50%;
}
noi-a22-air-quality.dark::part(marker-icon){
  color: currentColor;
}
```


#### --color-primary, --color-primary-rgb

Primary color and it's rgb representation (should correspond to the first value). Default is:
```css
--color-primary: #0068B4;
--color-primary-rgb: 0, 104, 180;
```

#### --color-secondary

Secondary color. Default is:
```css
  -color-secondary: #00A767;
```
#### --color-tertiary

Third color. Default is:
```css
--color-tertiary: #6792AA;
```

#### --color-text

Text color. Default is:
```css
--color-text: #333333;
```

#### --color-background

Background color. Default is:
```css
--color-background: #FFFFFF;
```

#### --color-footer

Footer background color. Default is:
```css
--color-footer: #0068B4;
```

#### --map-line-color

Map line color. Default is:
```css
--map-line-color: #3a9c77;
```

####  --color-air-good

Color for 'good' air quality
```css
--color-air-good: #50f0e6;
```

####  --color-air-good-contrast

Contrast color for 'good' air quality
```css
--color-air-good-contrast: #333333;
```

####  --color-air-fair

Color for 'fair' air quality
```css
--color-air-fair: #50ccaa;
```

####  --color-air-fair-contrast

Contrast color for 'fair' air quality
```css
--color-air-fair-contrast: #EEE;
```

####  --color-air-moderate

Color for 'moderate' air quality
```css
--color-air-moderate: #f0e641;
```

####  --color-air-moderate-contrast

Contrast color for 'moderate' air quality
```css
--color-air-moderate-contrast: #333333;
```

####  --color-air-poor

Color for 'poor' air quality
```css
--color-air-poor: #ff5050;
```

####  --color-air-poor-contrast

Contrast color for 'poor' air quality
```css
--color-air-poor-contrast: #EEE;
```

####  --color-air-very-poor

Color for 'very poor' air quality
```css
--color-air-very-poor: #960032;
```

####  --color-air-very-poor-contrast

Contrast color for 'very poor' air quality
```css
--color-air-very-poor-contrast: #EEE;
```

####  --color-air-extremely-poor

Color for 'extremely poor' air quality
```css
--color-air-extremely-poor: #7d2181;
```

####  --color-air-extremely-poor-contrast

Contrast color for 'extremely poor' air quality
```css
--color-air-extremely-poor-contrast: #EEE;
```

#### --color-air-unknown

Color for unknown/missing air quality. Default is:

```css
--color-air-unknown: #A1A1A1;
```

#### --scrollbar-color

Scrollbar thumb color. Default is:

```css
--scrollbar-color: initial;
```

#### --scrollbar-bg

Scrollbar background color. Default is:

```css
--scrollbar-bg: initial;
```


## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 20 / NPM 10

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/webcomp-a22-air-quality.git
```

Change directory:

```bash
cd webcomp-a22-air-quality/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:8998](http://localhost:8998).

## Tests and linting

The tests and the linting can be executed with the following commands:

```bash
npm run test
npm run lint
```

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

## Run with docker

If you want to test the webcomponent on a local instance of the [webcomponent store](https://webcomponents.opendatahub.com/) to make sure that it will run correctly also on the real store.
You can also access the webcomponent running in a simple separated docker container outside of the store.

If you have already developed your webcomponent and now want to test it on a local instance of the store, just copy `.env.example`, `docker-compose.yml`, `wcs-manifest.json` and `infrastructure/docker` into your root folder. Adjust your `package.json` and `wcs-manifest.json` files as described on the top of this readme. Then follow the instructions below.

For accessing the webcomponent in a separated docker in the browser you will need a server (e.g. webpack dev-server) that is hosting a page which includes the webcomponent tag, as well as the script defining it. This page needs to be hosted on port 8998 as specified in your docker-compose file.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Start the docker containers
- Create a .env file: <br>
  `cp .env.example .env`
- [Optional] Adjust port numbers in .env if they have conflicts with services already running on your machine
- Start the store with: <br>
  `docker-compose up -d`
- Wait until the containers are running. You can check the current state with: <br>
  `docker-compose logs --tail 500 -f`
- Access the store in your browser on: <br>
  `localhost:8999`
- Access webcomponent running in separated docker in your browser on: <br>
  `localhost:8998`

### Publish a new version of your webcomponent
- Increase version number WC_VERSION in your .env file
- Then run: `docker-compose up wcstore-cli`

### Stop the docker containers
- `docker-compose stop`

### Delete your webcomponents from the store
- `[sudo] rm -f workspace`
- `docker-compose rm -f -v postgres`


## Information

### Support

For support, please contact [help@opendatahub.com](mailto:help@opendatahub.com).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.
- Checkout a topic branch from the `main` branch.
- Make sure the tests are passing.
- Create a pull request against the `main` branch.

A more detailed description have a look at our [Getting Started
Guide](https://github.com/noi-techpark/odh-docs/wiki/Contributor-Guidelines:-Getting-started).

### Documentation

More documentation can be found at [https://docs.opendatahub.com](https://docs.opendatahub.com).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.

### REUSE

This project is [REUSE](https://reuse.software) compliant, more information about the usage of REUSE in NOI Techpark repositories can be found [here](https://github.com/noi-techpark/odh-docs/wiki/Guidelines-for-developers-and-licenses#guidelines-for-contributors-and-new-developers).

Since the CI for this project checks for REUSE compliance you might find it useful to use a pre-commit hook checking for REUSE compliance locally. The [pre-commit-config](.pre-commit-config.yaml) file in the repository root is already configured to check for REUSE compliance with help of the [pre-commit](https://pre-commit.com) tool.

Install the tool by running:
```bash
pip install pre-commit
```
Then install the pre-commit hook via the config file by running:
```bash
pre-commit install
```


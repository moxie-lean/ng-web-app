# Moxie's Leean Web App
Starter Web App based on the modular/atomic Leean concept.

Based on the [Angular Seed](https://github.com/angular/angular-seed) project. Follow the link to check the documentation.

Point your DocumentRoot at the /public folder to run the app. Or you can use ```npm start``` as described in the Angular Seed project.

## Content

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies](#install-dependencies)
  - [Create fake API](#create-fake-api-data)
  - [Set-up ENV Variables](#set-up-env-variables)
- [Automatic commands](#automatic-commands)
  - [postinstall](#postinstall)
- [Commands](#commands)
  - [start](#start)
  - [json-server](#json-server)
  - [js](#js)
  - [js:ci](#jsci)
  - [browserify](#browserify)
  - [styles](#styles)
  - [scss](#scss)
  - [scss:ci](#scssci)
  - [watch](#watch)
  - [watch:js](#watch)
  - [watch:scss](#watch)
  - [develop](#develop)
  - [build](#build)
  - [build:js](#buildjs)
  - [build:scss](#buildscss)
  - [build:css](#buildcss)
  - [test](#test)

## Requirements

- Node
- NPM

## Getting Started

### Clone the repo
To start a new project without the moxie-leean/web-app commit history you can run:

```
git clone --depth=1 git@github.com:moxie-leean/web-app.git <your-project-name>
```

The depth=1 tells git to only pull down one commit worth of historical data.

### Install Dependencies
Web App uses npm to manage dependencies. Run the following in the project's root directory:

```
npm install
```

[Download NPM / NodeJS](https://nodejs.org) first if you don't already have it installed globally.

### Create Fake API Data

Design your API structure and add your fake JSON data to ```config/json/db.json``` (sample file included with this project for you to edit).  

Finally run the following in the project's root folder to start the server:  

```
npm run json-server
```

Your API will be available at [http://localhost:3000/](http://localhost:3000/), e.g. [http://localhost:3000/posts/1](http://localhost:3000/posts/1)

See the [JSON Server Documentation](https://github.com/typicode/json-server) for more options.

### Set-up ENV Variables
Add and edit the production settings in ```config/env.prod.json```. These are committed to git.

You can create a copy called ```config/env.local.json``` which will be loaded instead if it exists. This is not committed to git (it's in .gitignore).

## Automatic commands

This commands are triggered automatically after certain actions on NPM, you don't need to type anything to execute this commands, and are listed here to let you know what's going on on certain actions.

### postinstall

This script is triggered after the command `npm install` and is executed after `npm install` has finished. In this action we run:

1. The installation of the bower dependencies
2. Creation of directories for builds
3. Build of develop assets.

## Commands 

Inside of the projet there are several commands you can use as a build tools and helper commands to compile assets, watch changes and so on, every command are available to use after you have.

### start  

```
npm start
```

This command will allow you to wake up the `http` server, and you will be able to access to the site at `localhost:8000`, the command will be waiting for any response to the server you can run this command on the background or in another tab for preference, you can kill the server at any time just by typing `ctrl + c`.

### json-server  

```
npm run json-server
```

This is very similar to the previous but instead it opens a server at
port `3000` where you can access to fake APIs and you can create your
own APIS and use that in your development process to test. 

### js

```
npm run js
```

Alias for the command `npm run browserify`, makes easier to remember and
type.

### js:ci

```
npm run js:ci -s
```

Run the eslint script rules again every `.js` file inside of the app
directory in order to follow the same rules to write consisten JS.

### browserify

```
npm run browserify
```

This command creates a single `.js` file from all the imports that are
made on `app/app.js` and makes transformations as well from ES6, this
script creates a source map as well so you can debug more easily where
errors are generated or triggered from the code.


### styles

```
npm run styles
```

This script runs the script above `scss` in order to generate the css
file after that applies the autoprefixer script in order to avoid
the need of write prefixer on some properties.

### autoprefix

```
npm run autoprefix
```

This command loops on the created `.css` file and adds the autoprefixer
for different browsers on different properties to avoid the need to
write that manually.

### scss

```
npm run scss
```

This script compiles the sass files into a single css file with no
minification, and adds a source map as well to the file to easy track
the properties of each element.  

**Note:** Please don't use this script directly since you are not
going to have the autoprefixer feature if you do so, use `npm run styles` instead.

### scss:ci

```
npm run scss:ci -s
```

This task applies the a sass lint on every `.scss` file inside of the app
directory, in order to write consisten sass files.

### watch

```
npm run watch
```

This command will watch any change on the `.js` and `.scss` files and
will trigger the compilation of JS or SASS if it's the case with this
you can avoid the need to run every time the taks to build the js or
sass to css.

### watch:js

```
npm run watch:js
```

This command will watch any change on the `.js` files and will generate
the bundle file on development mode so we can follow any problem using
the sourcemaps and avoid large wait times between compliation of assets.

### watch:scss

```
npm run watch:scss
```

This command will watch any change on the `.scss` files and will generate
the `.css` file on development mode so we can follow any problem using
the sourcemaps generated it will run the the autoprefix as well.

### develop

```
npm run develop
```

This tasks run the tasks: `styles` and `js`, which compiles all sass
into a single CSS and all JS in a single JS as well, the files are
develop friendly since includes the sourcemaps for easy develop process.

### build

```
npm run build
```

This tasks removes the source maps, and creates minified versions of the
CSS and JS files in order to be production ready.

### build:js

```
npm run build:js
```

This task removes the source maps, and creates minified versions of the
js file.

### build:scss

```
npm run build:scss
```

This task removes the source maps, and creates minified versions of the
CSS file.

### build:css

```
npm run build:css
```

This task creates a single CSS version with autoprefix, minified version
and with no source map to be production ready.

### test

```
npm test
```

Task that runs the JS and CSS lint used for travis in order to have a CI
sytem before tests. 

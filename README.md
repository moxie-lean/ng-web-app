# skaled.com

# Useful links

- [Staging](http://moxienyc:moxiestaging101@skaled.moxie-staging.com/)
- [Style guide](https://projects.invisionapp.com/share/7G6AKII5R#/screens)

# Scope of Work

## Templates 
- [ ] Home / Landing
- [ ] About
  - [ ] Our Approach
  - [ ] Team & Careers   
  - [ ] Contact
- [ ] Solutions
  - [ ] Lead Generation
  - [ ] Training & Consulting 
- [ ] Resources
- [ ] Blog

### GLOBAL
- [ ] Navigation - We will add a script field in the back end to add tags and other scripts in:   
  - [ ] Header
  - [ ] Footer
- [ ] Skaled's Branding (colors, logos, etc.)

### HOME PAGE
Page template to include support for following content:
- [ ] Title
- [ ] Images
- [ ] Text
- [ ] Testimonials

### ABOUT - APPROACH
Page template to include support for following content:
- [ ] Title
- [ ] Images
- [ ] Text
- [ ] Contact Form including but not limited to:   
  - [ ] Name
  - [ ] Email 

### ABOUT - TEAM
Page template to include support for following content:
- [ ] Title
- [ ] Images
- [ ] Text
- [ ] Table
- [ ] Contact Form including but not limited to:
  - [ ] Name
  - [ ] Email
- [ ] Links to third party (linkedin)

### SOLUTIONS - TRAINING
Page template to include support for following content:
- [ ] Title
- [ ] Image
- [ ] Text
- [ ] Table
- [ ] Contact Form including but not limited to:   
  - [ ] Name
  - [ ] Email
- [ ] Use a dynamic for to animate/update content on the page depending on the pack that
the user selects
- [ ] Look into ways to add CRM and analytics in the packs

### SOLUTIONS - LEAD GENERATION
Page template to include support for following content:
- [ ] Title
- [ ] Graphic illustrations (not included in our scope - to be handled by third party)
- [ ] Contact Form including but not limited to:   
  - [ ] Name
  - [ ] Email
- [ ] Packages area including the following content:
  - [ ] Images   
  - [ ] Titles
  - [ ] Text
  - [ ] Other CTA
  - [ ] Text
  - [ ] Tables

### RESOURCES
(TBD)

### BLOG
Page template to include support for following content:
- [ ] Index of all posts including:
  - [ ] Title
  - [ ] Excerpt
  - [ ] Image
  - [ ] Link to single post page including support for following content
    - [ ] Title
    - [ ] Embedded media (images and videos)
    - [ ] Text
    - [ ] Quotes
    - [ ] Tables

# Timeline: 

- V1 wireframes - 11.11.15
- V2 wireframes - 11.18.15
- V3 wireframes - 1.8.16

- V1 Design - 1.15.16
- V2 Design - 1.22.16
- V3 Design - 1.29.16

- Front end delivery  - 2.12.16
- Backend Delivery - 2.26.16
- QA, content integration - 2.22.16 > 3.4.16

### Launch 3.4.16 

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
  - [Build Commands](#build-commands)


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


### Build Commands

Several build commands are included. Each can be run for all file types or just a specific file type.

- Use ```npm run <build_command>``` to run for all file types (where available).
- Use ```npm run <file_type>:<build_command>``` to run for a specific file type [js, styles or templates].

For example:

- Run ```npm run watch``` whilst developing.
- Run ```npm run build``` on the production server.
- Run ```npm run ci``` in Travis.
- Run ```npm run styles:watch``` to only watch scss files whilst developing..
 

The build commands are:

#### ci

```
npm run ci
```

Runs Lint code sniffer on all file types [js and styles].

#### dev

```
npm run dev
```

Creates the dev versions (unminified with sourcemaps) of all file types [js, styles and template].

#### build

```
npm run dev
```

Creates the production versions (minified) of all file types [js, styles and template].

#### watch

```
npm run watch
```

Watches for changes on all file types and runs their dev task when detected [js, styles and template].

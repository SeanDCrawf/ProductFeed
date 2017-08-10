# Product Feed - Backend/Frontend

version: 1.0.0  
author: Seán Crawford

## 1. Backend

*Laravel(v5.4)*, *PHPUnit*

The following tools are required:

- [Composer](https://getcomposer.org/doc/00-intro.md) - Dependency management in PHP

#### 1.1 Localhost setup

Download the contents of the 'backend' folder into a folder located on a local webserver.
*Take note of the localhost URL as the frontend will require this at a later stage.*

#### 1.2 Installation

Install all Composer dependencies

    $ composer install

#### 1.3 Folder permissions

Ensure the storage folder has the correct permissions.
- [Laravel Permissions](https://stackoverflow.com/questions/30639174/file-permissions-for-laravel-5-and-others#answer-37266353)

#### 1.4 Environment and Key

Duplicate the *.env.example* and rename it to *.env*, then generate an app key

	$ php artisan key:generate

#### 1.5 Running tests

To run all PHPUnit tests

	$ php vendor/phpunit/phpunit/phpunit


## 2. Frontend

*AngularJS(Typescript)*, *UnderscoreJS*, *Jasmine*, *Bootstrap*

The following tools are required:

- [NodeJS](http://nodejs.org/) - Javascript enviroment
- [GruntJS](http://gruntjs.com/) - Javascript task runner
- [Sass](http://sass-lang.com/) -  CSS preprocessor

*Ensure these all installed before attempting to continue with any of the commands below.*

#### 2.1 Installation

Install all NodeJS dependencies

    $ npm install

#### 2.2 Update API URL

Open the */frontend/app/pipeline/Application.ts* file and update the value of Globals.API.url to URL of the backend installation. *Important: the URL should end in '/api'*
    
#### 2.3 Running locally

To run a local server and automatically open the default HTML page with livereload:

    $ grunt serve

#### 2.4 Running tests

To run all Javascript tests:

    $ grunt jasmine
    
#### 2.5 Building for deployment

To prepare templates, JS and CSS files for deployment.

    $ grunt build

*Warning: Files produced by this grunt task will need to be viewed from a webserver.*





# Testing project structure with NightWatch.js

## Installation
To install the latest version using the `npm` command line tool, run the following:
>$npm install -g nightwatch

Then we need to install the webdriver:
1. Geckodriver for firefox
>$npm install -g geckodriver --save-dev

2. Chrome driver
>$npm install -g chromedrover --save-dev


## Structure
`specs`

The main location where tests are located. Can contain sub-folders which can be targeted during the run using the `--group` argument.

`custom-assertions`

Files located here are loaded automatically by Nightwatch and placed onto the `.assert` and `.verify` api namespaces to extend the Nightwatch built-in assertions.

`custom-commands`

Files located here are loaded automatically by Nightwatch and placed onto the main `browser` api object to extend the built-in Nightwatch commands.

`page objects`

Working with page objects is a popular methodology in end-to-end UI testing. Files placed in this folder are automatically loaded onto the `.page` api namespace, with the name of the file being the name of the page object.

`globals.js`

The external globals file which can hold global properties or hooks

## Running test 

By default, all tests inside the `specs` folder will be run using Chrome. If you'd like to run end-to-end tests against Chrome (or Firefox) in headless mode, simply pass the `--headless` argument.
Simply run the application then use this command line

>$ node nightwatch 

**Running a single test**

To run a single test supply the filename path. E.g.:

>$ node nightwatch  tests/e2e/specs/test.js

**Skip Dev server auto-start**

If the development server is already running and you want to skip starting it automatically, pass the `--url` argument:

>$ node nightwatch  --url http://localhost:8080/

**Running in Firefox**

Support for running tests in Firefox is also available by default. Simply run the following (optionally add `--headless` to run Firefox in headless mode):

>$ node nightwatch  --env firefox [--headless]

**Running in Firefox and Chrome simultaneously**

You can also run the tests simultaneously in both browsers by supplying both test environments separated by a comma (",") - no spaces.

>$ node nightwatch  --env firefox,chrome [--headless]

**Running Tests in Parallel**

For a significantly faster test run, you can enable parallel test running when there are several test suites. Concurrency is performed at the file level and is distributed automatically per available CPU core.

For now, this is only available in Chromedriver. Read more about parallel running

in the Nightwatch docs.

>$ node nightwatch  --parallel

**Running with Selenium**

Since `v4`, the Selenium standalone server is not included anymore in this plugin and in most cases running with Selenium is not required since Nightwatch v1.0.

It is still possible to use the Selenium server, by following these steps:

1. Install `selenium-server` NPM package:

>$ npm install selenium-server --save-dev

2. Run with `--use-selenium` cli argument:

>$ vue-cli-service test:e2e --use-selenium

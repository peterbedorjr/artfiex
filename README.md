# Artifex

Artifex is a simple project boilerplate using [artifex-core](https://github.com/peterbedorjr/artifex-core)

## Getting Started

Either clone the repo or download the zip.

Install dependencies

```bash
npm install
```

Start the webpack dev server

```
npm run serve
```

### Routing

A simple way to execute javascript based on the route.  Artifex uses [Navigo](https://github.com/krasimir/navigo).

You'll see in `source/scripts/app.js` an example route is already set up:

```js
const router = new Navigo('/');

router.on({
    '/': () => import('./pages/Home'),
}).resolve();
```

The page module `Home` is the entry point for that page for both the JavaScript and CSS.

```js
import createRouteHandler from '@artifexweb/core/scripts/createRouteHandler';
import './index.scss';

export default createRouteHandler(async () => {
    //
});
```

The `createRouteHandler` function is a simple function that returns a compatible route object for Navigo:

```js
export default (uses, hooks = {}, name = undefined) => {
    const route = {
        uses,
    };

    if (Object.keys(hooks).length) {
        route.hooks = hooks;
    }

    if (name) {
        route.as = name;
    }

    return route;
};
```

A full example might be:

```js
createRouteHandler(() => {
    // inital functionality, the main route handler
}, {
    before: (done, match) => {
        // The `before` hook receives two arguments. The first one is a function that 
        // needs to be called with either no arguments or `false`. The no-argument 
        // version means "move forward". `false` stops the resolving 
        // and your handler will not be called.
    },
    after: (match) => {
        // `after` is called after your handler
    },
    leave: (done, match) => {
        // `leave` is called when you are about to leave out of the route. Similarly to the `before` 
        // hook accepts a function as first argument and a match object as second. If the function 
        // is called with `false` Navigo will stop resolving the new matched 
        // route meaning "we cant' go out of the current route".
    },
    already: (match) => {
        // `already` is called when this is the current route and it matches again
    },
}, 'this.is.just.a.name');
```

### Location

#### location.segments

Retrieve the current location's path segments as an array or individual segment by index

#### location.uri

Retrieve information about current location or parse a provided URL


### Screen
===================

Attach events to matching breakpoint rules

Syncing media queries and JavaScript reliably can be tedious. Wee seamlessly combines and triggers breakpoint logic based on your configured project media queries.

#### Values

You can easily disable any unneeded breakpoints by setting them to false in wee.json or add more by adding a breakpoint value to this same array.

1.  Portrait Mobile (320px)
2.  Landscape Mobile (480px)
3.  Portrait Tablet (768px)
4.  Desktop 1 (1024px)
5.  Desktop 2 (1280px)
6.  Desktop 3 (1440px)

Wee uses the font family of the HTML element to reference the current breakpoint. For example, the Portrait Mobile breakpoint is triggered when the font family is '2'. When you add/remove default breakpoints, the corresponding font family values will update automatically when the build process is run.

**Default Values**

1.  Portrait Mobile (320px) - font-family: 1
2.  Landscape Mobile (480px) - font-family: 2
3.  Portrait Tablet (768px) - font-family: 3
4.  Desktop 1 (1024px) - font-family: 4
5.  Desktop 2 (1280px) - font-family: 5
6.  Desktop 3 (1440px) - font-family: 6

**Customized Values**

1.  Portrait Mobile (320px) - font-family: 1
2.  Landscape Mobile (480px) - font-family: 2
3.  Portrait Tablet (768px) - font-family: 3
4.  Landscape Tablet (900px) - font-family: 4
5.  Desktop 1 (1024px) - font-family: 5
6.  Desktop 2 (1280px) - font-family: 6
7.  Desktop 3 (1440px) - font-family: 7
8.  Desktop 4 (1600px) - font-family: 8

##### screen.map
----------------------------

Watch single or set of screen events with specified options

| Variable | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| sets | object, array | -   | Object parameters below | ✔   |

##### Set Object

| Variable | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| args | array | -   | Callback arguments | -   |
| callback | function | -   | Matching callback | ✔   |
| each | boolean | false | Execute callback for each matching breakpoint | -   |
| init | boolean | true | Immediately evaluate breakpoint logic | -   |
| max | number | -   | Maximum breakpoint value | -   |
| min | number | -   | Minimum breakpoint value | -   |
| namespace | string | -   | Event namespace for granular resetting | -   |
| once | boolean | false | Disable callback after first execution | -   |
| scope | object | -   | Callback scope | -   |
| size | number | -   | Specific breakpoint value | -   |
| watch | boolean | true | Evaluate on screen resize | -   |

You can setup as many breakpoint sets as you need. They are added to a global window resize event that evaluates once against all stored rules.

##### Single

```js
import screen from '@artifexweb/core/scripts/screen'

screen.map({
    size: 4,
    callback(obj) {
        console.log(obj);
    },
});
```
    

An object with the direction, size, previous size, and init status is passed as the first callback argument.

| Variable | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| dir | number | -   | 1 if sized up, 0 if sized down | -   |
| init | boolean | -   | true if run initially, else false | -   |
| prev | number | -   | 1-6 representing previous value | -   |
| size | number | -   | 1-6 representing current value | -   |

##### Multiple

```js
import screen from '@artifexweb/core/scripts/screen'
import common from './common';

screen.map([
    {
        size: 1,
        callback: [
            common.mobile,
            common.smallScreen,
        ],
    },
    {
        min: 3,
        max: 4,
        watch: false,
        callback: common.tablet,
    },
    {
        min: 5,
        args: ['passThrough'],
        callback(obj, val) {
            console.log(val); // passThroughconsole.log(obj);
        },
    },
]);
```
    

##### screen.reset
--------------------------------

Reset all bound events

| Variable | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| namespace | string | -   | Namespace of events to reset | -   |

```js
import screen from '@artifexweb/core/scripts/screen'

screen.reset();
```
    

##### screen.run
----------------------------

Evaluate the current breakpoint

| Variable | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| namespace | string | -   | Evaluate mappings registered under specific namespace | -   |

##### Simple

```js
import screen from '@artifexweb/core/scripts/screen'
    
screen.run();
```
    

##### Namespace

```js
import screen from '@artifexweb/core/scripts/screen'

$screen.run('namespace');
```
    

##### screen.size
------------------------------

Get current screen value

The value is determined by the value of the HTML element font family which stores the current media query number. The response falls between 1 and 6.

```js
import screen from '@artifexweb/core/scripts/screen'
    
screen.size();
```

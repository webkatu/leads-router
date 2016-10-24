# leads-router

A minimal routing library of [leads.js](https://github.com/webkatu/leads.js).

```javascript
var router = leads.Router();

router.get('/', function(req, res, next) {
	res.send('Hello world');
});

router.dispatch('/', 'get'); // or router.get('/');
```


## Description

It has been reduced unnecessary function from [leads.js](https://github.com/webkatu/leads.js).

If you suffice leads-router, you should use it.

The usage is almost the same as [leads.js](https://github.com/webkatu/leads.js). However, you can not use part of methods of [leads.js](https://github.com/webkatu/leads.js).

## Installation

```
$ npm install leads-router # for browserify
$ git clone https://github.com/webkatu/leads-router
```

```html
<script src="leadsRouter.js"></script>
```

## API

See the [leads API](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-api).

The following are the available properties and methods in leads-router.


### leads

* [leads.Router()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-leadsrouteroptions)


### next

* [next()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-next)


### Request

* [req.app](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqapp)
* [req.baseUrl](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqbaseurl)
* [req.data](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqdata)
* [req.dispatcher](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqdispatcher)
* [req.hash](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqhash)
* [req.host](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqhost)
* [req.hostname](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqhostname)
* [req.href](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqhref)
* [req.method](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqmethod)
* [req.origin](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqorigin)
* [req.originalUrl](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqoriginalurl)
* [req.params](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqparams)
* [req.path](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqpath)
* [req.pathname](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqpathname)
* [req.port](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqport)
* [req.protocol](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqprotocol)
* [req.query](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqquery)
* [req.search](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqsearch)
* [req.secure](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-reqsecure)


### Router

* [router.defaults](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerdefaults)
* [router.all()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerallpath-callback-callback-)
* [router.all()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerallpath-options)
* [router.dispatch()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerdispatchpath-method-options)
* [router.METHOD()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerdispatchpath-method-options)
* [router.METHOD()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routermethodpath-options)
* [router.param()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerparamname-callback)
* [router.route()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerroutepath)
* [router.use()](https://github.com/webkatu/leads.js/blob/master/README.md#user-content-routerusepath-function-function-)


## Support IE10+

If you support IE10+, you should import [WeakMap polyfill](https://github.com/Benvie/WeakMap) before you import leadsRouter.js.

```
$ npm install weakmap
```

```html
<script src="weakmap.js"></script>
<script src="leadsRouter.js"></script>
```


## Author

* Twitter [@vinyufi](https://twitter.com/vinyufi)
* Blog [webkatu.com](http://www.webkatu.com)


## License

[MIT](https://github.com/webkatu/leads.js/blob/master/LICENSE)

[structure](ttps://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application)

    |-- app
        |-- controllers
        |-- helpers
        |-- middlewares
        |-- models
        |-- routes
        |-- services
    |-- bin
    |-- logs
    |-- node_modules
    |-- public
        |-- components
        |-- images
        |-- javascripts
        |-- stylesheets
    |-- views
    |-- .env
    |-- .env-example
    |-- app.js
    |-- README.md

### routes

```javascript
module.exports = function(app) {
  fs.readdirSync('./routes').forEach(file => {
    if(file === path.basename(___filename) return;
    require(___basename + file)(app)
  })
}
```

### controllers

```javascript
fs.readdirSync('./controllers').forEach(function (controller) {
	if (controller.indexOf('Ctrl.js') !== -1) {
		const ctrl = require('./controllers' + controller)
		controller.init(app)
	}
})
```

### models

```javascript
fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		)
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))
		modle.init()
	})
```

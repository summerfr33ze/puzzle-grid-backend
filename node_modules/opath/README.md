# opath

Like `require('path')`, but with a constructor based API.

Since once the path object is created, the string value doesn't need to be reparsed, it's faster than `require('path')` over multiple invokations.

## Installation

	npm install opath

## Example

```javascript
var Paht = require('opath');

var path = new Path('a/b').dirname();
path.toString() === 'a';
```

## API

### path = new Path(str)

Create a new path object.

### Counterparts in require('path')

* `.dirname()`
* `.basename()`
* `.extname()`
* `.join()`
* `.resolve()`

These methods work like the ones in `require('path')`. Methods that are supposed to return a path will return a new path object (e.g. `dirname()`).

### path.extname(ext)

Set extname to `ext`.

### path.toString()

Return the string value of the path.
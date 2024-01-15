module.exports = Path;

function Path(path) {
	var root, parts, end;

	if (path) {
		root = path.charAt(0) === '/' ? '/' : '';
		parts = path.split('/').filter(String);
		end = parts.length && path.charAt(path.length - 1) === '/' ? '/' : '';
	} else {
		root = '';
		parts = [];
		end = '';
	}

	this._root = root;
	this._parts = parts;
	this._end = end;
};

Path.prototype.dirname = function () {
	var path = this.clone();

	path._parts.pop();
	path._end = '';

	if (!path._parts.length) {
		if (path._root) return path;
		path._parts.push('.');
	}

	return path;
};

Path.prototype.clone = function () {
	return this._clone(new Path());
};

Path.prototype._clone = function (path) {
	path._root = this._root;
	path._parts = this._parts.slice(0);
	path._end = this._end;
	return path;
};

Path.prototype.toString = function () {
	// normalize path
	var i = this._parts.length;
	var up = 0;
	while (--i >= 0) {
		var last = this._parts[i];

		if (last === '.') {
			this._parts.splice(i, 1);
		} else if (last === '..') {
			this._parts.splice(i, 1);
			++up;
		} else if (up) {
			this._parts.splice(i, 1);
			--up;
		}
	}
	if (!this._root) {
		while (up--) {
			this._parts.unshift('..');
		}
	}
	if (!this._parts.length && !this._root) this._parts.push('.');

	return this._root + this._parts.join('/') + this._end;
};

Path.prototype.basename = function () {
	if (!this._parts.length) return '';
	return this._parts[this._parts.length - 1];
};

Path.prototype.extname = function (ext) {
	if (!arguments.length) return this._getExtname();
	return this._setExtname(ext);
};

Path.prototype._getExtname = function () {
	var basename = this.basename();
	if (!basename || basename === '.' || basename === '..') return ''

	var i = basename.lastIndexOf('.');
	if (i === -1 || i === 0) return '';
	return basename.slice(i);
};

Path.prototype._setExtname = function (ext) {
	var path = this.clone();
	if (!path._parts.length) return path;

	var basename = path._parts[path._parts.length - 1];
	if (basename === '.' || basename === '..') return path;

	var i = basename.lastIndexOf('.');
	if (i === -1 || i === 0) basename += ext;
	else basename = basename.slice(0, i) + ext;
	path._parts[path._parts.length - 1] = basename;

	return path;
};

Path.prototype.resolve = function () {
	var toPaths = [];
	var index = -1;

	// find the last absolute path in passed paths
	for (var i = 0, len = arguments.length; i < len; ++i) {
		var toPath = arguments[i];
		if (typeof toPath === 'string') toPath = new Path(toPath);

		toPaths.push(toPath);
		if (toPath._root) index = i;
	}
	if (!toPaths.length) return this.clone();

	var path;
	if (index === -1) {
		path = this.join.apply(this, toPaths);
	} else {
		var absPath = toPaths[index];
		path = absPath.join.apply(absPath, toPaths.slice(index + 1));
	}
	path._end = '';

	return path;
};

Path.prototype.join = function () {
	var path = this.clone();

	for (var i = 0, len = arguments.length; i < len; ++i) {
		var toPath = arguments[i];
		if (typeof toPath === 'string') toPath = new Path(toPath);

		// '' + '/foo' => '/foo'
		if (!path._root && !path._parts.length && toPath._root) path._root = toPath._root;
		path._parts = path._parts.concat(toPath._parts);
		// 'foo' + 'bar/' => 'foo/bar/'
		if (toPath._parts.length) path._end = toPath._end;
		// 'foo' + '/' => 'foo/'
		else if (toPath._root) path._end = '/';
	}

	return path;
};
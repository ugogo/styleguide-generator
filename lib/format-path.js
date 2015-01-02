/* formatExtension()
 * Add '/' at the end of the path if not */

module.exports = function (path) {
	return path.charAt( path.length - 1 ) !== '/' ? path + '/' : path;
};

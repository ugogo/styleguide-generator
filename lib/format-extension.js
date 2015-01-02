/* formatExtension()
 * Add '.' if not at the begin of a string */

module.exports = function (ext) {
	return ext.charAt( 0 ) !== '.' ? '.' + ext : ext;
};

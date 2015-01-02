module.exports = function () {
	var indexPath = this.options.indexPath;
	var strToReplace = this.options.layout.title.str;
	var newContent = this.options.layout.title.content;

	u.replaceInFile( indexPath, strToReplace, newContent );
};

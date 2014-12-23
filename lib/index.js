var fs = require('fs');
var glob = require('glob');
var tools = require('./tools.js');

var opts;



function whenReady(_opts){
	opts = _opts;

	tools.delete.folder(opts.componentFolder, function(){
		console.log('$ delete:', opts.componentFolder, ': OK');

		var distComponentFolder = opts.distFolder + opts.distComponentFolder;

		tools.create.folder(distComponentFolder, function(){
			glob(opts.baseFolder + '**/*.md', function(err, files){
				console.log('$ forEach', opts.baseFolder + '**/*.md');
				files.forEach(forEachMdFiles);
			});
		});
	});
}

function forEachMdFiles(MarkdownFilePath){
	fs.readFile(MarkdownFilePath, 'utf8', function(err, MarkdownStr) {
		MarkdownStr = tools.get.Markdown(opts.beforeCompilation, MarkdownStr);
		var html = tools.get.Html(opts.afterCompilation, MarkdownStr);
		var fileExtension = tools.get.fileExtension(opts.distFilesExtensions);

		var componentPath = MarkdownFilePath.replace(opts.baseFolder, '').split('/');

		if(componentPath.length > 1)
			var fileName = componentPath[1].replace('.md', fileExtension);
		else
			var fileName = componentPath[0].replace('.md', fileExtension);

		var filePath = opts.componentFolder + fileName;

		tools.create.file(filePath, html);
	});
}



module.exports = {
	generate: function(opts){
		tools.test.val(opts.baseFolder, 'string', 'baseFolder');
		tools.test.val(opts.distFolder, 'string', 'distFolder');
		tools.test.val(opts.distComponentFolder, 'string', 'distComponentFolder');
		tools.test.val(opts.distFilesExtensions, 'string', 'distFilesExtensions');

		opts.componentFolder = opts.distFolder + opts.distComponentFolder;

		whenReady(opts);
	}
};

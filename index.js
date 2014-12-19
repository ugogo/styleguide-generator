var fs = require('fs');
var del = require('del');
var glob = require('glob');
var mkdirp = require('mkdirp');
var mdConvert = require('namp');

module.exports = {
	generate: function(opts){

		// clear baseFolder
		del(opts.distFolder + opts.distComponentFolder, function(){

			// For each MD files into baseFolder
			glob(opts.baseFolder + '**/*.md', function(err, files){
				files.forEach(function(path, i){
					fs.readFile(path, 'utf8', function(err, fileString) {

						// opts.beforeCompilation()
						var str = opts.beforeCompilation(fileString) || fileString;

						// convert it to html
						var _html = mdConvert(str).html;

						// opts.afterCompilation();
						var html = opts.afterCompilation(_html) || _html;

						// create paths
						var distComponentFolder = opts.distFolder + opts.distComponentFolder;
						var folderPath = path.replace(opts.baseFolder, '').split('/')[0];
						var fileName = path.replace(opts.baseFolder, '').split('/')[1].replace('.md', opts.distFilesExtensions);
						var filePath = distComponentFolder + folderPath + '/' + fileName;

						// Create folders and append converted file
						mkdirp(distComponentFolder + folderPath, function(){
							fs.writeFile(filePath, html);
						});
					});
				});
			});
		});
	}
};

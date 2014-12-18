var fs = require('fs');
var del = require('del');
var glob = require('glob');
var mkdirp = require('mkdirp');
var mdConvert = require('namp');

module.exports = {
	generate: function(opts){

		/*
		 * Clear baseFolder
		 */
		del(opts.distFolder, function(){

			/*
			 * For each MD files into baseFolder
			 */
			glob(opts.baseFolder + '**/*.md', function(err, files){
				files.forEach(function(path, i){
					fs.readFile(path, 'utf8', function(err, fileString) {

						/*
						 * Convert it to .html
						 */
						var html = mdConvert(fileString).html;
						var folderPath = path.replace(opts.baseFolder, '').split('/')[0];
						var fileName = path.replace(opts.baseFolder, '').split('/')[1].replace('.md', '.html');
						var filePath = opts.distComponentFolder + folderPath + '/' + fileName;

						/*
						 * Create a folder
						 * append it distFolder
						 * append currentFile into the currentFolder
						 */
						mkdirp(opts.distComponentFolder + folderPath, function(){
							fs.writeFile(filePath, html);
						});
					});
				});
			});
		});
	}
};

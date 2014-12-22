var fs = require('fs');
var del = require('del');
var glob = require('glob');
var mkdirp = require('mkdirp');
var mdConvert = require('namp');

var tools = {
	test: {
		compilationFn: function(fn, fnName, args){
			if(typeof fn !== 'function')
				throw new Error(fnName + ' is not a function');
			else if(typeof fn(args ? args : null) !== 'string')
				throw new Error(fnName + ' must return a string');
			return fn;
		},
		val: function(content, type, name){
			if(typeof content !== type)
				throw new Error(name + ' must return a ' + type);
		}
	},
	get: {
		Markdown: function(param, MdStr){
			if(param){
				tools.test.compilationFn(param, 'beforeCompilation', MdStr);
				return param(MdStr);
			}
			return MdStr;
		},
		Html: function(param, htmlStr){
			if(param){
				tools.test.compilationFn(param, 'afterCompilation');
				return param(htmlStr);
			}
			return mdConvert(htmlStr).html;
		},
		fileExtension: function(param){
			if(param){
				tools.test.val(param, 'string', 'distFilesExtensions');
				return param.charAt(0) !== '.' ? '.' + param : param;
			}
			return '.html';
		}
	},
	deleteFolder: function(path, cb){
		try { del(path, cb); }
		catch(e) { console.log(e); }
	}
};

module.exports = {
	generate: function(opts){
		var componentFolder = opts.distFolder + opts.distComponentFolder;

		tools.deleteFolder(componentFolder, function(){
			console.log('$ delete:', componentFolder, ': OK');

			glob(opts.baseFolder + '**/*.md', function(err, files){
				console.log('$ looking for:', opts.baseFolder + '**/*.md');

				files.forEach(function(path, i){
					fs.readFile(path, 'utf8', function(err, MarkdownStr) {
						var str = tools.get.Markdown(opts.beforeCompilation, MarkdownStr);
						var html = tools.get.Html(opts.afterCompilation, str);
						var fileExtension = tools.get.fileExtension(opts.distFilesExtensions);

						var folderPath = path.replace(opts.baseFolder, '').split('/')[0];
						var fileName = path.replace(opts.baseFolder, '').split('/')[1].replace('.md', fileExtension);
						var filePath = componentFolder + folderPath + '/' + fileName;

						mkdirp(componentFolder + folderPath, function(){
							fs.writeFile(filePath, html, function(){
								console.log('$ generate:', filePath, ': OK');
							});
						});
					});
				});
			});
		});

		process.on('exit', function(){
			console.log('$ end');
		});
	}
};

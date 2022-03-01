let mix = require('laravel-mix');

mix.setPublicPath('./web/assets');

mix.combine([
	'node_modules/jquery/dist/jquery.js',
	'node_modules/popper.js/dist/umd/popper.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js',
	],
	'web/assets/js/vendor.js');

mix.js('src/js/app.js', 'web/assets/js')
mix.sass('src/sass/app.scss', 'web/assets/css')

mix.version();
mix.disableNotifications();

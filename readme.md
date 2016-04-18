# Boilerplateku

Boilerplateku adalah sebuah boilerplate untuk memulai sebuah proyek dengan memanfaatkan alat-alat front end seperti git, npm, grunt, dan bower. Ikuti petunjuk di bawah untuk memulai memahami bagaimana caranya membuat sebuah boilerplate.

Sebelum memulai kunjungi lebih dahulu link berikut [front-end-tools](http://github.com/isatrio/front-end-tools) untuk menginstal paket yang dibutuhkan.

## Git

Buat git repository di github atau layanan git yang kalian suka. Ikuti petunjuk dari layanan git yang kalian gunakan, biasanya setelah membuat sebuah repository maka akan muncul panduan, atau ikuti langkah di bawah untuk terminal.

```
cd folder-boilerplate
git init
git remote add origin git@github.com:yourusername/boilerplate-name.git
git add . && git commit -m 'Initial commit'
git push -u origin master
```

Setiap kali memulai sebuah proyek menggunakan git, jangan lupa untuk menambahkan berkas dengan nama '.gitignore'. Berkas tersebut yang membatasi git untuk tidak mengikutsertakan berkas/folder yang tidak ingin kita sertakan dalam sebuah proyek. Dalam proyek ini, bisa dilihat bahwa folder dengan nama bower_components dan node_modules akan diabaikan.

## Bower

Bower adalah sebuah package manager yang dikhususkan untuk web. Tidak perlu berpikir berlebihan untuk alat ini, tugasnya hanya sebagai package manager. Untuk mulai menggunakannya cukup ikuti langkah di bawah

```
bower init
bower install bootstrap-sass --save-dev
```

perintah 'bower init' digunakan untuk inisialisasi bower dalam proyek kita, dalam hal ini adalah boilerplate yang sedang kita buat. Masukan informasi yang dibutuhkan, setelah selesai, bower akan membuat sebuah berkas dengan nama bower.json, isinya adalah konfigurasi dan paket-paket yang kita instal. 

Perintah berikutnya adalah menginstal bootstrap sebagai framework yang akan kita gunakan. Secara bawaan, bower akan menempatkan semua paket yang kita instal dalam satu folder dengan nama 'bower_components'. Argumen dibagian belakang '--save-dev' adalah perintah untuk bower menuliskan nama paket beserta versinya ke dalam berkas bower.json.

## Gruntjs

Grunt adalah sebuah tasks manager yang fungsinya adalah mengerjakan suatu perintah yang sering kita ulang-ulang penggunaannya. Sebelum memulai grunt, ada baiknya jika kita membuat berkas package.json, cukup ketikan 'npm init' untuk membuat berkas tersebut. Setelah selesai, buat berkas dengan nama Gruntfile.js sebagai berkas konfigurasi grunt.

```
'use strict';

module.exports = function(grunt) {
	// Load all tasks
	require('load-grunt-tasks')(grunt);
	// Show elapsed time
	require('time-grunt')(grunt);

	grunt.initConfig({
		// Konfigurasi disini
	});

	grunt.registerTask();
};
```

Konfigurasi tersebut di atas akan kita isi dengan konfigurasi masing-masing servis yang akan kita gunakan nanti. Sebelum memulai menginstal paket, instal dulu beberapa paket di bawah

```
npm install grunt load-grunt-tasks time-grunt --save-dev
```

### jshint

Jshint adalah sebuah pengecek kode javascript. Kita bisa menggunakan servis ini dengan memanfaatkan grunt. Ikuti langkah di bawah untuk menggunakan servis ini.

```
npm install grunt-contrib-jshint --save-dev
```

Setelah selesai masukan kode konfigurasi jshint ini ke dalam berkas Gruntfile.js yang tadi telah kita buat. Sisipkan kode di bawah ke dalam 'grunt.initConfig({ //kofigurasi })'

```
jshint: {
	options: {
		jshintrc: '.jshintrc'
	},
	all: [
		'Gruntfile.js',
		'assets/js/*.js' // berkas javascript yang akan kita cek. '*' menandakan untuk semua berkas
	]
},
```

Untuk mencoba apakah konfigurasi kita telah berhasil atau tidak jalankan perintah di bawah

```
grunt jshint
```

### Sass

Sass adalah sebuah compiler untuk css preprocessor. Untuk menggunakan servis ini ikuti langkah di bawah

```
npm install grunt-sass --save-dev
```

Sebenarnya, untuk sass, grunt memiliki satu paket dengan nama 'grunt-contrib-sass'. Namun paket tersebut menggunakan compiler dari gem, sedangkan compiler yang kita gunakan adalah versi nodejs. Jadi kita akan menggunakan 'grunt-sass'. Untuk kofigurasi paket ini lihat kode di bawah.

```
sass: {
	dev: {
		options: {
			sourceMap: true,
			outputStyle: 'compact'
		},
		dist: {
			files: {
				'assets/css/main.css': 'assets/scss/main.scss'
			}
		}
	},
	build: {
		options: {
			sourceMap: true,
			outputStyle: 'compressed'
		},
		dist: {
			files: {
				'assets/css/main.min.css': 'assets/scss/main.scss'
			}
		}
	}
},
```

Pastikan ikuti kerangka folder dalam proyek ini. 'dev' adalah konfigurasi yang akan kita eksekusi untuk developmen dan 'build' adalah yang akan kita eksekusi untuk production. Untuk menjalankannya ikuti langkah di bawah.

```
grunt sass:dev
grunt sass:build
```

### Uglify

Uglify adalah servis untuk compression berkas javascript. Ikuti perintah berikut untuk menggunakan paket ini

```
npm install grunt-contrib-uglify --save-dev
```

Untuk konfigurasinya lihat kode di bawah

```
uglify: {
	dist: {
		files: {
			'assets/js/scripts.min.js': [jsfiles]
		}
	}
},
```

Untuk menjalankannya ikuti perintah di bawah

```
grunt uglify
```

### Watch

Watch adalah servis dari grunt untuk tetap memonitor secara otomatis berkas yang perlu dikompilasi. Ikuti perintah di bawah untuk menggunakannya.

```
npm install grunt-contrib-watch --save-dev
```

Gunakan konfigurasi di bawah sebagai acuan

```
watch: {
	sass: {
		files: ['assets/scss/*.scss'],
		tasks: ['sass:dev'],
		options: {livereload: true}
	},
	js: {
		files: [jsfiles],
		tasks: ['jshint'],
		options: { livereload: true}
	},
}
```

Untuk menjalankannya gunakan perintah di bawah

```
grunt watch
```


Setelah selesai dengan paket-paket di atas. Masukan kode di bawah, yang akan kita gunakan dalam memanggil atau menjalan grunt

```
grunt.registerTask('default', ['dev']);
grunt.registerTask('dev', ['jshint', 'sass:dev', 'uglify']);
grunt.registerTask('prod', ['jshint', 'sass:build', 'uglify']);
```

Format kofigurasi grunt adalah menggunakan format json, jadi lebih mudah dipahami dan dimengerti.

Jika ada pertanyaan bisa hubungi saya di akun ini atau bisa langsung tanya ke twitter saya di @isatrio, terima kasih

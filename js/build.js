var win = require('electron-winstaller');
var jetpack = require('fs-jetpack');
var pkg = jetpack.read('./package.json', 'json' );

resultPromise = win.createWindowsInstaller({
  appDirectory: "/tmp/build/app",
  outputDirectory: "/tmp/build/win64",
  authors: pkg.author,
  exe: `${pkg.productName}.exe`,
  name: pkg.productName,
  title: pkg.productName
});

resultPromise.then(
  () => console.log("Build complete"), 
  (e) => console.log('Build failed. Reason: ${e.message}')
);

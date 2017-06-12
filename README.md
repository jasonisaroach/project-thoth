# Project Thoth

A markdown editor with a live preview.

## Starting [Thoth](https://github.com/TheGrimSilence/project-thoth.git)
Since this is still a prerelease, [Thoth](https://github.com/TheGrimSilence/project-thoth.git) must be started manually

First ensure that all dependencies are installed
```bash
$ npm i
```
...and there you go! If you get an error about `postinstall` not working, see [Install Errors](#install-errors).

Now ensure [Electron](https://electron.atom.io) is installed globally
```bash
$ npm i electron -g
```
Since this is a pre-release, we haven't created an installer just yet.

Now simply type the following
```bash
$ electron .
```
...and now [Thoth](https://github.com/TheGrimSilence/project-thoth.git) is running!

## Install Errors
If you get something along the lines of the snippet below after running the following command, you can ignore it. 

```
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the project-thoth package
,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     tsc -p tslint-rules
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs project-thoth
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls project-thoth
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!     C:\Users\adria\Desktop\Ebongarde\projects\project-thoth\npm-debug.l
og
```
This error is due to unstable commands and code run via:
```json
{
  "scripts": {
    "postinstall": "cd app && npm install && cd .. && git submodule update --recursive --init && npm run compile:tslint"
  } 
}
```
This will be fixed by the time we release beta builds.

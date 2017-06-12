const ipc = electron.ipcRenderer;
const $ = require('jquery');
const marked = require('marked');
const remote = electron.remote;
const mainProcess = remote.require('./main');
const clipboard = remote.clipboard;
const shell = electron.shell;
var currentFile = null;
var code;
var editor;
const $markdownView = $('.raw-markdown');
const $htmlView = $('.rendered-html');
const $openFileButton = $('#open-file');
const $saveFileButton = $('#save-file');
const $copyHtmlButton = $('#copy-html');
const $showInFileSystemButton = $('#show-in-file-system');
const $openInDefaultEditorButton = $('#open-in-default-editor');
const container = document.getElementById('container')

ipc.on('file-opened', function (event, file, content) {
  currentFile = file;
  code = content;
  $showInFileSystemButton.attr('disabled', false);
  $openInDefaultEditorButton.attr('disabled', false);
  renderMarkdownToHtml(content);
});

function renderMarkdownToHtml(markdown) {
  var html = marked(markdown);
  $htmlView.html(html);
}

if (code === undefined) {
  mainProcess.openFile();
}

var FULL_WIDTH = Math.floor($('.workbench').innerWidth());
var HALF_WIDTH = Math.floor(FULL_WIDTH) / 2;

$( window ).on('resize', function(){
  editor.layout()
});

amdRequire(['vs/editor/editor.main'], function() {
	editor = monaco.editor.create(container, {
		value: code,
		language: 'markdown',
    theme:"vs-dark",
    width: 100
	});
  
});

$markdownView.on('keyup', function () {
  var content = editor.getValue();
  renderMarkdownToHtml(content);
});

$openFileButton.on('click', () => {
  mainProcess.openFile();
});

$copyHtmlButton.on('click', () => {
  var html = $htmlView.html();
  clipboard.writeText(html);
});

$saveFileButton.on('click', () => {
  var html = $htmlView.html();
  mainProcess.saveFile(html);
});

$(document).on('click', 'a[href^="http"]', function (event) {
  event.preventDefault();
  shell.openExternal(this.href);
});

$showInFileSystemButton.on('click', () => {
	shell.showItemInFolder(currentFile);
});

$openInDefaultEditorButton.on('click', () => {
	shell.openItem(currentFile);
});

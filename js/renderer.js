const ipc = electron.ipcRenderer;
const $ = require('jquery');
const marked = require('marked');
const remote = electron.remote;
const mainProcess = remote.require('./main');
const clipboard = remote.clipboard;
const shell = electron.shell;
const $markdownView = $('.raw-markdown');
const $htmlView = $('.rendered-html');
const $openFileButton = $('#open-file');
const $saveFileButton = $('#save-file');
const $copyHtmlButton = $('#copy-html');
const $showInFileSystemButton = $('#show-in-file-system');
const $openInDefaultEditorButton = $('#open-in-default-editor');
var currentFile = null;
ipc.on('file-opened', function (event, file, content) {
  currentFile = file;
  $showInFileSystemButton.attr('disabled', false);
  $openInDefaultEditorButton.attr('disabled', false);
  $markdownView.text(content);
  renderMarkdownToHtml(content);
});
function renderMarkdownToHtml(markdown) {
  var html = marked(markdown);
  $htmlView.html(html);
}
$markdownView.on('keyup', function () {
  var content = $(this).val();
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

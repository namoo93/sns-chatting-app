const Sentry = require('@sentry/electron');
const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

Sentry.init({ dsn: 'https://203033abf3434b7799fad90ba296db21@o487415.ingest.sentry.io/6610003' });

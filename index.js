#!/usr/bin/env node
'use strict'

const Registry = require('winreg')
const {BrowserWindow} = require('electron')

const {app} = require('electron')
app.on('window-all-closed', () => {
	app.quit()
})

const user = require("os").userInfo().username


let win;


app.once('ready', () => {
	win = new BrowserWindow({width: 400, height: 400, frame: false, transparent: true, icon: __dirname + '/app/assets/ubuntu.png', resizable: false})
	win.on('closed', () => {
		win = null
	})
	win.loadURL(`file://${__dirname}/app/index.html`)
})

function editReg() {
	const regKey = new Registry({
		hive: Registry.HKCU,
		key: `\\Software\\Classes\\Directory\\background\\shell\\${name}`
	})

	const regSubKey = new Registry({
		hive: Registry.HKCU,
		key: `\\Software\\Classes\\Directory\\background\\shell\\${name}\\command`
	})

	const regParts = [
		{name: '', value: `Open Ubuntu here`},
		{name: 'Icon', value: `"C:\\Users\\${user}\\AppData\\Local\\Microsoft\\WindowsApps\\ubuntu.exe" "-c" "cd %V; exec bash"`}
	]

	regSubKey.set('', Registry.REG_EXPAND_SZ, `"C:\\Users\\${user}\\AppData\\Local\\Microsoft\\WindowsApps\\ubuntu.exe" "-c" "cd %V; exec bash"`, err => err ? console.error(err) : "")

	regParts.forEach(x => {
		regKey.set(x.name, Registry.REG_EXPAND_SZ, x.value, err => err?console.error(err):"")
	})
}
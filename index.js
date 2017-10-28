#!/usr/bin/env node
'use strict'

const Registry = require('winreg')

const path = process.argv[2]
const name = process.argv[3]

const regKey = new Registry({
	hive: Registry.HKCU,
	key: `\\Software\\Classes\\Directory\\background\\shell\\${name}`
})
const regParts = [
	{key: 'command', name: '', value: `${path} "%V"`},
	{name: '', value: `Open ${name} here`},
	{name: 'Icon', value: `${path}`}
]

regParts.forEach(x => {
	regKey.set(x.name, Registry.REG_SZ, x.value, console.error)
})
#!/usr/bin/env node
'use strict'

const Registry = require('winreg')


const path = process.argv[2]
const name = process.argv[3]

if(!path && !name){
	console.log("you'll need to add a path and a name for the option") 
	process.exit()
}


const regKey = new Registry({
	hive: Registry.HKCU,
	key: `\\Software\\Classes\\Directory\\background\\shell\\${name}`
})

const regSubKey = new Registry({
	hive: Registry.HKCU,
	key: `\\Software\\Classes\\Directory\\background\\shell\\${name}\\command`
})

const regParts = [
	{name: '', value: `Open ${name} here`},
	{name: 'Icon', value: `${path}`}
]

regSubKey.set('', Registry.REG_EXPAND_SZ, `"${path}" "%V"`, err => err?console.error(err):"")

regParts.forEach(x => {
	regKey.set(x.name, Registry.REG_EXPAND_SZ, x.value, err => err?console.error(err):"")
})

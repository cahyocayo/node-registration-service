'use strict';

const i18n = require('./i18n.json');

const codes = [];
//expected positive
codes['00'] = {rc: '00', rm: 'Success'};
codes['90'] = {rc: '90', rm: 'User Not Found'};
codes['401'] = {rc: '401', rm: 'Invalid Param'};
codes['500'] = {rc: '500', rm: 'Internal error'};
//expected negative

function mapCodes(rc, lang, queries) {
	if(lang == null) {
		lang = 'en';
	}
	const mappedRC = codes[rc] ? codes[rc].rc : '';
	let message = replaceParams(i18n[rc][lang.toLowerCase()], queries);
	message = message == null ? replaceParams(i18n[rc]['en'], queries) : message;
	return {rc: mappedRC, rm: message};
}

function replaceParams(url, params) {
	if(url && params) {
		for(let i = 0;i < params.length;i++) {
			url = url.replace('${'+ params[i][0] +'}', params[i][1]);
		}    
	}
	return url;
}

module.exports = {
	i18n: mapCodes,
	codes
}
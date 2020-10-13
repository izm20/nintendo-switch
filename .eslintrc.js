module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'standard'
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	rules: {
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		indent: [2, 'tab'],
		'no-tabs': 0
	}
};

module.exports = {
	env: {
		browser: true,
		es2020: true
	},
	extends: [
		'standard'
	],
	parserOptions: {
		ecmaVersion: 10,
		sourceType: 'module'
	},
	rules: {
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		indent: [2, 'tab'],
		'no-tabs': 0
	}
};

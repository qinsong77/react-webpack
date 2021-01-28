module.exports = {
	extends: [
		'alloy',
		'alloy/react',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	env: {
		// 你的环境变量（包含多个预定义的全局变量）
		//
		// browser: true,
		// node: true,
		// mocha: true,
		// jest: true,
		// jquery: true
	},
	globals: {
		// 你的全局变量（设置为 false 表示它不允许被重新赋值）
		//
		// myGlobal: false
	},
	rules: {
		// 自定义你的规则
		'no-invalid-this': 0, // 禁止无效的this，只能用在构造器，类，对象字面量
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error"],
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": ["off"],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
}

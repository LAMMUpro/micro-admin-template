// https://github.com/conventional-changelog/commitlint
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'subject-full-stop': [0, 'never'], // 不允许有结束符号 .
    'subject-case': [0, 'never'], // 必须以小写开头
  },
};

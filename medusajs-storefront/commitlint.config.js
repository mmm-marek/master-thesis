module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  ignores: [(commit) => /^release-*/.test(commit) === true],
}

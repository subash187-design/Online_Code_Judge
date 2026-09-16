function normalizeOutput(str) {
  if (!str) return '';
  return str
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
}

function compareOutput(actual, expected) {
  return normalizeOutput(actual) === normalizeOutput(expected);
}

module.exports = { normalizeOutput, compareOutput };

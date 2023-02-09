/**
 * Language: Fenl
 * Contributors:
 *   Ben Chambers <ben@kaskada.com>
 */
module.exports = function (hljs) {
  const regex = hljs.regex
  const FUNCTION_INVOKE = {
    className: 'title.function.invoke',
    relevance: 0,
    begin: regex.concat(
      /\b/,
      /(?!let|in\b)/,
      hljs.IDENT_RE,
      regex.lookahead(/\s*\(/)),
  }
  const NUMBER_SUFFIX = '([ui](8|16|32|64|128|size)|f(32|64))?'
  const KEYWORDS = [
    '$input',
    'in',
    'let',
  ]
  const LITERALS = [
    'true',
    'false',
    'null',
  ]
  const BUILTINS = [
    // functions
    'if',
    'lookup',
    'when',
  ]
  const TYPES = [
    'i8',
    'i16',
    'i32',
    'i64',
    'u8',
    'u16',
    'u32',
    'u64',
    'f32',
    'f64',
    'string',
    'bool',
  ]
  const STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
    ],
  }
  return {
    name: 'Fenl',
    aliases: ['fenl'],
    disableAutDetection: true,
    keywords: {
      $pattern: hljs.IDENT_RE,
      type: TYPES,
      keyword: KEYWORDS,
      literal: LITERALS,
      built_in: BUILTINS,
    },
    illegal: '</',
    contains: [
      hljs.HASH_COMMENT_MODE,
      STRING,
      {
        className: 'symbol',
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*/,
      },
      {
        className: 'number',
        variants: [
          { begin: '\\b0b([01_]+)' + NUMBER_SUFFIX },
          { begin: '\\b0o([0-7_]+)' + NUMBER_SUFFIX },
          { begin: '\\b0x([A-Fa-f0-9_]+)' + NUMBER_SUFFIX },
          { begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' + NUMBER_SUFFIX },
        ],
        relevance: 0,
      },
      {
        begin: [
          /fn/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE,
        ],
        className: {
          1: 'keyword',
          3: 'title.function',
        },
      },
      {
        className: 'meta',
        begin: '#!?\\[',
        end: '\\]',
        contains: [
          {
            className: 'string',
            begin: /"/,
            end: /"/,
          },
        ],
      },
      {
        begin: [
          /let/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE,
        ],
        className: {
          1: 'keyword',
          3: 'variable',
        },
      },
      FUNCTION_INVOKE,
    ],
  }
}

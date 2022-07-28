# eslint-plugin-sql-pretty

SQL linting rules for ESLint.

based on [https://github.com/gajus/eslint-plugin-sql](eslint-plugin-sql) with improvements

<a name="eslint-plugin-sql-installation"></a>
## Installation

```sh
npm install eslint --save-dev
npm install eslint-plugin-sql-pretty --save-dev
```

## Configuration

1. Add `plugins` section and specify `eslint-plugin-sql-pretty` as a plugin.
1. Enable rules.

```json
{
  "plugins": [
    "sql-pretty"
  ],
  "rules": {
    "sql-pretty/format": [
      2,
      {
        "ignoreExpressions": false,
        "ignoreInline": true,
        "ignoreTagless": true
      },
      {
        "spaces": 2
      }
    ],
    "sql/no-unsafe-query": [
      2,
      {
        "allowLiteral": false
      }
    ]
  }
}

```

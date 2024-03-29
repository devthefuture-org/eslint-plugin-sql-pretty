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
      1,
      {
        "ignoreExpressions": false,
        "ignoreInline": true,
        "ignoreTagless": true,
        "spaces": 2,
        "tags": ["sql","sqlt"]
      }
    ],
    "sql-pretty/no-unsafe-query": [
      2,
      {
        "allowLiteral": false,
        "tags": ["sql","sqlt"]
      }
    ]
  }
}

```

## Contributing:

We welcome contributions! If you encounter a bug or have a feature suggestion, please open an issue. To contribute code, simply fork the repository and submit a pull request.

This repository is mirrored on both GitHub and Codeberg. Contributions can be made on either platform, as the repositories are synchronized bidirectionally. 
- Codeberg: [https://codeberg.org/devthefuture/eslint-plugin-sql-pretty](https://codeberg.org/devthefuture/eslint-plugin-sql-pretty)
- GitHub: [https://github.com/devthefuture-org/eslint-plugin-sql-pretty](https://github.com/devthefuture-org/eslint-plugin-sql-pretty)

For more information:
- [Why mirror to Codeberg?](https://codeberg.org/Recommendations/Mirror_to_Codeberg#why-should-we-mirror-to-codeberg)
- [GitHub to Codeberg mirroring tutorial](https://codeberg.org/Recommendations/Mirror_to_Codeberg#github-codeberg-mirroring-tutorial)
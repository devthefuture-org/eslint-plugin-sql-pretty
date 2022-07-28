// @flow

import {
  generate,
} from 'astring';
import {
  format,
} from 'pg-formatter';
import isSqlQuery from '../utilities/isSqlQuery';

export default (context) => {
  const placeholderRule = context.settings.sql && context.settings.sql.placeholderRule;

  const pluginOptions = context.options && context.options[0] || {};

  const ignoreExpressions = pluginOptions.ignoreExpressions === true;
  const ignoreInline = pluginOptions.ignoreInline !== false;
  const ignoreTagless = pluginOptions.ignoreTagless !== false;
  const matchIndentation = pluginOptions.matchIndentation !== false;

  return {
    TemplateLiteral (node) {
      const sqlTagIsPresent = node.parent.tag && node.parent.tag.name === 'sql';

      if (ignoreTagless && !sqlTagIsPresent) {
        return;
      }

      if (ignoreExpressions && node.quasis.length !== 1) {
        return;
      }

      const magic = '"gajus-eslint-plugin-sql"';

      const literal = node.quasis
        .map((quasi) => {
          return quasi.value.raw;
        })
        .join(magic);

      if (!sqlTagIsPresent && !isSqlQuery(literal, placeholderRule)) {
        return;
      }

      if (ignoreInline && !literal.includes('\n')) {
        return;
      }

      const {spaces, ...formatOptions} = pluginOptions;

      let formatted = format(literal, formatOptions);

      formatted = formatted.trimStart();

      if (matchIndentation) {
        let firstNodeOnLine = node;

        while (
          firstNodeOnLine.parent &&
          firstNodeOnLine.loc.start.line === firstNodeOnLine.parent.loc.start.line
        ) {
          firstNodeOnLine = firstNodeOnLine.parent;
        }

        const startingColumn = firstNodeOnLine.loc.start.column;
        formatted = formatted.replace(/\n+$/g, '') + '\n';
        const formattedLines = formatted.split('\n');
        formatted = formattedLines
          .map((line) => {
            // Indent each subsequent line based on the spaces option
            const indentSpaces = spaces || 2;

            const indentation = ' '.repeat(startingColumn + indentSpaces);

            return `${indentation}${line}`;
          })
          .join('\n');
      }

      formatted = '\n' + formatted.replace(/^\n+/g, '');

      if (formatted !== literal) {
        context.report({
          fix: (fixer) => {
            let final = formatted;

            const expressionCount = node.expressions.length;
            let index = 0;
            while (index <= expressionCount - 1) {
              final = final.replace(magic, '${' + generate(node.expressions[index]) + '}');
              index++;
            }

            return fixer.replaceText(node, '`' + final + '`');
          },
          message: 'Format the query',
          node,
        });
      }
    },
  };
};

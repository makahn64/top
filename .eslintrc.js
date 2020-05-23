module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
    semi: ['warn', 'always',  { "omitLastInOneLineBlock": true }],
    'comma-dangle': [2, 'always-multiline'], // allow or disallow trailing commas
    'no-cond-assign': 1, // disallow assignment in conditional expressions
    'no-console': 1, // disallow use of console (off by default in the node environment)
    'no-debugger': 2, // disallow use of debugger
    'no-ex-assign': 1, // disallow assigning to the exception in a catch block
    'no-unreachable': 1, // disallow unreachable statements after a return, throw, continue, or break statement
    'valid-jsdoc': 1, // Ensure JSDoc comments are valid (off by default)
    'valid-typeof': 1, // Ensure that the results of typeof are compared against a valid string
    'semi-spacing': 0, // require a space after a semi-colon
    'jsx-quotes': [1, 'prefer-double'], // enforces the usage of double quotes for all JSX attribute values which doesn’t contain a double quote
    'comma-spacing': 0,
    'no-multi-spaces': 0,
    'no-nested-ternary': 1, // disallow nested ternary expressions (off by default)
    'no-trailing-spaces': 0, // disallow trailing whitespace at the end of lines
    quotes: [1, 'single', 'avoid-escape'], // specify whether double or single quotes should be used
  }
};

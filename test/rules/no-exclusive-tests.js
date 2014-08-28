'use strict';

var linter = require('eslint').linter,
    ESLintTester = require('eslint-tester'),
    eslintTester = new ESLintTester(linter),
    expectedErrorMessage = 'Unexpected exclusive mocha test.';

eslintTester.addRuleTest('lib/rules/no-exclusive-tests', {

    valid: [
        'describe()',
        'it()',
        'describe.skip()',
        'it.skip()',
        'var appliedOnly = describe.only; appliedOnly.apply(describe)',
        'var calledOnly = it.only; calledOnly.call(it)',
        'var computedOnly = "only"; describe[computedOnly]()'
    ],

    invalid: [
        {
            code: 'describe.only()',
            errors: [ { message: expectedErrorMessage } ]
        },
        {
            code: 'describe["only"]()',
            errors: [ { message: expectedErrorMessage } ]
        },
        {
            code: 'it.only()',
            errors: [ { message: expectedErrorMessage } ]
        },
        {
            code: 'it["only"]()',
            errors: [ { message: expectedErrorMessage } ]
        }
    ]

});

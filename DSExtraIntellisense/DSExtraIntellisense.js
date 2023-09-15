
/**
# DSExtraIntellisense

Version 1.1.1

Additional intellisense for DroidScript not included in the app object.

Adding intellisense to

- cfg - App configurations.
- js-keywords - Javascript keywords.
 */

editor.registerExtension("DSExtraIntellisense", {
    desc: "Additional intellisense for DroidScript not included in the app object.",
    version: "1.1.1"
}, function() {
    var extName = "DSExtraIntellisense";
    
    var code = `
        // Additional app configurations.
        var cfg = {};

        /**
         * @type{String} The default app with no additional styling.
         */
        cfg.Holo = null;

        /**
         * @type{String} Dark material theme.
         */
        cfg.Dark = null;

        /**
         * @type{String} Light material theme.
         */
        cfg.Light = null;

        /**
         * @type{String} Include the Material UI Components.
         */
        cfg.MUI = null;

        /**
         * @type{String} App is Hybrid app that uses the UI Components.
         */
        cfg.Hybrid = null;

        /**
         * @type{String} Force the app orientation to portrait.
         */
        cfg.Portrait = null;

        /**
         * @type{String} Force the app orientation to landscape.
         */
        cfg.Landscape = null;
    `;

	editor.addIntellisense( code );
	
	var keyWords = [
		{text: 'async', doc: 'Declares an asynchronous function (a function that returns a Promise) or an asynchronous arrow function.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function'},
        {text: 'await', doc: 'Used in asynchronous functions to pause the execution until a Promise is resolved.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await'},
        {text: 'break', doc: 'Terminates the current loop or switch statement and transfers control to the next statement outside of the loop or switch.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break'},
        {text: 'case', doc: 'Specifies a value to compare in a switch statement and executes the statements associated with that value.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#The_case_statement'},
        {text: 'catch', doc: 'Catches and handles an exception thrown by a try...catch...finally block.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch'},
        {text: 'class', doc: 'Defines a new class with a constructor and optional methods.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes'},
        {text: 'const', doc: 'Declares a block-scoped variable that is read-only (the value cannot be reassigned).', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const'},
        {text: 'continue', doc: 'Jumps to the next iteration of a loop without executing the remaining code in the current iteration.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue'},
        {text: 'debugger', doc: 'Pauses the execution of JavaScript code and launches the browser\'s debugger.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger'},
        {text: 'default', doc: 'Specifies the default block of code to be executed in a switch statement when no matching case is found.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#The_default_statement'},
        {text: 'delete', doc: 'Deletes an object property or removes an element from an array.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete'},
        {text: 'do', doc: 'Executes a block of code repeatedly until the specified condition is no longer true.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while'},
        {text: 'else', doc: 'Specifies a block of code to be executed if the specified condition is false in an if statement.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else'},
        {text: 'export', doc: 'Used to export functions, objects, or values from a module.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export'},
        {text: 'extends', doc: 'Specifies a class that is to be inherited by another class in class inheritance.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends'},
        {text: 'false', doc: 'Represents a boolean false value.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean'},
        {text: 'finally', doc: 'Specifies a block of code to be executed after a try...catch block, regardless of whether an exception was thrown or caught.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#The_finally_block'},
        {text: 'for', doc: 'Creates a loop that consists of three optional expressions: initialization, condition, and final expression.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for'},
        {text: 'function', doc: 'Defines a function with optional parameters and a function body.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function'},
        {text: 'if', doc: 'Specifies a block of code to be executed if a specified condition is true.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else'},
        {text: 'import', doc: 'Used to import functions, objects, or values into a module.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import'},
        {text: 'in', doc: 'Checks if a specified property is in an object.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in'},
        {text: 'instanceof', doc: 'Checks if an object is an instance of a specific class or constructor.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof'},
        {text: 'let', doc: 'Declares a block-scoped variable that can be reassigned.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let'},
        {text: 'new', doc: 'Creates an instance of a constructor function or a built-in object.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new'},
        {text: 'null', doc: 'Represents a null value or no value.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null'},
        {text: 'return', doc: 'Specifies the value to be returned by a function.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return'},
        {text: 'super', doc: 'Refers to the parent class or constructor of an object.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super'},
        {text: 'switch', doc: 'Evaluates an expression and executes code blocks based on matching cases.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch'},
        {text: 'this', doc: 'Refers to the current object or instance.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this'},
        {text: 'throw', doc: 'Throws an exception to be caught and handled by a try...catch...finally block.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw'},
        {text: 'true', doc: 'Represents a boolean true value.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean'},
        {text: 'try', doc: 'Specifies a block of code to be tested for errors while it is being executed.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch'},
        {text: 'typeof', doc: 'Returns a string that represents the data type of an expression.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof'},
        {text: 'var', doc: 'Declares a function-scoped or globally-scoped variable that can be reassigned or redeclared.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var'},
        {text: 'void', doc: 'Specifies an expression to be evaluated without returning a value.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void'},
        {text: 'while', doc: 'Creates a loop that executes a specified statement as long as the specified condition is true.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while'},
        {text: 'with', doc: 'Specifies a default object for a block of code, allowing shorter syntax for accessing its properties.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with'},
        {text: 'yield', doc: 'Pauses the execution of a generator function and yields a value to the caller.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield'}
    ];
    
    editor.addAutocomplete( keyWords );
});


const ValidationError = require('./ValidationError');

/*
JSON Example
'{ "name": "Yoda", "age": 20 }'
*/

let json = '{ "age": 20 }';
// let badJson = '{bad json}'
     
try {
    let user = JSON.parse(json);

    if (!user.name) {
        throw new ValidationError("'name' is required.");
    }

    if (!user.age) {
        throw new ValidationError("'age' is required.");
    }
 
    console.log(user.name);
    console.log(user.age);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`JSON error: ${error.message}`);
    } else if (error instanceof ValidationError) {
        console.log(`Invalid data: ${error.message}`);
    } else if (error instanceof ReferenceError) {
        console.log(error.message);
    } else {
        console.log(error.stack);
    }
}
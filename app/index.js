import {cat} from './me';

if (process.env.NODE_ENV === 'prod') {
    const jquery = require('jquery-validation');
    console.log('jquery production',jquery);
} else {
    console.log('hello developer');
}

console.log('Hello world', cat);

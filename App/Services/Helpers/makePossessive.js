
const makePossessive = firstName => {
    if (!firstName) {
        return 'NoName\'s';
    } // should never happen
    const lastChar = firstName[firstName.length - 1];
    if (lastChar.toLowerCase() === 's') {
        return `${firstName}'`;
    }
    return `${firstName}'s`;
}

export default makePossessive;

// Helper JS Functions for Backend
// Author: Samuel Adamson

// Yesterday's date  
function totalCapDate() { 
    let time = new Date();
    time.setDate(time.getDate() - 1)

    return time.toISOString();
}

// Converts floats to short form, 300,000,000 => 300 M; 2,165,100 => 2.165 M 
function toShort(inFloat) {
    // Check null
    if(!inFloat || inFloat == 'null') {
        return null;
    }

    // Remove decimals and convert to string
    let floatStr = Math.round(inFloat).toString();
    // Store length
    let floatLen = floatStr.length;

    if(floatLen > 12) { // Trillion
        // Drop last 9 characters
        floatStr = floatStr.slice(0, -10);
        // Add decimal
        floatStr = floatStr.slice(0, -2) + '.' + floatStr.slice(-2,);

        if(floatStr.length >= 6) { // Take Substring
            floatStr = floatStr.substring(0,3);
        } else {
            floatStr = floatStr.substring(0,4);
        }

        return [floatStr, 'T']; // Return String and postfix 

    } else if(floatLen > 9) { // Billion
        // Drop last 6 characters
        floatStr = floatStr.slice(0, -7);
        // Add decimal
        floatStr = floatStr.slice(0, -2) + '.' + floatStr.slice(-2,);

        if(floatStr.length >= 6) { // Take Substring
            floatStr = floatStr.substring(0,3);
        } else {
            floatStr = floatStr.substring(0,4);
        } 

        return [floatStr, 'B']; // Return String and postfix

    } else if(floatLen > 6) { // Million
        // Drop last 3 characters
        floatStr = floatStr.slice(0, -4);
        // Add decimal
        floatStr = floatStr.slice(0, -2) + '.' + floatStr.slice(-2,);

        if(floatStr.length >= 6) { // Take Substring
            floatStr = floatStr.substring(0,3);
        } else {
            floatStr = floatStr.substring(0,4);
        } 

        return [floatStr, 'M']; // Return String and postfix

    } else {
        // Number not large enough
        return floatStr;
    }
}

// Modify change value to include +/-
function changeMod(inFloat) {
    // Edit Decimal places
    inFloat = inFloat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // Check positive, add +
    if(inFloat > 0) {
        return ['+', inFloat];
    } else {
        return ['', inFloat];
    }
}

// Modify values to 2 decimal places and add ','
function trim(inFloat) { // In: 123456.789; Out: 123,456.79
    return(inFloat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
}

// Exports
exports.totalCapDate = totalCapDate;
exports.toShort = toShort;
exports.changeMod = changeMod;
exports.trim = trim;
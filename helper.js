// Helper JS Functions for Backend
// Author: Samuel Adamson

// Yesterday's date  
function totalCapDate() { 
    let time = new Date();
    time.setDate(time.getDate() - 1)

    return time.toISOString();
}

// -- Chart date functions --
function now() { // Returns now timestamp Unix Epoch
    // Now -- ms
    let now = Date.now();
    now = Math.round(now / 1000);

    return(now)
}

function oneDay() { // Returns yesterday
    let yesterday = new Date;
    yesterday = yesterday.setDate(yesterday.getDate() - 1);
    yesterday = Math.round(yesterday / 1000);

    // Return dates
    return(yesterday);
}

function sevenDay() { // Returns 7 days ago
    let sevenAgo = new Date;
    sevenAgo = sevenAgo.setDate(sevenAgo.getDate() - 30);
    sevenAgo = Math.round(sevenAgo / 1000);

    // Return dates
    return(sevenAgo);
}

function thirtyDay() { // Returns 30 days ago
    let thirtyAgo = new Date;
    thirtyAgo = thirtyAgo.setDate(thirtyAgo.getDate() - 7);
    thirtyAgo = Math.round(thirtyAgo / 1000);

    // Return dates
    return(thirtyAgo);
}

function year() { // Returns year ago
    let yearAgo = new Date;
    yearAgo = yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    yearAgo = Math.round(yearAgo / 1000);

    // Return dates
    return(yearAgo);
}

// -- Formatting Functions --
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
// Charting Exports
exports.now = now;
exports.oneDay = oneDay;
exports.sevenDay = sevenDay;
exports.thirtyDay = thirtyDay;
exports.year = year;
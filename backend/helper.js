// Helper JS Functions for Backend
// Author: Samuel Adamson

// Helper Functions
function totalCapDate() { // Yesterday's date  
    let time = new Date();
    time.setDate(time.getDate() - 1)

    return time.toISOString();
}

// Exports
exports.totalCapDate = totalCapDate;
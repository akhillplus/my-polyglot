const RE_CSV_VALID = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
const RE_CSV_ONE_OF_FIRST_TWO_CLMNS_EMPTY = /^(?:(?:\s*,\s*)|(?:\s*,[^\r\n]+)|(?:[^\r\n]+,\s*))(?:,|$)/;
const RE_CSV_VALUE = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

export function isCSVvalid(text) {
    if (text.replace(/^\s+|\s+$/g, '') === '') return false; // not to skip empty strings 
    if (!RE_CSV_VALID.test(text)) return false;
    if (RE_CSV_ONE_OF_FIRST_TWO_CLMNS_EMPTY.test(text)) return false; // mine
    return true;
}

export function isTabTextValid(text) {
    if (text.replace(/^\s+|\s+$/g, '') === '') return false; // not to skip empty strings
    
    let a = text.split(/\t/g);
    if (a.length < 2) return false;
    else
        for (let i = 0; i < 2; i++)
            if (a[i].trim() === '') return false;
    return true;
}

export function CSVtoArray(text) {
    // Return NULL if input string is not well formed CSV string.
    // if (!re_valid.test(text)) return null;
    let a = [];                     // Initialize array to receive values.
    text.replace(RE_CSV_VALUE, // "Walk" the string using replace with callback.
        function(m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
}

export function TabTextToArray(text) {

    let a = text.split(/\t/);
    if(a.length < 2) return null;
    return a;
}
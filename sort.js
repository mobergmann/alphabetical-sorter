/**
 * checks if a given char is a-z or A-Z.
 * 
 * @param {char} c a string with only one element
 */
function is_lat_char(c) {
    let ascii = c[0].charCodeAt(0);

    if ((ascii > 96 && ascii < 123) || (ascii > 64 && ascii < 91))
    {
        return true;
    }

    return false;
}

/**
 * Checks if a string is smaller (alphabetically before) than another string.
 * 
 * @param {string} left 
 * @param {string} right 
 */
function is_smaller(left, right)
{
    for (let i = 0; i < left.length && i < right.length; i++)
    {
        if (left[i] != right[i])
        {
            const char_left = left[i];
            const char_right = right[i];

            if (is_lat_char(char_left) && is_lat_char(char_right))
            {
                let left_ascii = char_left.charCodeAt(0);
                let right_ascii = char_right.charCodeAt(0);

                // is lower chase norm to upper case, but one less important (A -> b)
                if (left_ascii > 96)
                {
                    left_ascii = (left_ascii % 97) * 2 + 1;
                }
                else
                {
                    left_ascii = (left_ascii % 65) * 2;
                }
                
                // is lower chase norm to upper case, but one less important (A -> b)
                if (right_ascii > 96)
                {
                    right_ascii = (right_ascii % 97) * 2 + 1;
                }
                else
                {
                    right_ascii = (right_ascii % 65) * 2;
                }
                
                return left_ascii < right_ascii;
            }
            else
            {
                return left < right;
            }
        }
    }

    return left.length <= right.length;
}

function merge(left, right)
{
    let arr = [];

    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
    
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (is_smaller(left[0], right[0]))
        {
            arr.push(left.shift());
        }
        else
        {
            arr.push(right.shift());
        }
    }

    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [...arr, ...left, ...right];
}


function merge_sort(array)
{
    const half = array.length / 2;

    // Base case or terminating case
    if (array.length < 2)
    {
        return array;
    }

    const left = array.splice(0, half);
    return merge(merge_sort(left), merge_sort(array));
}


let whitespace_regex = new RegExp("^[\\n\\r\\s]+$");
function is_whitespace(str)
{
    return str.match(whitespace_regex);
}

function sort(text)
{
    // split the arrays into subarrays
    let lines = text.split("\n");
    
    // remove empty lines
    for (let i = 0; i < lines.length; i++)
    {
        const str = lines[i];
        if (is_whitespace(str) || !(lines[i].length > 0))
        {
            lines.splice(i, 1);
            --i;
        }
    }

    // sort the array
    let sorted = merge_sort(lines);

    // combine sorted string array into single string
    let txt = "";
    sorted.forEach(str => {
        txt += str + "\n";
    });

    // display sorted lines
    document.getElementById("txt_out").value = txt;
}




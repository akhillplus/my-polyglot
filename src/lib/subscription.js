export function donate(sum, subscription, wasDonatedTo = null)
{
    let donatedTo = wasDonatedTo ? wasDonatedTo : Date.now() + sum/subscription * 30 * 24 * 60 * 60 * 1000;
    return donatedTo;
};

export function subscribe(sum)
{
    let paidupTo = null;
    return paidupTo;
};

export function timeAfter(date)
{
    return Date.now() - date * 1000;
}

function itIsTimeTo(date)
{
    return timeAfter(date) >= 0;
}

export function itIsToDonate(donatedTo)
{
//     startLive = new Date(<?php echo strtotime($start_date)*1000; ?>);
// Explanation:
// PHP's strtotime function returns a Unix timestamp (seconds since 1-1-1970 at midnight).
// Javascript's Date() function can be instantiated by specifying milliseconds since 1-1-1970 at midnight.
// So multiply seconds by 1000 and you get milliseconds, which you can use in Javascript.
// let current_datetime = new Date(); console.log(current_datetime.toUTCString());
    return itIsTimeTo(donatedTo);    
};

export function itIsToSubscribe(paidupTo)
{
    return itIsTimeTo(paidupTo);    
};
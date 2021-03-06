'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {

    if (value.search('GMT') !== -1 && !/GMT\+[0-9]{4}$/.test(value) && !/GMT$/.test(value)) {
        value += '00';  
    }
    
    return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
    return Date.parse(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {

    var thisDate = new Date(date);
    var year = thisDate.getFullYear();
    if (year % 400 == 0) {
        return true;
    } else if (!(year % 100 == 0) && year % 4 == 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {

    var HOUR_MS = 3600000;
    var MINUTE_MS = 60000;
    var SECOND_MS = 1000;

    var start = new Date(startDate);
    var end = new Date(endDate);
    var span = end.getTime() - start.getTime();

    var ms = span % SECOND_MS;
    var seconds = (span % MINUTE_MS - ms) / SECOND_MS;
    var minutes = (span % HOUR_MS - seconds * SECOND_MS - ms) / MINUTE_MS;
    var hours = (span - span % HOUR_MS) / HOUR_MS;

    if (hours === 0) { hours = '00'; } 
    else if (hours < 10) { hours = '0' + hours.toString(); }

    if (minutes === 0) { minutes = '00'; }
    else if (minutes < 10) { minutes = '0' + minutes.toString(); }

    if (seconds === 0) { seconds = '00'; }
    else if (seconds < 10) { seconds = '0' + seconds.toString(); }

    if (ms === 0) { ms = '000'}
    else if (ms < 100) { hours = '0' + ms.toString(); }
    else if (ms < 10) { hours = '00' + ms.toString(); }

    return `${hours}:${minutes}:${seconds}.${ms}`;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {

    var hours = Number.parseFloat(date.getUTCHours());
    var minutes = Number.parseFloat(date.getUTCMinutes());

    var minutesArrowAngle = minutes * 360 / 60;
    var hoursArrowAngle = ((hours % 12) + minutes / 60) * 360 / 12;

    var angle = Math.abs(hoursArrowAngle - minutesArrowAngle);
    if (angle > 180) { angle = 360 - angle; }

    return angle * Math.PI / 180;
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};

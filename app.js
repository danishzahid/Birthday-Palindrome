var dateInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var result = document.querySelector("#result");

function clickHandler(e){
    var bdayStr = dateInput.value;  //yyyy-mm-dd

    if(bdayStr !== "" ){
        var listOfdate = bdayStr.split("-");  //['yyyy'. 'mm', 'dd']
        
        var date = {
            day : Number(listOfdate[2]), //yyyy
            month : Number(listOfdate[1]), //mm
            year : Number(listOfdate[0])  //dd

        };

        var isPalindrome2 = checkPalindromeforAll(date);

        if(isPalindrome2){
            result.innerText = " Yay! Your BirthDay is Palindrome!!!";
        }
        else{
            var  [count, nextDate] = getNextPalindromDate(date);
            result.innerText = `Nope!! Yr Bday is not a palindrome. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${count} days. `
        }
    }
}

showBtn.addEventListener("click", clickHandler);



function reverseStr(str){
  
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    var reversedStr = reverseStr(str);
    if(str===reversedStr){
        return true ;
    }else{
    return false;
    }
}


function convertToStr(date){
    var dateStr = {day:"", month:"", year:""};

    if(date.day<10){
        dateStr.day = "0" + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month<10){
        dateStr.month = "0" + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy   = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy   = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd   = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeforAll(date){
    var listOfFormats = getAllDateFormats(date);
    var isPalindromeVar = false;
    for(var i = 0; i < listOfFormats.length; i++){
        if(isPalindrome(listOfFormats[i])){
            isPalindromeVar = true;
            break;
        }
    }

    return isPalindromeVar;
}

function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }

    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31, 30,31];

    if(month===2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day>daysInMonth[month-1]){
            day = 1;
            month++;
     }
    }
    if(month>12){
        month = 1;
        year++;
    }
 return {
    day : day,
    month : month,
    year : year
 };
}

function getNextPalindromDate(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(true){
        count++;
        var isNewDatePalindrome = checkPalindromeforAll(nextDate);
        if(isNewDatePalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}

// function getPrevDate(date){
//     var day = date.day - 1;
//     var month = date.month;
//     var year = date.year;

//     var daysInMonth = [31,28,31,30,31,30,31,31,30,31, 30,31];

//     if(month===2){
//         if(isLeapYear(year)){
//             if(day>29){
//                 day = 1;
//                 month++;
//             }
//         }
//     }
//     else{
//         if(day>daysInMonth[month-1]){
//             day = 1;
//             month++;
//      }
//     }
//     if(month>12){
//         month = 1;
//         year++;
//     }
//  return {
//     day : day,
//     month : month,
//     year : year
//  };
// }

// function getPrevPalindromDate(date){
//     var count = 0;
//     var prevDate = getPrevtDate(date);

//     while(true){
//         count++;
//         var isNewDatePalindrome = checkPalindromeforAll(prevDate);
//         if(isNewDatePalindrome){
//             break;
//         }
//         prevDate = getPrevDate(prevDate);
//     }
//     return [count, prevDate];
// }



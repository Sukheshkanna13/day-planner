//create a moment.js instance

const ourMomentInstance = moment()

//define some global variables
let timesArr = [9,10,11,12,13,14,15,16,17]

//define some functions

const updateHeaderWithDay = () => {
  $('#currentDay').text(ourMomentInstance.format('dddd, MMMM Do'))
}

const convert24Hto12H = (aNum) => {
  return aNum > 12? [aNum - 12, true] : [aNum, false]
}

const convert12Hto24H = (aNum,afterNoon) => {
  return afterNoon? aNum + 12 : aNum
}

const createAllTimeBlocks = (timesArr) => {
// create some # of time blocks, from X time to Y time
// give each timeblock the row and timeblock classes
// create 3 cols in the time block
// a col-1 for the time
// with the hour class
// a col-10 for the main body of the timeblock
// using updateTimeBlockColor to assign it a color
// with a <p> tag for the description
// with a <textarea> to type in text
// and a col-1 for the save button
}

const updateEverything = () => {
// this function will be placed inside a setInterval
// update the day
updateHeaderWithDay()
// update each timeblock, depending on whether it is now in the past, present, or future
// use jQuery to get the list of timeblocks
// use.map() to apply an updater function to each timeblock
}

const updateTimeBlockColor = (aTimeBlock) => {
// if the timeblock has a past, present, or future class, remove it
// if it is in the past now, add the past class
// if it is in the present now, add the present class
// if it is in the future now, add the future class
// return the timeblock
}

const saveCurrentTimeBlockContent = () => {

}

//run some functions

updateHeaderWithDay()
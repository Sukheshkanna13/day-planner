//create a moment.js instance

const ourMomentInstance = moment()

//define some global variables

//define some functions

const updateHeaderWithDay = () => {
  $('#currentDay').text(ourMomentInstance.format('dddd, MMMM Do'))
}

const createAllTimeBlocks = () => {
// create some # of time blocks, from X time to Y time
// give each timeblock the row and timeblock classes
// create 3 cols in the time block
// a col-1 for the time
// with the hour class
// a col-10 for the main body of the timeblock
// with the past, present, or future classes
// based on whether it is in the past, present, or future
// with a <p> tag for the description
// with a <textarea> to type in text
// and a col-1 for the save button
}

//run some functions

updateHeaderWithDay()
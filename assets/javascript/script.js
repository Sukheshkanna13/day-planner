//create a moment.js instance

const ourMomentInstance = moment()

//define some global variables

//define some functions

const updateHeaderWithDay = () => {
  $('#currentDay').text(ourMomentInstance.format('dddd, MMMM Do'))
}

const createAllTimeBlocks = () => {

}

//run some functions

updateHeaderWithDay()
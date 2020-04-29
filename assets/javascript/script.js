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

const createAllTimeBlocks = (myArr) => {
// create some # of time blocks, from X time to Y time
for (let index in myArr){
  let timeStart = myArr[index]
  console.log(`building timeBlock ${timeStart}`)
// give each timeblock the row and timeblock classes
  let newTimeBlock = $('<div></div>')
  newTimeBlock.addClass("row timeblock")
// create 3 cols in the time block
// a col-1 for the time label
// with the hour class
  let timeLabel = $('<div></div>')
  timeLabel.addClass('col-1 hour')
// and a <p> tag containing the time, with P.M. or A.M. as appropriate
  timeLabel.append($(`<p>${convert24Hto12H(timeStart)[0]}${convert24Hto12H(timeStart)[1]? 'PM' : 'AM'}</p>`))
// a col-10 for the main body of the timeblock
// using updateTimeBlockColor to assign it a color
  let mainBody = $('<div></div>')
  mainBody.addClass('col-10')
  mainBody = updateTimeBlockColor(mainBody)
// with a <p> tag for the description
  let myDesc = $('<p></p>')
  myDesc.addClass('description')
  myDesc.attr('id',`desc${timeStart}`)
  mainBody.append(myDesc)
// with a <textarea> to type in text
  mainBody.append($(`<textarea id = "text${timeStart}"></textarea>`))
// and a col-1 for the save button
  mySaveArea = $('<div></div>')
  mySaveSpan = $('<span></span>')
  mySaveSpan.addClass("fas fa-save align-middle")
  mySaveArea.append(mySaveSpan)
  mySaveArea.addClass('col-1 saveBtn text-center')
// append them to the timeBlock
  newTimeBlock.append(timeLabel)
  newTimeBlock.append(mainBody)
  newTimeBlock.append(mySaveArea)
// append the new timeBlock to the container
  $('.container').append(newTimeBlock)
}




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
aTimeBlock.removeClass("past present future")
// if it is in the past now, add the past class
// if it is in the present now, add the present class
// if it is in the future now, add the future class
// return the timeblock
return aTimeBlock
}

const saveCurrentTimeBlockContent = () => {
// save the value entered into the current timeblock's textarea in localStorage
// add it to the current timeblock's <p> tag
// clear the textarea
}

//run some functions

updateHeaderWithDay()
createAllTimeBlocks(timesArr)
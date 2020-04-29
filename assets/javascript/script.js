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
  let newTimeBlock = $('<div></div>')
// give each timeblock the row and timeblock classes
  newTimeBlock.addClass("row timeblock")
// create 3 cols in the time block
// a col-1 for the time label
// with the hour class
  let timeLabel = $('<div></div>')
  timeLabel.addClass('col-1 hour text-right')
// and a <p> tag containing the time, with P.M. or A.M. as appropriate
  timeLabel.append($(`<p class = "mt-3">${convert24Hto12H(timeStart)[0]}${convert24Hto12H(timeStart)[1]? 'PM' : 'AM'}</p>`))
// a col-10 for the main body of the timeblock
  let mainBody = $('<div></div>')
// give the mainbody a data attribute indicating what hour it starts at
  mainBody.data('start', timeStart)
  // console.log(`added data to block main body ${timeStart}: ${mainBody.data('start')}, type ${typeof (mainBody.data('start'))}`)
  mainBody.addClass('col-10 pl-0')
// use updateTimeBlockColor to assign it a color
  // console.log(`updating color of block ${timeStart}`)
  mainBody = updateTimeBlockColor(mainBody)
// with a <textarea> to type in text
  mainBody.append($(`<textarea id = "text${timeStart}" class = "h-100 w-100 description" ></textarea>`))
// and a col-1 for the save button
  mySaveArea = $('<div></div>')
  mySaveSpan = $('<i></i>')
  mySaveSpan.addClass("fas fa-save align-self-center ml-4")
  mySaveArea.append(mySaveSpan)
  mySaveArea.addClass('col-1 saveBtn d-flex h-100')
  mySaveArea.attr('id',`save${timeStart}`)
// append them to the timeBlock
  newTimeBlock.append(timeLabel)
  newTimeBlock.append(mainBody)
  newTimeBlock.append(mySaveArea)
// append the new timeBlock to the container
  $('.container').append(newTimeBlock)
// if there's already a value in localStorage for the textarea, set it to that
  console.log(localStorage.getItem(`savedText${timeStart}`))
  if (localStorage.getItem(`savedText${timeStart}`)) {
    $(`#text${timeStart}`).text(localStorage.getItem(`savedText${timeStart}`))
  }
} //end of for loop
} //end of function

const updateEverything = () => {
// this function will be placed inside a setInterval
// update the day
updateHeaderWithDay()
// update each timeblock, depending on whether it is now in the past, present, or future
// use jQuery to get the list of timeblocks
// use.map() to apply an updater function to each timeblock
// would be a wonderful way to do this if I understood jQuery lists or jQuery .map()
// but we're just gonna re-create all the timeblocks from scratch
$('.container').html('')
createAllTimeBlocks(timesArr)
//re-add the event listeners
  $('.saveBtn').click(event => {
    saveCurrentTimeBlockContent(event)
    console.log('save button pressed')
  })
}

const updateTimeBlockColor = (aTimeBlockBody) => {
// if the timeblock has a past, present, or future class, remove it
  aTimeBlockBody.removeClass("past present future") //I think this has no effect if the class isn't there. The code works so ¯\_( ツ )_/¯
  // console.log('removed classes')
// if it is in the past now, add the past class
  if (aTimeBlockBody.data('start') < parseInt(ourMomentInstance.format('H'))){
    aTimeBlockBody.addClass("past")
  }
// if it is in the present now, add the present class
  else if (aTimeBlockBody.data('start') == parseInt(ourMomentInstance.format('H'))){ //weak typing == is intentional here
    aTimeBlockBody.addClass("present")
  }
// if it is in the future now, add the future class
  else if (aTimeBlockBody.data('start') > parseInt(ourMomentInstance.format('H'))){
    aTimeBlockBody.addClass("future")
  }
// return the timeblock
  return aTimeBlockBody
}

const saveCurrentTimeBlockContent = (anEvent) => {
  // console.log("Saving current timeblock content...")
  currentTimeBlock = anEvent.currentTarget.id.slice(4)
  // console.log(currentTimeBlock)
// save the value entered into the current timeblock's textarea in localStorage
  localStorage.setItem(`savedText${currentTimeBlock}`,$(`#text${currentTimeBlock}`).val())
}

//run some functions

updateHeaderWithDay()
createAllTimeBlocks(timesArr)

//add an event listener to the save button areas
$('.saveBtn').click(event => {
  saveCurrentTimeBlockContent(event)
  console.log('save button pressed')
})

//set an interval to update the page

setInterval(updateEverything,10000)
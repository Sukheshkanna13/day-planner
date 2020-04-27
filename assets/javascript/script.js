/*

DONE
======
1. Lots of refactoring with jQuery
2. Create non-bad click-in behavior (basically did this accidentally but hey it works)

TO DO
======
1. Submitting the element mouseover form

*/

//Declaring and initializing global variables
let timeBlocks = []

const today = moment()

let n = 9 //# of timeblocks to create

class timeBlock {
  constructor(aTime,aLaterTime){
    this.start = aTime;
    this.end = aLaterTime;
    this.hasEvent = false
    this.title = ''
    this.description = ''
  }
}

//Running startup
timeBlockStartup()
updateHeader()
timeBlockDisplayer()
addEventListeners()
$("button").hide() //hide the save buttons on the timeblocks
$('.form-group').hide() //hide the form fields


//Setting an interval to update the page
timeBlockRefresher = setInterval(() => {
  console.log('refreshed blocks and header')
  updateHeader() //redo all the stuff
  timeBlockDisplayer()
  $("button").hide()
  $('.form-group').hide()
  addEventListeners()
  }
  , 10000);

//Adding unique event listeners to each timeblock via its col (Bootstrap column) element
function addEventListeners(){
  for (let i = 8; i < n + 8; i++) {
    $("#col"+i).click(function () {
      console.log(`I love col ${i}!`)
      $(this).toggleClass('m-1')
      $("#" + `saveBtn${i}`).toggle()
      $("#" + `form${i}`).toggle()
    })
    $("#col" + i).hover(function () {
      
      })
    $("#saveBtn" + i).click(function () {
      console.log(`Save me ${i}-Kenobi! You're my only hope!`)
    })
  }
}

//Updating the header with the current date
function updateHeader(){
  $("#header").text(today.format('dddd LL'))
  // dddd LL = (long name of this weekday in this locale) (normal date format in this locale)
}

//Creating the list of timeblocks
function timeBlockStartup(){
  for(let i = 8; i < n+8; i++){
    newTimeBlock = new timeBlock(i,i+1)
    timeBlocks.push(newTimeBlock)
  }
}

//Displaying the timeblocks
function timeBlockDisplayer(){
  $('#timeblocks').html(``) //clear the div
  for(let index in timeBlocks){ //rewrite the div
    $('#timeblocks').append(
      divMaker(timeBlocks[index])
      )
  }
}

//Making each timeblock for display
function divMaker(thisTimeBlock){
  let myRow = $("<div>") //create a div

  myRow.addClass("row") //make it a Bootstrap row

  //check if the current time block is in the past, the present, or the future
  let isPast = thisTimeBlock.start < parseInt(today.format('H'))
  let isPresent = thisTimeBlock.start == parseInt(today.format('H'))
  let isFuture = thisTimeBlock.start > parseInt(today.format('H'))
  let bgColor //create bgColor so we can assign it in the following if statement

  if(isPast){
    bgColor = 'dark'
  }
  else if (isPresent){
    bgColor = 'warning'
  }
  else{
    bgColor = 'info'
  }

  let myCol = $('<div>')//create another div

  myCol.addClass(`col bg-${bgColor} py-2 border rounded`)

  myCol.attr('id', `col${thisTimeBlock.start}`)

  myCol.html(`<h3>${thisTimeBlock.start > 12 ? thisTimeBlock.start - 12 + 'pm' : thisTimeBlock.start + 'am'} - ${thisTimeBlock.end > 12 ? thisTimeBlock.end - 12 + 'pm' : thisTimeBlock.end + 'am'}</h3>\n <p id = "desc${thisTimeBlock.start}"></p>
  
  <form>
  <div id = "form${thisTimeBlock.start}" class="form-group">
    <label for="desc">Event description</label>
    <input type="text" class="form-control" id="desc" placeholder="Describe the event">
  </div>
  </form>
  
  <button id = "saveBtn${thisTimeBlock.start}" class = "btn btn-primary float-right">Save</button>`) 

  myRow.append(myCol)

  return myRow
}
/*

DONE
======
1. Lots of refactoring with jQuery
2. Create non-bad click-in behavior (basically did this accidentally but hey it works)
3. reworked clickedIn- timeBlockDisplayer will not be re-run if any boxes are currently open
4. Submitting the element mouseover form
5. Change <p> color to white when background is dark
6. Rework clickedIn again- not clearing when all elements clicked out


TO DO
======
1. Rebuild the entire application, but better.

*/

//Declaring and initializing global variables
let timeBlocks = []

const today = moment()

let n = 9 //# of timeblocks to create

let clickedIn = [] //which timeblocks are we clicked into?

class timeBlock {
  constructor(aTime,aLaterTime){
    this.start = aTime;
    this.end = aLaterTime;
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
  console.log('refreshing header')
  updateHeader() //redo all the stuff
  if(!(clickedIn.includes(true))){ //if none of the blocks are clicked in
    console.log('refreshing blocks')
    timeBlockDisplayer()
    $("button").hide()
    $('.form-group').hide()
    addEventListeners()
  }
  }
  , 1000);

//Adding unique event listeners to each timeblock via its col (Bootstrap column) element
function addEventListeners(){
  for (let i = 8; i < n + 8; i++) {
    $("#hText"+i).click(function () {
      if(clickedIn[i-8]){
        clickedIn[i-8] = false //need to rework this
      }else{
        clickedIn[i-8] = true
      }
      console.log(`I love col ${i}!`)
      $(this).toggleClass('m-1')
      $("#" + `saveBtn${i}`).toggle()
      $("#" + `form${i}`).toggle()
    })
    $("#saveBtn" + i).click(function () {
      console.log(`Save me ${i}-Kenobi! You're my only hope!`)
      console.log(`formDesc${i}`)
      console.log($(`#formDesc${i}`).val())
      $(`#desc${i}`).text($(`#formDesc${i}`).val())
      localStorage.setItem(`blockDesc${i}`, $(`#formDesc${i}`).val())
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
    let newTimeBlock = new timeBlock(i,i+1)
    timeBlocks.push(newTimeBlock)
    clickedIn.push(false)
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
  let textColor

  if(isPast){
    bgColor = 'bg-dark'
    textColor = 'text-white'
  }
  else if (isPresent){
    bgColor = 'bg-warning'
    textColor = 'text-black'
  }
  else{
    bgColor = 'bg-info'
    textColor = 'text-black'
  }

  let myCol = $('<div>')//create another div

  myCol.addClass(`col ${textColor} ${bgColor} py-4 border rounded`)

  myCol.attr('id', `col${thisTimeBlock.start}`)

  myCol.html(`<h3 class = "${bgColor == 'bg-dark' ? 'bg-dark' : ''}" id = "hText${thisTimeBlock.start}">${thisTimeBlock.start > 12 ? thisTimeBlock.start - 12 + 'pm' : thisTimeBlock.start + 'am'} - ${thisTimeBlock.end > 12 ? thisTimeBlock.end - 12 + 'pm' : thisTimeBlock.end + 'am'}</h3>\n <p id = "desc${thisTimeBlock.start}">${localStorage.getItem(`blockDesc${thisTimeBlock.start}`) ? localStorage.getItem(`blockDesc${thisTimeBlock.start}`) : ''}</p>
  
  <form>
  <div id = "form${thisTimeBlock.start}" class="form-group">
    <label for="desc${thisTimeBlock.start}">     </label>
    <!-- label is used to add some spacing below the h3 -->
    <input type="text" class="form-control" name = "formDesc${thisTimeBlock.start}" id="formDesc${thisTimeBlock.start}" placeholder="Describe the event">
  </div>
  </form>
  
  <button id = "saveBtn${thisTimeBlock.start}" class = "btn btn-primary float-right">Save</button>`) 

  myRow.append(myCol)

  return myRow
}
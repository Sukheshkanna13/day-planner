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


//Setting an interval to update the page
timeBlockRefresher = setInterval(() => {
  console.log('refreshed blocks and header')
  updateHeader()
  timeBlockDisplayer()
  $("button").hide()
  removeEventListeners()
  addEventListeners()
  }
  , 10000);


function removeEventListeners(){
  for (let i = 8; i < n + 8; i++) {
    $("#col" + i).off('click')
  }
}

function addEventListeners(){
  for (let i = 8; i < n + 8; i++) {
    $("#col"+i).click(function () {
      console.log(`I love col ${i}!`)
    })
  }
}

//Updating the header with the current date
function updateHeader(){
  document.getElementById("header").textContent = today.format('dddd LL')
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
  document.getElementById('timeblocks').innerHTML = ``
  for(let index in timeBlocks){
    document.getElementById('timeblocks').append(
      divMaker(timeBlocks[index])
      )
  }
}

//Making each timeblock for display
function divMaker(thisTimeBlock){
  let myRow = document.createElement('div') //create a div

  myRow.classList.add("row") //make it a Bootstrap row

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

  let myCol = document.createElement('div')//create another div

  myCol.classList.add("col","bg-"+bgColor, 'py-2','border','rounded')

  myCol.id = `col${thisTimeBlock.start}`

  //add a hover thing too later

  myRow.appendChild(myCol)

  myCol.innerHTML = `<h3>${thisTimeBlock.start > 12 ? thisTimeBlock.start - 12 + 'pm' : thisTimeBlock.start + 'am'} - ${thisTimeBlock.end > 12 ? thisTimeBlock.end - 12 + 'pm' : thisTimeBlock.end + 'am'}</h3>\n <p id = "desc${thisTimeBlock.start}"></p>\n <button id = "saveBtn${thisTimeBlock.start}" class = "btn btn-primary float-right">Save</button>`

  return myRow
}
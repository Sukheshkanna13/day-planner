//Declaring and initializing global variables
let timeBlocks = []

const today = moment()

class timeBlock {
  constructor(aTime,aLaterTime){
    this.start = aTime;
    this.end = aLaterTime;
    this.hasEvent = false
    this.title = ''
    this.description = ''
  }
}

updateHeader()
timeBlockStartup()
timeBlockDisplayer()

function updateHeader(){
  document.getElementById("header").textContent = today.format('dddd LL')
  // dddd LL = (long name of this weekday in this locale) (normal date format in this locale)
}

function timeBlockStartup(){
  let n = 9
  for(let i = 8; i < n+8; i++){
    newTimeBlock = new timeBlock(i,i+1)
    timeBlocks.push(newTimeBlock)
  }
}

function timeBlockDisplayer(){
  for(let index in timeBlocks){
    document.getElementById('timeblocks').append(
      divMaker(timeBlocks[index])
      )
  }
}

function divMaker(thisTimeBlock){
  let myDiv = document.createElement('div')
  //Display it differently depending on whether it is or is not complete
  myDiv.innerHTML = `<div id ="tb${thisTimeBlock.start}"class="card">
    <h5 class="card-header">${thisTimeBlock.start} - ${thisTimeBlock.end}</h5>
    <div class="card-body">
      <p class="card-text">${thisTimeBlock.description}</p>
    </div>
    </div>`
  return myDiv
}
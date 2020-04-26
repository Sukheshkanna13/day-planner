//Declaring and initializing global variables
let timeBlocks = []

const today = moment()

class timeBlock {
  constructor(aTime,aLaterTime){
    this.start = aTime;
    this.end = aLaterTime;
    this.hasEvent = false
    this.title = 'a'
    this.description = 'a'
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
  myDiv.innerHTML = `<div class = "row">
  <div class = "col-md-6 bg-light">
    <h3>${thisTimeBlock.start} - ${thisTimeBlock.end}</h3>
  </div>
  <div class = "col-md-6 bg-info">
    <h3>${thisTimeBlock.title}</h3>
    <p>${thisTimeBlock.description}</p>
  </div>
</div>`
  return myDiv
}
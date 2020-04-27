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
  let isPast = thisTimeBlock.start < parseInt(today.format('H'))
  let isPresent = thisTimeBlock.start == parseInt(today.format('H'))
  let isFuture = thisTimeBlock.start > parseInt(today.format('H'))
  let bgColor
  if(isPast){
    bgColor = 'dark'
  }
  else if (isPresent){
    bgColor = 'warning'
  }
  else{
    bgColor = 'info'
  }
  myDiv.innerHTML = `<div class = "row">
  <div class = "col bg-${bgColor}">
    <h3>${thisTimeBlock.start > 12 ? thisTimeBlock.start - 12 +'pm' : thisTimeBlock.start +'am'} - ${thisTimeBlock.end > 12 ? thisTimeBlock.end - 12 +'pm' : thisTimeBlock.end +'am'}</h3>
  </div>
</div>`
  return myDiv
}
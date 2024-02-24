const ourMomentInstance = moment()

let timesArr = Array.from({length: 24}, (_, i) => i); // Array representing hours from 0 to 23 (12:00 AM to 11:59 PM)

const updateHeaderWithDay = () => {
  $('#currentDay').text(ourMomentInstance.format('dddd, MMMM Do'));
}

const convert24Hto12H = (aNum) => {
  return aNum >= 12 ? [aNum === 12 ? 12 : aNum - 12, true] : [aNum === 0 ? 12 : aNum, false];
}

const convert12Hto24H = (aNum, afterNoon) => {
  return afterNoon ? (aNum === 12 ? 12 : aNum + 12) : (aNum === 12 ? 0 : aNum);
}

const createAllTimeBlocks = (myArr) => {
  for (let index in myArr) {
    let timeStart = myArr[index];
    console.log(`building timeBlock ${timeStart}`);
    let newTimeBlock = $('<div></div>');
    newTimeBlock.addClass("row timeblock");
    let timeLabel = $('<div></div>');
    timeLabel.addClass('col-1 hour text-right');
    timeLabel.append($(`<p class="mt-3">${convert24Hto12H(timeStart)[0]}${convert24Hto12H(timeStart)[1] ? 'PM' : 'AM'}</p>`));
    let mainBody = $('<div></div>');
    mainBody.data('start', timeStart);
    mainBody.addClass('col-10 pl-0');

    mainBody = updateTimeBlockColor(mainBody);
    mainBody.append($(`<textarea id="text${timeStart}" class="h-75 w-100 description"></textarea>`));
    mainBody.append($(`<select id="category${timeStart}" class="form-control mt-2">
                        <option value="work">Work</option>
                        <option value="leisure">Leisure</option>
                        <option value="focus">Focus</option>
                        <option value="personal">Personal</option>
                        <option value="home">Home</option>
                      </select>`));

    let mySaveArea = $('<div></div>');
    let mySaveSpan = $('<i></i>');
    mySaveSpan.addClass("fas fa-save align-self-center ml-4");
    mySaveArea.append(mySaveSpan);
    mySaveArea.addClass('col-1 saveBtn d-flex h-100');
    mySaveArea.attr('id', `save${timeStart}`);

    newTimeBlock.append(timeLabel);
    newTimeBlock.append(mainBody);
    newTimeBlock.append(mySaveArea);

    $('.container').append(newTimeBlock);

    if (localStorage.getItem(`savedText${timeStart}`)) {
      const savedData = JSON.parse(localStorage.getItem(`savedText${timeStart}`));
      $(`#text${timeStart}`).val(savedData.taskContent);
      $(`#category${timeStart}`).val(savedData.category);
    }
  }
}

const updateEverything = () => {
  updateHeaderWithDay();
  $('.container').html('');
  createAllTimeBlocks(timesArr);
  $('.saveBtn').click(event => {
    saveCurrentTimeBlockContent(event);
    console.log('save button pressed');
  });
}

const updateTimeBlockColor = (aTimeBlockBody) => {
  aTimeBlockBody.removeClass("work leisure focus personal home");
  const category = $(`#category${aTimeBlockBody.data('start')}`).val();
  aTimeBlockBody.addClass(category);
  return aTimeBlockBody;
}

const saveCurrentTimeBlockContent = (anEvent) => {
  const currentTimeBlock = anEvent.currentTarget.id.slice(4);
  const taskContent = $(`#text${currentTimeBlock}`).val();
  const category = $(`#category${currentTimeBlock}`).val();
  localStorage.setItem(`savedText${currentTimeBlock}`, JSON.stringify({ taskContent, category }));
}

updateHeaderWithDay();
createAllTimeBlocks(timesArr);

$('.saveBtn').click(event => {
  saveCurrentTimeBlockContent(event);
  console.log('save button pressed');
});

setInterval(updateEverything, 60000);

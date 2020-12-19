// this list will hold all o fthe days that are already clicked
let daysOpened = JSON.parse(localStorage.getItem('daysClicked'));

let icons = [
    '&#x1F6F7;',
    '&#x1F328;',
    '&#x1F43B;',
    '&#x1F332;',
    '&#x1F381;',
    '&#x1F936;',
    '&#x1F9E4;',
    '&#x1F9E3;',
    '&#x1F976;',
    '&#x1F31F;',
    '&#x26F8;',
    '&#x1F36A;',
    '&#x1F98C;',
    '&#x1F3C2;',
    '&#x26F7;',
    '&#x1F3BF;',
    '&#x1F3D2;',
    '&#x1F514;',
    '&#x1F6CF;',
    '&#x1F385;',
    '&#x1F3BF;',
    '&#x1F56F;',
    '&#x26c4;'
  ];
//re-assign icons to the list
icons = randomizeIcons(icons);


// Variable to grab every box on the page
// It stores them in the form of a list
const boxes = document.querySelectorAll('.num');

if(daysOpened !== null){//there is something in daysOpened
  showClickedBoxes();
}
// This function will show the emoji when the user clicks on a single box
function handleBoxClick(event){
  const boxClicked = event.currentTarget;
  const dayClicked = boxClicked.dataset.day;
  //console.log(event.currentTarget.dataset.day)
const today = new Date();
//console.log(today.getDate(), Number(dayClicked));
//compare the box that was clicked ot the current date
if (today.getDate() >= Number(dayClicked)){
  console.log('Yes, you can open me');
  boxClicked.innerHTML = icons[Number(dayClicked)];
  storeDaysClicked(Number(dayClicked));
} else {
  console.log('Hey, no peaking')
}
}//end of handleBoxClick

//add event listener to each box

boxes.forEach(function (box){
  box.addEventListener('click',handleBoxClick);
})

function storeDaysClicked(day){
// first check if daysClicked is in local storage
if(!localStorage.getItem('daysClicked')){//daysClicked does NOT exist
  daysOpened = [];
} else {//if there is something in days clicked
  daysOpened = JSON.parse(localStorage.getItem('daysClicked'));
}
//only need to add to daysOpened if the day is NOT already in the list
if(!daysOpened.includes(day)){
daysOpened.push(day);
}

localStorage.setItem('daysClicked', JSON.stringify(daysOpened));
console.log(daysOpened);
}

//this function will randomize the list of icons
function randomizeIcons(oldList){
//this will hold the randomList
let randomList = [];
//check if our icons have already been randomized
if(!localStorage.getItem('icons')){

while(oldList.length > 0){//while there is still something in the old list
//this is a random index
 const index = Math.floor(Math.random()*oldList.length);
 //add random item to the random list
 randomList.push(oldList[index]);
 //remove item we just added
 oldList.splice(index, 1); //start at the index and remove one item

}
localStorage.setItem('icons', JSON.stringify(randomList));
} else { //if there is something in the localStorage for icons
   randomList = JSON.parse(localStorage.getItem('icons'));
}
return randomList;
} //end of randomizeIcons

//this function will show the previously clicked days
function showClickedBoxes(){
  boxes.forEach(function(box){
    //see if the user has clicked on a day
const day = Number(box.dataset.day);
if(daysOpened.includes(Number(day))){
  box.innerHTML = icons[day];
}
  })
}//end of showCLickedBoxes

// to do
// Randomize the list of icons
// Keep the icones that were previously clicked on the screen
// Remember the icons that were already clicked

//add a reset button
// This function will reset the calander
function resetCalander(){
//only reset if they say tes to a prompt
const answer = confirm('Are you sure you want to reset the calandar? This action cannot be undone.');
if(answer){


//Clear all items in localStorage
  localStorage.clear();
  //reload the page
  document.location.reload();
}
}//end of resetCalander

//Add reset button to the bottom of the calander
//create the button element
const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Calandar';
//add an event listener to call resetCalander
resetButton.addEventListener('click', resetCalander);

//place the button on the page
//grab the footer
const footer = document.querySelector('footer');
//add the button to the footer after the opening tag
footer.insertAdjacentElement('afterbegin', resetButton);
// afterbegin, beforebegin, beforeend, afterend
//add a little style
footer.style.textAlign = 'center';
footer.style.paddingTop = '20px';
//end of file

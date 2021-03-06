console.log('Creepy Eyes are being HIDDEN!');


// invoke the creepers
const timedCreeper = setInterval(function() {
  creepKiller();
  creepReviver();
}, 1000);


// define the vote threshold for both creeps
const creepThreshold = 3;


// take the reacts count from ariaLabel string
function countPuller(string) {

  let creepCount = '';

  for (const char of string) {
    if (char === ' ') {
      return Number(creepCount);
    } else {
      creepCount += char;
    }
  }
}


// start of creepKiller

const creepKiller = () => {

  console.log('creepKiller is running!');

  
  const arrOfPosts = Array.from(document.querySelectorAll
    (".c-message_kit__gutter__right"));


  for (const post of arrOfPosts) {

    const newImage = post.querySelector('.new_image'),
          autoClog = post.querySelector('.p-autoclog__hook'),
          oldImage = post.querySelector('.c-message__message_blocks'),
          reactBar = post.querySelector('.c-message_kit__reaction_bar');


    if (reactBar && autoClog) {
      for (const button of reactBar.children) {
        if (button.ariaLabel.includes('react with eyes')
        && countPuller(button.ariaLabel) >= creepThreshold) {
          if (!newImage) {
            const newImgElement = document.createElement('img');
            newImgElement.className = "new_image";
            newImgElement.style.display = 'flex';
            newImgElement.style.width = "460px"
            newImgElement.src = 'https://glorifiedbicycles.com/wp-content/uploads/2019/09/notice.png';
            oldImage.style.display = 'none';
            oldImage.parentNode.prepend(newImgElement);
          } else {
            newImage.style.display = 'flex';
            oldImage.style.display = 'none';
          }
        }
      }
    }
  }


  // end of creepKiller
}



const creepReviver = () => {

  console.log('creepReviver is running!');


  const arrOfPosts = Array.from(document.querySelectorAll
    (".c-message_kit__gutter__right"));


  for (const post of arrOfPosts) {

    const newImage = post.querySelector('.new_image'),
          oldImage = post.querySelector('.c-message__message_blocks'),
          reactBar = post.querySelector('.c-message_kit__reaction_bar'),
          arrOfBut = Array.from(post.querySelectorAll('.c-reaction')),
          someButt = arrOfBut.some(button => button.ariaLabel.includes('react with eyes'));

    if (!reactBar && newImage) {
      newImage.style.display = 'none';
      oldImage.style.display = 'flex';
    }
    else if (newImage && someButt === false) {
      newImage.style.display = 'none';
      oldImage.style.display = 'flex';
    }
    else if (reactBar && newImage) {
      for (const button of reactBar.children) {
        if (button.ariaLabel.includes('react with eyes') 
        && countPuller(button.ariaLabel) < creepThreshold) {
          newImage.style.display = 'none';
          oldImage.style.display = 'flex';
        }
      }
    }
  }

  // end creepReviver
}
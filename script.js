window.addEventListener('load', function () {
  let scoreBlock = document.querySelector('.main-game .score');
  let score = 0;
  let ownedFactories = [];

  document.querySelector('.main-game .click-zone').onclick = function () {
    score += 10;
    scoreBlock.innerText = score;
  }

  document.querySelectorAll('.factory').forEach(function (fc, index) {
    let factory = {
      title: fc.querySelector('.title').innerText,
      costs: parseInt(fc.querySelector('.price').innerText),
      isAdding: parseInt(fc.querySelector('.adds').innerText),
      count: parseInt(fc.querySelector('.count').innerText.slice(1, -1)),
      button: fc.querySelector('button'),
      cursorImage: 'img/cursor-' + (index + 1) + '.png',
      backgroundImage: 'img/background-' + (index + 1) + '.jpg'
    };
    factory.button.onclick = function () {
      if (score >= factory.costs) {
        score -= factory.costs;
        factory.count++;
   
        document.querySelector('.click-zone').style.cursor = `url('img/cursor-${index + 1}.png'), auto`;

        document.querySelector('.main-game .click-zone').style.backgroundImage = `url('img/background-${index + 1}.jpg')`;
  
        scoreBlock.innerText = score;
        fc.querySelector('.count').innerHTML = '(' + factory.count + ')';
      }
    }
    ownedFactories.push(factory);
  });
  console.log(ownedFactories);

  this.setInterval(function () {
    score+=ownedFactories
    .map(x=> x.count * x.isAdding)
    .reduce((partial_sum, number) => partial_sum + number, 0);
    scoreBlock.innerText = score;
  }, 1000);

});

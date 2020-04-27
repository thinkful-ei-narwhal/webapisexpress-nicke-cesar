'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a) {
    return res.status(400).send('Please provide a value');
  }

  if (!b) {
    return res.status(400).send('Please provide b value');
  }

  const c = parseInt(a) + parseInt(b);

  const sum = `The sum of ${a} and ${b} is ${c}`;
  res.send(sum);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  let cipher = '';
  for (let i = 0; i < text.length; i++) {
    if (isUpperCase(text[i])) {
      cipher += String.fromCharCode((text.charCodeAt(i) + shift - 65) % 26 + 65);
    } else {
      cipher += String.fromCharCode((text.charCodeAt(i) + shift - 97) % 26 + 97);
    }
  }
  res.send(cipher);
});

function isUpperCase(str) {
  return str === str.toUpperCase();
}

app.get('/lotto', (req, res) => {
  const num = req.query.num;
  const lottoNums= [getRandomInt(20),getRandomInt(20),getRandomInt(20),getRandomInt(20),getRandomInt(20),getRandomInt(20)];
  let correct= 0;
  let result= null;

  for(let i = 0; i < num.length; i++){
    if(lottoNums.includes(parseInt(num[i]))){
      correct++;
    }
  } 
  
  if(correct<4){
    result='Sorry, you lose';
  }else if(correct===4){
    result='Congratulations, you win a free ticket';
  }else if(correct===5){
    result='Congratulations! You win $100!';
  }else if(correct===6){
    result='Wow! Unbelievable! You could have won the mega millions!';
  }
  res.send(result);
});

function getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }
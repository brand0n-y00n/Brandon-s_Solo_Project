const path = require('path');
const express = require('express')
const app = express();
const cors = require('cors')
const apiRouter = require('./routes/api')

const PORT = 3000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../src')))

app.use('/api/players', apiRouter)



// '/v1/stats/?seasons[]=2018&seasons[]=2015&player_ids[]=1&player_ids[]=2&postseason=true'

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.get('/', (req,res) => {
  res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
})

app.listen(PORT, ()=>{
  console.log(`Server listening on port: ${PORT}`)
})
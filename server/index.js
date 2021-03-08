import Express from 'express';
import CongressApi from '../congressAPI.js';






const app = Express();
const MY_PORT = 9999;


app.use('/Politician', CongressApi);

app.use('/',Express.static('./client'));

app.listen(MY_PORT, ()=>{
    console.log(`Server started on port: ${MY_PORT}`);
})

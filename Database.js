import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'elibrary',
  password:'Root@123'
})

connection.connect((err)=>{
    if(err){
        console.log('connection failed',err)
    }
    console.log('database connected sucessfully')
})

export default  connection
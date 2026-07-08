/*
  controllers/authController.js
  - handle user authentication requests
  - register: validate input, check existing user, hash password, save user
  - login: validate input, verify credentials, sign JWT token
  - send appropriate JSON responses for success and error cases
*/

const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// REGISTER

exports.register = async(req,res)=>{


try{


const {
username,
email,
password

}=req.body;



if(!username || !email || !password){

return res.status(400).json({

message:"All fields required"

});

}



const check = await pool.query(

"SELECT id FROM users WHERE email=$1",

[email]

);



if(check.rows.length > 0){

return res.status(400).json({

message:"Email already exists"

});

}



const hashedPassword = await bcrypt.hash(password,12);



const result = await pool.query(

`
INSERT INTO users
(username,email,password_hash)

VALUES($1,$2,$3)

RETURNING id,username,email

`,

[
username,
email,
hashedPassword
]

);



res.status(201).json({

message:"User created",

user:result.rows[0]

});



}catch(error){

console.log(error);

res.status(500).json({

message:"Server error"

});

}


};






// LOGIN

exports.login = async(req,res)=>{


try{


const {

email,
password

}=req.body;



const result = await pool.query(

"SELECT * FROM users WHERE email=$1",

[email]

);



if(result.rows.length===0){

return res.status(401).json({

message:"Invalid login"

});

}




const user=result.rows[0];



const match = await bcrypt.compare(

password,

user.password_hash

);



if(!match){

return res.status(401).json({

message:"Invalid login"

});

}




const token = jwt.sign(

{
id:user.id,
username:user.username,
email:user.email
},

process.env.JWT_SECRET,

{
expiresIn:process.env.JWT_EXPIRE
}

);




res.json({

message:"Login successful",

token

});



}catch(error){

console.log(error);

res.status(500).json({

message:"Server error"

});

}


};
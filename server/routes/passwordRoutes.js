const express=require("express");

const {
changeStudentPassword
}=require("../controllers/passwordController");


const router=express.Router();


router.post(
"/student/change-password",
changeStudentPassword
);


module.exports=router;
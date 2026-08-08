const express=require("express");

const {
submitPreferences
}=require("../controllers/studentPreferenceController");


const router=express.Router();


router.post(
"/submit",
submitPreferences
);


module.exports=router;
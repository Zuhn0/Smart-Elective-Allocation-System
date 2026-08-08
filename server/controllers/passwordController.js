const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");


const changeStudentPassword = async(req,res)=>{

try{

const {
studentId,
oldPassword,
newPassword
}=req.body;


const student = await prisma.student.findUnique({
where:{
id:Number(studentId)
}
});


if(!student){

return res.status(404).json({
message:"Student not found"
});

}



const isMatch = await bcrypt.compare(
oldPassword,
student.password
);


if(!isMatch){

return res.status(401).json({
message:"Old password incorrect"
});

}



const hashedPassword = await bcrypt.hash(
newPassword,
10
);



await prisma.student.update({

where:{
id:Number(studentId)
},

data:{
password:hashedPassword
}

});



res.json({
message:"Password changed successfully"
});


}

catch(error){

console.log(error);

res.status(500).json({
message:"Password change failed"
});

}

};



module.exports={
changeStudentPassword
};
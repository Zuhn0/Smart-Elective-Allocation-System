const prisma = require("../config/prisma");


const submitPreferences = async(req,res)=>{

    try{

        const {studentId, preferences}=req.body;


        /*
        preferences format:

        [
          {
            electiveId:2,
            rank:1
          },
          {
            electiveId:3,
            rank:2
          }
        ]

        */


        await prisma.preference.deleteMany({
            where:{
                studentId
            }
        });



        await prisma.preference.createMany({

            data: preferences.map((item)=>({

                studentId,
                electiveId:item.electiveId,
                rank:item.rank

            }))

        });



        res.json({
            message:"Preferences submitted successfully"
        });



    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Failed to submit preferences"
        });

    }

};



module.exports={
    submitPreferences
};
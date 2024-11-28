import TaskModel from '../model/TaskModel.js'

export const CreateTask= async(req,res)=>{

    try{
        let reqBody=req.body
        reqBody.email=req.headers['email'];
        reqBody.user_id=req.headers['user_id'];
        
        let data=await TaskModel.create(reqBody);
        
        if(data===null){
          res.json({status:"fail","Message": "Failed to create task" })
        }else{
            res.json({status:"success","Message": "Task created successfully" })
        }
    }catch(err){
        res.json({status:"fail","Message": "Failed to Response"+ err.toString() })
    }
       
}

export const DeleteTask= async(req,res)=>{

    try{
       
        await TaskModel.deleteOne({user_id:req.headers.user_id});
        res.json({status:"success","Message": "Task deleted successfully" })
       
    }catch(err){
        res.json({status:"fail","Message": "Failed to Delete" })
    }
       
}

export const UpdateStatus= async(req,res)=>{

    try{
        let status=req.params.status;
        await TaskModel.updateOne({user_id:req.headers.user_id},{status:status});
        res.json({status:"success","Message": "Status updated successfully" })
        
    }catch(err){
        res.json({status:"fail","Message": "Failed to update status" })
    }
       
}
export const TaskListByStatus= async(req,res)=>{

    try {

        let status=req.params.status;
        let user_id=req.headers['user_id']
        let data=await TaskModel.find({user_id: user_id,status: status})
        return res.json({status:"success",data:data,"Message":"User TaskListByStatus successfully"})
    }
    catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
       
}


// export const CountTask=async(req,res)=>{

//     let ObjectID=mongoose.Types.ObjectId
//     let user_id=req.headers['user_id']
//     let user_id_object=new ObjectID(user_id)

//     let data = await TasksModel.aggregate([
//         {$match:{user_id:user_id_object}},
//         {$group:{_id:"$status",sum:{$count:{}}}},
//     ])

//     return res.json({status:"success","data":data,"Message":"User CountTask successfully"})
// }

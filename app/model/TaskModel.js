import mongoose from "mongoose";
import { type } from "os";

const TaskSchema= mongoose.Schema(
    {
        title:{type:String,required:true},
        description:{type:String,required:true},
        status:{type:String,required:true},
        user_id:{type:mongoose.Schema.Types.ObjectId,required:true},
        email: {type: String, unique: false}
    },
    {
        timestamps:true,
        versionKey:false, 
        collection:'tasks'
    }
)

const TaskModel= mongoose.model('tasks', TaskSchema);
export default TaskModel;
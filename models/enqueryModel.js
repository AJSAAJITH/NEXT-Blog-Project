import { model, models, Schema } from "mongoose";
import { type } from "os";

const enquerySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});

const enqueryModel = models.Énquery || model('Énquery',enquerySchema);
export default enqueryModel;
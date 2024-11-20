import { Schema, model, models} from "mongoose";
import { type } from "os";

const postSchema = new Schema({
    title:String,
    description:String,
    images:String,
    created_at:{
        type:Date,
        default:Date.now()
    }
},{toJSON:{virtuals:true}});

postSchema.virtual('short_description').get(function(){
    return this.description.substr(0,100)+"..."
});

postSchema.virtual('created_at_formated').get(function(){
    return changeDateFormate(this.created_at);
});

function changeDateFormate(date_str){
    const date = new Date(date_str);
    const months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const postModel = models.Post || model('Post', postSchema);

export default postModel;
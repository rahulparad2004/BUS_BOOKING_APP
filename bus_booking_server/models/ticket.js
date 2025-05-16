import mongoose from "mongoose";
const {Schema} = mongoose;

const TicketSchema = new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User', required:true},
    bus:{type:Schema.Types.ObjectId, ref:'Bus', required:true},
    date:{type:Date, required:true},
    
    seatNumbers: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    total_fare:{type:Number, required:true},
    status:{
        type:String,
        enun:["Upcoming","Completed","Cancelled"],
        default:"Upcoming",
    },
    bookedAt:{type:Date, default:Date.now},
    pnr:{type:String, unique:true, required: true},
})

const Ticket = mongoose.model("Ticket",TicketSchema);
export default Ticket;
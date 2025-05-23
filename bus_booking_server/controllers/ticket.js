import Bus from '../models/bus.js';
import User from '../models/user.js';
import Ticket from '../models/ticket.js';
import {v4 as uuidv4} from 'uuid'

export const getUserTickets = async(req, res)=>{
    try {
        const userId =  req.userId;

        const tickets = await Ticket.find({user: userId})
            .populate(
                'bus',
                'busId from to busType company departureTime arrivalTime price'
            )
            .sort({bookedAt: -1});
        res.status(200).json({success: true,tickets: tickets || []});
        
    } catch (error) {
        console.log("Error in getUserTickets-->",error)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const bookTicket = async(req, res)=>{
    try {
        const {busId,date,seatNumbers} = req.body;
        const userId = req.userId;

        if(!busId || !date || !seatNumbers || seatNumbers.length === 0){
            return res.status(400).json({message:"Please provide all the required fields"})
        }

        const bus = await Bus.findOne({busId});
        if(!bus){
            return res.status(404).json({error:"Bus not found"})
        }

        const unavailableSeats = seatNumbers.filter((seatNum) =>
            bus.seats.some((seat) => seat._id.toString() === seatNum && seat.booked)
        );

        
        if (unavailableSeats.length > 0) {
            return res.status(400).json({
                error: "Some of the selected seats are already booked.",
                unavailableSeats,
            });
        }

        // const totalFare = bus.price * seatNumbers * length;
        const totalFare = bus.price * seatNumbers.length;

        const newTicket = new Ticket({
            user: userId,
            bus: bus._id,
            date,
            seatNumbers,
            total_fare: totalFare,
            pnr: uuidv4().slice(0, 10).toUpperCase(),
        })
        await newTicket.save();
        bus.seats.forEach((seat) => {
            if (seatNumbers.includes(seat._id.toString())) {
                seat.booked = true;
            }
        });
        await bus.save();

        res.status(200).json({
            success:true,
            message:"Ticket booked successfully",
            ticket:newTicket
        })


    } catch (error) {
        console.log("Error in bookTicket-->",error)
        res.status(500).json({message:"Internal Server Error"})

;
        
    }
}

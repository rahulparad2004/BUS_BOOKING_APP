import Bus from "../models/bus.js";

export const getBusDetails = async(req,res)=>{
    try {
        const {busId} = req.params;
        if(!busId){
            return res.status(400).json({message:"Bus ID is required"});
        } 

        const bus = await Bus.findOne({busId});

        if(!bus){
            return res.status(404).json({message:"Bus not found"});
        }

        res.status(200).json({
            busId:bus.busId,
            from:bus.from,
            to:bus.to,
            departureTime:bus.departureTime,
            arrivalTime:bus.arrivalTime,
            duration:bus.duration,
            availableSeats:bus.availableSeats,
            price:bus.price,
            originalPrice:bus.originalPrice,
            company:bus.company,
            BusType:bus.BusType,
            rating:bus.rating,
            totaiReviews:bus.totaiReviews,
            badges:bus.badges,
            seats:bus.seats,
        })


    } catch (error) {
        console.log("error fetching bus details-->",error)
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

export const searchBuses = async(req,res)=>{
    try {
        const { from,to,date } = req.body;
        if(!from || !to || !date){
            return res.status(400).json({message:"From, To and Date are required"});
        }
        
        const selectedDate = new Date(date);
        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

        const buses = await Bus.find({
            from,
            to,
            departureTime: { $gte: startOfDay, $lte: endOfDay }
        });
        res.status(200).json({success:true,buses});
        
    } catch (error) {
        console.log("error searching buses-->",error)
        res.status(500).json({message:"Internal Server Error"});
;
        
    }
}
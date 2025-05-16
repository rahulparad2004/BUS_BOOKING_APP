import React, {FC} from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import BookedIcon from '../../assets/images/booked.jpg'
import AvailableIcon from '../../assets/images/available.jpg'
import SelectedIcon from '../../assets/images/selected.jpg'


interface seat_id{
    _id: string;
    seat_id?: number;
    booked: boolean;
    type: 'window' | 'side' | 'path';
}

const Seat: FC<{
    // seats: [seat_id[]];
    seats: seat_id[][]; // <-- Fix type here
    onSeatSelect: (seat_id: string) => void;
    // selectedSeats: number[];
    selectedSeats: string[];
}> = ({seats, onSeatSelect, selectedSeats}) => {
    
    return (
        <View style={tw`mb-4 justify-between flex-row`}>
          <View style={tw`w-[30%] items-center bg-white rounded-2xl p-4`}>
            <Text style={tw`font-okra font-bold text-lg mb-4`}>Seat Type</Text>

            <View style={tw`items-center mb-4`}>
                <Image source={SelectedIcon}
                style={tw`h-12 w-12 my-1`} />
                <Text style={tw`font-okra font-medium text-md mb-4`}>Selected</Text>
            </View>

            <View style={tw`items-center mb-4`}>
                <Image source={AvailableIcon}
                style={tw`h-12 w-12 my-1`} />
                <Text style={tw`font-okra font-medium text-md mb-4`}>Available</Text>
            </View>

            <View style={tw`items-center mb-4`}>
                <Image source={BookedIcon}
                style={tw`h-12 w-12 my-1`} />
                <Text style={tw`font-okra font-medium text-md mb-4`}>booked</Text>
            </View>

          </View>
          <View style={tw`w-[65%] bg-white rounded-2xl p-4`}>
            <Image
                source={require('../../assets/images/wheel.png')}
                style={tw`h-10 w-10 mb-4 self-end`}
            />

            <View style={tw`mt-2 w-full`}>
                {seats?.map((row, index) => (
                    <View key={`row-${index}`} style={tw`flex-row w-full justify-between items-center`}>
                        <View style={tw`flex-row w-full justify-between items-center`}>
                            {
                                row?.map((s) => {
                                    const uniqueKey = s._id; // Use _id as the unique key
                                    if (s.type === 'path') {
                                        return <View key={`path-${uniqueKey}`} style={tw`p-5 m-1`} />;
                                    }
                                    return (
                                        <TouchableOpacity
                                            key={s._id}
                                            disabled={s.booked}
                                            onPress={() => onSeatSelect(s._id)} // Pass _id to the onSeatSelect function
                                        >
                                            <Image
                                                source={
                                                    selectedSeats?.includes(s._id)
                                                        ? SelectedIcon
                                                        : s.booked
                                                        ? BookedIcon
                                                        : AvailableIcon
                                                }
                                                style={tw`h-12 w-12 my-1`}
                                            />
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    </View>
                
            ))}
                
            </View>

          </View>
        </View>
    )
}



export default Seat

import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { bookTicket, fetchBusDetails } from '../service/requests/bus';
import tw from 'twrnc'
import { goBack, resetAndNavigate } from '../utils/NavigationUtils';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import TicketModal from '../components/ui/TicketModal';
import PaymentButton from '../components/ui/PaymentButton';
import Seat from '../components/ui/Seat';
import { AxiosError } from 'axios';



const SeatSelectionScreen = () => {

    const [ticketVisible, setticketVisible] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const route = useRoute();
    const { busId } = route.params as {busId: string}

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['busDetails', busId],
        queryFn: () => fetchBusDetails(busId),
    }); 

    const busInfo = data;    

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [busId]),
    );

    const bookTicketMutation = useMutation({
        mutationFn:(ticketData: {
            busId: string;
            date: string;
            seatNumbers: string[];
        }) => bookTicket(ticketData),
        onSuccess: (data) => {
            setticketVisible(true);
            refetch(); 
        },
        
        onError: (error: AxiosError<any>) => {
            if (error?.response?.data?.unavailableSeats) {
                Alert.alert(
                    'Booking Failed',
                    'Some of the selected seats are already booked. Please select different seats.'
                );
            } else {
                Alert.alert('Failed to book ticket. Please try again');
            }
        },
    })
  

    const handleSeatSelection = (seat_id: string) => {
        setSelectedSeats((prev) =>
            prev.includes(seat_id)
                ? prev.filter((id) => id !== seat_id) 
                : [...prev, seat_id] 
        );
    };

    const handleOnPay = () => {
        if (selectedSeats.length === 0) {
            Alert.alert('Please select at least one seat.');
            return;
        }
    
        const ticketData = {
            busId,
            date: new Date(busInfo.departureTime).toISOString(),
            seatNumbers: selectedSeats
                
        };       
    
        bookTicketMutation.mutate(ticketData);
    };
    
    if(isLoading){
        return(
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color="teal" />
                <Text style={tw`text-gray-500 mt-2`}>Loading bus details...</Text>
            </View>
        )
    }

    if(isError){
        return(
            <View style={tw`flex-1 items-center justify-center`}>
                <Text style={tw`text-red-500 mt-2`}>Failed to load bus details.</Text>
                <TouchableOpacity onPress={() => goBack()}>
                    <Text style={tw`text-blue-500`}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }      
    

    const transformedSeats = busInfo?.seats?.reduce((rows: any[], seat: any, index: number) => {
        const rowIndex = Math.floor(index / 4); // Assuming 4 seats per row
        if (!rows[rowIndex]) rows[rowIndex] = [];
        rows[rowIndex].push({
            ...seat,
            booked: seat.booked ?? false, // Add default booked value if missing
        });
        return rows;
    }, []);

    return (  
    <View style={tw`flex-1 bg-white pt-12`}>
        <SafeAreaView/>
        <View style={tw`bg-white p-4 flex-row items-center border-b-[1px] border-teal-400`}>
            <TouchableOpacity onPress={() => goBack()}>
                <ArrowLeftIcon size={24} color="#000" />
            </TouchableOpacity>

            <View style={tw` ml-4`}>
                <Text style={tw`text-lg font-bold`}>Seat Selection</Text>
                <Text style={tw`text-sm text-gray-500`}>{busInfo?.from} ⮕ {busInfo?.to}</Text>
                <Text style={tw`text-sm text-gray-500`}>
                    {new Date(busInfo?.departureTime).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit',
                    })}{' '}
                    {new Date(busInfo?.departureTime).toLocaleDateString()}
                </Text>
            </View>
            
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:200}}
        style={tw`pb-20 bg-teal-100 p-4`}
        > 
            
            <Seat
                selectedSeats={selectedSeats}
                seats={transformedSeats || []} // Pass transformed seats
                onSeatSelect={handleSeatSelection}
            />
            
            <View style={tw`bg-white rounded-lg p-4 drop-shadow-md`}>
               <View style={tw`flex-row items-center justify-between mb-2`}>
                    <Text style={tw`text-lg font-semibold`}>{busInfo?.company}</Text>
                    <View style={tw`flex-row items-center`}>
                        <StarIcon color="gold" size={18} />
                        <Text style={tw`ml-1 text-gray-600 text-sm`}>{busInfo?.rating} </Text>
                    </View>
                </View> 
                <Text style={tw`text-sm text-gray-600 mb-1`}>{busInfo?.busType}</Text>

                <View style={tw`flex-row items-center justify-between mt-2`}>
                    <View style={tw`items-center`}>
                        <Text style={tw`text-lg font-bold`}>
                            {new Date(busInfo?.departureTime).toLocaleTimeString([],{
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                        <Text style={tw`text-sm text-gray-500`}>Departure</Text>
                    </View>
                    <Text style={tw`text-sm text-gray-500`}>{busInfo?.duration}</Text>
                    <View style={tw`items-center`}>
                        <Text style={tw`text-lg font-bold`}>
                            {new Date(busInfo?.arrivalTime).toLocaleTimeString([],{
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                        <Text style={tw`text-sm text-gray-500`}>Arrival</Text>
                    </View>
                </View>
                <Text style={tw`mt-3 text-green-600 text-sm`}>
                    <Text style={tw`mt-3 text-green-600 text-sm`}>
                        {busInfo?.seats?.flat().filter((seat: any) => !seat.booked).length
                        }{' '}
                        Seats Available
                    </Text>
                    
                </Text>

                <View style={tw`flex-row items-center mt-2`}>
                    <Text style={tw`text-gray-400 line-through text-lg`}>
                        ₹{busInfo?.originalPrice}
                    </Text>
                    <Text style={tw`text-xl font-bold text-black ml-2`}>
                        ₹{busInfo?.price} (1/p)
                    </Text>
                </View>

                <View style={tw`flex-row gap-2 mt-3`}>
                    {busInfo?.badges?.map((badge: string) => (    
                        <View
                        key={badge}
                        style={tw`bg-yellow-200 px-2 py-1 rounded-full`}>
                            <Text style={tw`text-xs text-yellow-800 font-semibold`}>{badge}</Text>

                        </View>
                    ))}               
                </View>
            </View>
        </ScrollView> 

        <PaymentButton
            seat={selectedSeats.length}
            price={busInfo.price}
            onPay={handleOnPay}
        />      
        
        {ticketVisible && (
        <TicketModal
          bookingInfo={{
            from: busInfo.from,
            to: busInfo.to,
            departureTime: new Date(busInfo.departureTime).toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute: '2-digit',              
              },
            ),
            arrivalTime: new Date(busInfo.arrivalTime).toLocaleTimeString(
              [],
            {
              hour: '2-digit',
              minute: '2-digit',
            },
          ),
            date: new Date(busInfo.departureTime).toDateString(),
            company: busInfo.company,
            busType: busInfo.busType,
            seats: bookTicketMutation.data?.seatNumbers,
            ticketNumber: bookTicketMutation.data?._id || 'xxxxxxxxxx',
            pnr: bookTicketMutation.data?.pnr || 'xxxxxxxxxx',
            fare: `${busInfo.price * selectedSeats.length}`,
          }}
          onClose={() => {
            resetAndNavigate('HomeScreen');
            setticketVisible(false);
          }}
          visible={ticketVisible}
        />
             
        )}
        
        
    </View>
    )
}

export default SeatSelectionScreen

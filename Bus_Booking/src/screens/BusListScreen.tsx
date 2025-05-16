import React from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { fetchBuses } from '../service/requests/bus'
import tw from 'twrnc'
import { goBack, navigate } from '../utils/NavigationUtils'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'



const BusListScreen = () => {
    const route = useRoute();
    const params = route?.params as any;
    
    const { from, to, date: rawDate } = params?.item || {};
    const date = new Date(rawDate);
    const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    
    const {
        data: buses,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['buses', from, to, formattedDate],
        queryFn: () => fetchBuses(from, to, formattedDate), // 👈 updated here
        enabled: !!from && !!to && !!formattedDate,  // Make sure the data is available before querying
    });

    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                style={tw`bg-white mb-4 p-4 rounded-lg shadow-sm`}
                onPress={() => navigate('SeatSelectionScreen', { busId: item.busId })}
            >
                
                <Image
                    source={require('../assets/images/sidebus.png')}
                    style={tw`h-6 w-6`}
                />
                <Text style={tw`text-lg font-bold text-gray-900`}>{item.company}</Text>
                <Text style={tw`text-sm text-gray-500`}>{item.busType}</Text>

                <View style={tw`flex-row justify-between mt-2`}>
                    <Text style={tw`text-lg font-semibold text-gray-700`}>
                        {new Date(item.departureTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })}{' '}
                        -
                        {new Date(item.arrivalTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })}
                    </Text>
                    <Text style={tw`text-sm text-gray-500`}>{item.duration}</Text>
                </View>

                <View style={tw`flex-row justify-between mt-2 items-center`}>
                    <Text style={tw`text-md text-green-600 font-bold`}>₹{item.price}</Text>
                    <Text style={tw`text-xs text-gray-400 line-through`}>₹{item.originalPrice}</Text>
                    <Text style={tw`text-sm text-gray-600`}>{item.availableSeats} Seats</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={tw`flex-1 bg-white pt-12`}>
            <SafeAreaView />
            <View style={tw`bg-white p-4 flex-row items-center border-b-[1px] border-teal-800`}>
                <TouchableOpacity onPress={goBack}>
                    <ArrowLeftIcon size={24} color={'#000'} />
                </TouchableOpacity>
                <View style={tw`ml-4`}>
                    <Text style={tw`text-lg font-bold`}>
                        {from} ⮕ {to}
                    </Text>
                    <Text style={tw`text-sm text-gray-500`}>{new Date(date).toDateString()}</Text>
                </View>
            </View>

            {isLoading && (
                <View style={tw`flex-1 justify-center items-center`}>
                    <ActivityIndicator size="large" color="teal" />
                    <Text>Loading...</Text>
                </View>
            )}

            {error && (
                <View style={tw`flex-1 justify-center items-center`}>
                    <Text style={tw`text-red-500 font-bold`}>
                        Error: {error?.message || 'Failed to load buses'}
                    </Text>
                </View>
            )}

            {!isLoading && !error && buses?.length === 0 && (
                <View style={tw`flex-1 justify-center items-center`}>
                    <Text>No Buses Available</Text>
                </View>
            )}

            <FlatList
                data={buses}
                keyExtractor={(item) => item.busId}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
            
        </View>
    );
};

export default BusListScreen;
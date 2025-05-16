import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { UserGroupIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc' 
import TicketModal from '../ui/TicketModal';


const BookItem = ({item}:any) => {
  const [ticketVisible, setticketVisible] = useState(false);


  return (
    <View style={tw`bg-gray-100 p-4 rounded-lg mb-3`}>
      <View style={tw`flex-row justify-between`}>
        <Image
          source={require('../../assets/images/sidebus.png')}
          style={tw`h-6 w-8`}
        />
        <Text style={tw`text-gray-500`}>{item?.status}</Text>
      </View>

      <Text>
        {item?.bus?.from} ⮕ {item?.bus?.to}
      </Text>

      <Text style={tw`text-gray-600`}>
        {new Date(item?.date)?.toDateString()}
      </Text>
      <Text style={tw`text-gray-600`}>{item?.bus?.type}</Text>

      <View style={tw`flex-row items-center mt-2`}>
        <UserGroupIcon size={18} color='gray' />
        <Text style={tw`ml-2 text-gray-600`}>
          {item?.seatNumbers?.toString()}
        </Text>
      </View>

      {item.status === 'Cancelled' && (
        <Text style={tw`text-green-600 font-bold mt-2`}>Refund Completed</Text>
      )}

      <TouchableOpacity
        onPress={() => setticketVisible(true)}
        style={tw`mt-2 bg-red-500 py-2 px-4 rounded-lg`}
      >
        <Text style={tw`text-white text-center font-bold`}>See Ticket</Text>
      </TouchableOpacity>
      {ticketVisible && (
        <TicketModal
          bookingInfo={{
            from: item?.bus?.from,
            to: item?.bus?.to,
            departureTime: new Date(item?.bus?.departureTime).toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute: '2-digit',              
              },
            ),
            arrivalTime: new Date(item?.bus?.arrivalTime).toLocaleTimeString(
              [],
            {
              hour: '2-digit',
              minute: '2-digit',
            },
          ),
            date: new Date(item?.bus?.departureTime).toDateString(),
            company: item?.bus?.company,
            busType: item?.bus?.busType,
            seats: item?.seatNumbers,
            ticketNumber: item?._id,
            pnr: item?.pnr,
            fare: item?.total_fare,
          }}
          onClose={() => setticketVisible(false)}
          visible={ticketVisible}
        />
      )}
    </View>
  )
}

export default BookItem

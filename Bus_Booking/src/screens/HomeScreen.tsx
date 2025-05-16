import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import {UserCircleIcon} from 'react-native-heroicons/solid'
import tw from 'twrnc'
import { logout } from '../service/requests/auth'
import Bookings from '../components/home/Bookings'

const HomeScreen = () => {
    return(
        <View style={tw`flex-1 bg-white`}>
            <SafeAreaView/>
            <View style={tw`flex-row justify-between items-center px-4 py-2 mt-10`}>
                <Text style={tw`font-okra font-semibold text-3xl`}>
                    Bus Tickets
                </Text>
                <UserCircleIcon color="red" size={30} onPress={logout} /> 
            </View>
            <Bookings/>
        </View>
    )
}

export default HomeScreen
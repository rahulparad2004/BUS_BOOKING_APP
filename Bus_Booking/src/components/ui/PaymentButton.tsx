import React,{FC} from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { UserGroupIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc'

const PaymentButton: FC<{
    price: number;
    seat:number;
    onPay:any;
}> = ({price, seat, onPay}) => {  
    return (
        <View style={tw`absolute bottom-0 left-0 right-0 pb-5 shadow-md bg-white w-full rounded-t-xl p-4`}>
            <View style={tw`flex-row items-center justify-between`}>
                <View>
                    <Text style={tw`font-semibold font-okra text-xl`}>Amount</Text>
                    <Text style={tw`font-okra font-medium text-gray-700 text-sm`}>Tax Included</Text>
                </View>
                <View>
                    <View style={tw`flex-row items-center gap-3`}>
                        <Text style={tw`text-gray-500 line-through font-okra font-medium text-sm`}>
                            ₹{(seat * price - (seat * price > 200 ? 100 : 0)).toFixed(0)}
                        </Text>
                        <Text style={tw`font-okra font-medium text-lg`}>
                            ₹{(seat * price).toFixed(0)}
                        </Text>
                    </View>

                    <View style={tw`flex-row self-end items-center gap-1`}>
                        <UserGroupIcon color={'gray'} size={16} />
                        <Text style={tw`font-okra font-medium text-md`}>{seat} p</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={onPay}
                style={tw`bg-red-500 my-4 rounded-xl justify-center items-center p-3`}
            >
                <Text style={tw`text-white font-semibold text-xl font-okra`}>Pay Now!</Text>
            </TouchableOpacity>
        </View>
    )
  
}

export default PaymentButton

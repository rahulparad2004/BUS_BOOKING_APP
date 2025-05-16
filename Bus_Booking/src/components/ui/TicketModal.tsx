import React,{FC} from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { ArrowUpOnSquareIcon, XMarkIcon } from 'react-native-heroicons/solid'
import Svg, {Circle,Line} from 'react-native-svg'

interface TicketModalProps {
    visible: boolean;
    onClose: () => void;
    bookingInfo: any;
}

const TicketModal:FC<TicketModalProps> = ({visible, onClose, bookingInfo}) => {
    return(
       <Modal visible={visible} animationType='slide' transparent={true}>
            <View style={[tw`flex-1 justify-center items-center`,{backgroundColor:'#2A2526'}]}>
                <TouchableOpacity style={tw`bg-white mb-5 shadow-sm p-1 rounded-full`}>
                    <XMarkIcon color="black" size={22} onPress={onClose} />
                </TouchableOpacity>
                <View style={tw`bg-white overflow-hidden rounded-xl w-[90%] p-4 shadow-lg relative`}>
                    <Text style={tw`text-center text-lg font-bold mb-2`}>
                        Your Ticket
                    </Text>

                    <View style={tw`absolute left-[-14px] top-[60%] -translate-y-1/2`}>
                        <Svg height="40" width="28">
                            <Circle cx="14" cy="20" r="14" fill="#2A2526" />
                        </Svg>
                    </View>
                    <View style={tw`absolute right-[-14px] top-[60%] -translate-y-1/2`}>
                        <Svg height="40" width="28">
                            <Circle cx="14" cy="20" r="14" fill="#2A2526" />
                        </Svg>
                    </View>

                    <View style={tw`bg-gray-100 p-3 rounded-lg`}>
                        <Text style={tw`text-gray-700 font-semibold`}>
                            {bookingInfo.from} ⮕ {bookingInfo.to}
                        </Text>
                        <Text style={tw`text-gray-500 text-sm`}>
                            {bookingInfo.departureTime} - {bookingInfo.arrivalTime},{' '}
                            {bookingInfo.date}
                        </Text>
                    </View>

                    <View style={tw`mt-3`}>
                        <Text style={tw`text-gray-700`}>{bookingInfo.company}</Text>
                        <Text style={tw`text-gray-700 text-sm`}>{bookingInfo.busType}</Text>
                    </View>

                    <View style={tw`mt-3`}>
                        <Text style={tw`text-gray-700`}>Seats</Text>
                        <Text style={tw`text-gray-500 text-sm`}>{bookingInfo?.seats?.toString()}</Text>
                    </View>

                    <View style={tw`my-6 w-full`}>
                        <Svg height="2" width="100%">
                            <Line
                                x1="0"
                                y1="1"
                                x2="100%"
                                y2="1"
                                stroke="gray"
                                strokeWidth="2"
                                strokeDasharray="6,6"
                            />
                        </Svg>
                    </View>

                    <View style={tw`mt-3`}>
                        <Text style={tw`text-gray-700`}>
                            Ticket #: {bookingInfo.ticketNumber}
                        </Text>
                        <Text style={tw`text-gray-700`}>PNR #: {bookingInfo.pnr}</Text>
                        <Text style={tw`text-lg font-bold text-green-600 mt-2`}>₹{bookingInfo.fare}</Text>
                    </View>

                    <TouchableOpacity style={tw`bg-red-500 flex-row gap-2 p-3 rounded-lg mt-4 justify-center items-center`}>
                        <ArrowUpOnSquareIcon color="white" />
                        <Text style={tw`text-white font-semibold`}>
                            Share your ticket
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
       </Modal>
    )
}
export default TicketModal

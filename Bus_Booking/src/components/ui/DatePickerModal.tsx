import React, { useState } from 'react'
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import tw from 'twrnc'

interface DatePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (date: Date) => void;
    selectedDate: Date;
}


const  DatePickerModal: React.FC<DatePickerModalProps> = ({
    visible,
    onClose,
    onConfirm,
    selectedDate,
}) => {
    const [tempDate, setTempDate] = useState(selectedDate);

    if(Platform.OS === 'android'){
        return(
            <DateTimePicker
                value={tempDate}
                mode='date'
                display='default'
                onChange={(event,date) =>{
                    if(date){
                        // onConfirm(tempDate);
                        // onClose();
                        setTempDate(date); // Update tempDate with the selected date
                        onConfirm(date); // Pass the selected date to the parent
                        onClose(); 
                    }
                }}
            />
        )
    }

    return(
        <Modal
        transparent={true}
        visible={visible}
        animationType='slide'
        >
            <View style={[tw`flex-1 justify-center`,{backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                <View style={tw`bg-white p-4 rounded-3xl mx-2`}>
                    {Platform.OS === 'ios' && (
                        <DateTimePicker
                            value={tempDate}
                            mode='date'
                            display='spinner'
                            onChange={(event, date) => date && setTempDate(date)}
                        />
                    )}
                    <View style={tw`flex-row justify-between mt-4`}>
                        <TouchableOpacity
                        onPress={onClose}
                        style={tw`p-3 bg-gray-300 rounded-lg flex-1 mx-2`}
                        >
                            <Text style={tw`text-center text-black font-bold`}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() =>{
                            onConfirm(tempDate);
                            onClose();
                        }}
                        style={tw`p-3 bg-blue-500 rounded-lg flex-1 mx-2`}
                        >
                            <Text style={tw`text-center text-white font-bold`}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
      )
}


export default DatePickerModal

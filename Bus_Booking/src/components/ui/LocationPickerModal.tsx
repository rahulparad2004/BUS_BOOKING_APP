import React, { useState } from 'react'
import { FlatList, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { locations } from '../../utils/dummyData';
import tw from 'twrnc'


interface LocationPickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (location: string, type: 'from' | 'to') => void;
    type: 'from' | 'to';
    fromLocation?: string; 
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
    visible,
    onClose,
    onSelect,
    type,
    fromLocation,
}) => {
    const [search, setsearch] = useState('')

    const filteredLocations = locations.filter(loc => loc.toLowerCase().includes(search.toLowerCase()));

  return(
    <Modal transparent={false} visible={visible} animationType='slide'>
        <View style={tw`flex-1 bg-white p-4`}>
            <SafeAreaView />
                <Text style={tw`text-lg font-bold text-center mb-4`}>
                    Select {type == 'from' ? 'Departure' : 'Destination'} City
                </Text>
                <TextInput
                style={tw` p-3 border border-gray-400 rounded-md mb-4`}
                placeholder='Search City...'
                value={search} 
                onChangeText={setsearch}
                />

                <FlatList
                    data={filteredLocations}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <TouchableOpacity
                        onPress={() => {
                            if(type == 'to' && item === fromLocation){
                                return;
                            }
                            onSelect(item, type);
                            onClose();
                        }}
                        style={tw`p-3 border-b border-gray-300`}>
                            <Text style={tw`text-md ${item == fromLocation ? 'text-gray-400' : 'text-black'}`}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />    
                
                <TouchableOpacity
                onPress={onClose}
                style={tw`p-3 bg-gray-300 rounded-lg mt-4`}
                >
                    <Text style={tw`text-center text-black font-bold`}>Cancel</Text>
                </TouchableOpacity>
        </View>
        <SafeAreaView/>
    </Modal>
  )
}

export default LocationPickerModal

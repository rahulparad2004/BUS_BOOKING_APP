import React,{useState} from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { navigate } from '../../utils/NavigationUtils';
import tw from 'twrnc'
import LinearGradient from 'react-native-linear-gradient';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import DatePickerModal from '../ui/DatePickerModal';
import LocationPickerModal from '../ui/LocationPickerModal';

const Search = () => {
  const  [from, setfrom] = useState<string | null >(null);
  const [to, setto] = useState<string | null >(null);
  const [date, setdate] = useState(new Date());
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [locationType, setlocationType] = useState<'from' | 'to'>('from');
  const [showLocationPicker, setshowLocationPicker] = useState(false);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleLocationSet = (location: string, type: 'from' | 'to') =>{
    if (type === 'from') {
      setfrom(location);
      if (location === to) {
        setto(null);
      }
    } else {
      setto(location);
    }
  };


  const handleSearchBuses = () => {
    if(!from || !to) {
      Alert.alert('Missing Information', 'Please select both from and to locations.');
      return;
    }
    if (from === to) {
      Alert.alert('Invalid Selection', 'From and To locations cannot be the same.');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if(date < today) {
      Alert.alert('Invalid Date', 'Please select a date that is today or in the future.');
      return;
    }


    // navigate('BusListScreen', {item: {from, to, date}});
    navigate('BusListScreen', {item: {from, to, date: date.toISOString()}});
  }
  
  

  
  return (
    <View style={tw`rounded-b-3xl overflow-hidden `}>
      <LinearGradient
        colors={['#78B0E6', '#fff']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}>
        <View style={tw`p-4`}>
          <View style={tw`my-4 border border-1 z-20 bg-white rounded-md border-gray-600`}>
            <TouchableOpacity 
            style={tw`p-4 flex-row gap-4 items-center`}
            onPress={() => {
              setlocationType('from');
              setshowLocationPicker(true);
            }}
            >
              <Image 
              style={tw`w-6 h-6`}
              source={require('../../assets/images/bus.png')}/>
              <Text style={tw`w-[90%] text-lg font-okra text-gray-700 `}>
                {from || 'From'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            onPress={() => {
              setlocationType('to');
              setshowLocationPicker(true);
            }}
            style={tw`p-4 border-t-[1px] border-b-[1px] border-gray-400 flex-row gap-4 items-center`}
            >
              <Image 
              style={tw`w-6 h-6`}
              source={require('../../assets/images/bus.png')}/>
              <Text style={tw`w-[90%] text-lg font-okra text-gray-700 `}>
                {to || 'To'}
              </Text>
            </TouchableOpacity>

            <View style={tw`flex-row items-center p-2 justify-between`}>
              {/* Today and Tomorrow button */}
              <View style={tw`flex-row items-center`}>
                <TouchableOpacity
                style={[tw`p-2 mr-2 rounded-lg bg-secondary`, { backgroundColor: '#FDBB8A' }]}
                onPress={() => setdate(new Date())} 
                >
                  <Text style={tw`font-bold text-sm font-okra`}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[tw`p-2 mr-2 rounded-lg bg-secondary`, { backgroundColor: '#FDBB8A' }]}
                onPress={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(date.getDate() + 1);
                  setdate(tomorrow);
                }} 
                >
                  <Text style={tw`font-bold text-sm font-okra`}>Tomorrow</Text>
                </TouchableOpacity>


              </View>
              {/* calender button */}
                <TouchableOpacity 
                style={tw`flex-row items-center`}
                onPress={() => setshowDatePicker(true)}
                >
                  <View style={tw`mr-3`}>
                    <Text style={tw`flex-row items-normal font-okra text-gray-500`}>
                      Date of Journey
                    </Text>
                    <Text style={tw`text-md font-bold font-okra text-gray-900`}>
                      {date.toDateString()}
                    </Text>
                  </View>
                  <CalendarDaysIcon color="#000" size={25} />
                </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
          onPress={handleSearchBuses}
          style={tw`bg-red-500 p-3 rounded-xl flex-row items-center justify-center gap-2`}
          >
            <MagnifyingGlassIcon color={'#fff'} size={22} />
            <Text style={tw`font-okra text-bold text-white text-lg`}>
              Search Buses
            </Text>
          </TouchableOpacity>
            <Image 
              source={require('../../assets/images/sidebus.jpg')}
              style={tw`h-40 rounded-lg my-4 w-full`}
            />            
        </View>
      </LinearGradient>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DatePickerModal
        visible = {showDatePicker}
        onClose={() => setshowDatePicker(false)}
        onConfirm={setdate}
        selectedDate={date}
        />
      )}

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <LocationPickerModal
        visible={showLocationPicker}
        onClose={() => setshowLocationPicker(false)}
        onSelect={handleLocationSet}
        type={locationType}
        fromLocation={from || undefined}
        />
      )}


    </View>
    )
}

export default Search
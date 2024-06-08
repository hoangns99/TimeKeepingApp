import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as Application from 'expo-application';
import moment from 'moment';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Circle, Svg } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { addTimeKeepingApi } from '../redux/apis/addTimeKeeping';
import DateTimePicker from "@react-native-community/datetimepicker";
import { getTimeKeepingApi } from '../redux/apis/timeKeeping';
import { updateTimeKeepingApi } from '../redux/apis/updateTimeKeeping';
import { logOutFailed, logOutStart, logOutSuccess } from '../redux/reducers/authSlice';
import { cleanAddTimeKeepingStatus } from '../redux/reducers/addTimeKeepingSlice';
import { cleanUpdateTimeKeepingStatus } from '../redux/reducers/updateTimeKeepingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth?.currentUser);
  const loginDate = useSelector((state) => state.auth?.loginDate);
  const addTimeKeepingStt = useSelector((state)=> state.addTimeKeeping?.success);
  const updateTimeKeepingStt = useSelector((state)=> state.updateTimeKeeping?.success);
  const timeKeepingInfo = useSelector((state) => state.timekeeping?.timeKeepingInfo);

  const TEN_NV = userInfo?.USERNAME;
  const MAVT = '0';
  const TRX_DATE = moment().format('YYYY-MM-DD');
  const currentDate = moment().format('DD-MM-YYYY');

  const [location, setLocation] = useState();
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [THIETBI, setTHIETBI] = useState();
  const [KINHDO, setKINHDO] = useState();
  const [VIDO, setVIDO] = useState();
  const [checkin, setCheckIn] = useState("Chưa có thông tin");
  const [checkout, setCheckOut] = useState("Chưa có thông tin");
  const [date, setDate] = useState(new Date());

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

  const getInOutTime = async () => {
    setCheckIn(await AsyncStorage.getItem('checkin'));
    setCheckOut(await AsyncStorage.getItem('checkout'));
  }

  const getInfoDevice = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Please grant location permissions');
        return;
      }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    let idDevice = await Application.getIosIdForVendorAsync();
    setTHIETBI(idDevice);
  }

  const checkDate = () => {
    
    if(loginDate && currentDate !== loginDate) {
      handleLogOut();
    }
  }

  useEffect(() => {
    const data = {
      TEN_NV: TEN_NV,
      TRX_DATE: TRX_DATE
    }
    getTimeKeepingApi(data, dispatch);
    getInfoDevice();
    getInOutTime();
  }, [addTimeKeepingStt, updateTimeKeepingStt]);
    
  useEffect(() => {
    if(location) {
      setKINHDO(location.coords.longitude);
      setVIDO(location.coords.latitude);
    }
  }, [location]);

  useEffect(() => {
    checkDate();
  }, []);

  const handleTimeKeeping = async () => {
    setTime(moment().format('HH:mm:ss'));
    const newTimeKeeping = {
      //TEN_NV, MAVT, TRX_DATE, GIOVAO, GIORA, THIETBI, KINHDO, VIDO
      TEN_NV: TEN_NV,
      MAVT: MAVT,
      TRX_DATE: TRX_DATE,
      GIOVAO: time,
      GIORA: time,
      THIETBI: THIETBI,
      KINHDO: KINHDO,
      VIDO: VIDO
    }

    // console.log("Thông tin chấm công", newTimeKeeping);
    // console.log("Trạng thái chấm công: ", addTimeKeepingStt);
    if(addTimeKeepingStt == false){
      addTimeKeepingApi(newTimeKeeping, dispatch);
      await AsyncStorage.setItem('checkin', time);
    } else if(addTimeKeepingStt == true && updateTimeKeepingStt == false) {
      updateTimeKeepingApi(newTimeKeeping, dispatch);
      await AsyncStorage.setItem('checkout', time);
    }
  }

  const handleGetHistoryTimeKeeping = () => {
    const trx_date = date.toISOString().split('T')[0];
    const data = {
      TEN_NV: TEN_NV,
      TRX_DATE: trx_date
    }
    getTimeKeepingApi(data, dispatch);
  }

  const handleLogOut = async () => {
    dispatch(logOutStart());
    try {
      dispatch(logOutSuccess());
      dispatch(cleanAddTimeKeepingStatus());
      dispatch(cleanUpdateTimeKeepingStatus());
      await AsyncStorage.removeItem('checkin');
      await AsyncStorage.removeItem('checkout');
    } catch (error) {
      dispatch(logOutFailed());
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile} >
        <FontAwesome name="user-circle" size={60} color="black" style={styles.userProfile} />
          <View >
              <Text style={{paddingTop: 5, marginLeft: 20, fontSize: 20, fontWeight: 'bold'}}>{userInfo?.FULLNAME}</Text>
              <Text style={{marginLeft:20, paddingVertical: 10, fontSize: 15 }}>{userInfo?.TOLV}</Text>
          </View>
      </View>
      <View style={styles.status}>
          <View style={styles.leftStatus}>
              <Text style={styles.statusText}>Chấm công vào</Text>
              <Text style={styles.statusText}>Chấm công ra</Text>
          </View>
          <View style={styles.rightStatus}>
              <Text style={styles.statusText}>{checkin}</Text>
              <Text style={styles.statusText}>{checkout}</Text>
          </View>
      </View>
      <View style={styles.historyStatus}>
          <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 20}}>Lịch sử chấm công</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.leftStatus}>
              <Text style={styles.statusText}>Ngày</Text>
              <Text style={styles.statusText}>Giờ vào</Text>
              <Text style={styles.statusText}>Giờ ra</Text>
            </View>
            <View style={styles.rightStatus}>
                <Text style={styles.statusText}>{date.toLocaleDateString('en-GB')}</Text>
                <Text style={styles.statusText}>{timeKeepingInfo?.GIOVAO ? timeKeepingInfo?.GIOVAO : "Chưa có thông tin"}</Text>
                <Text style={styles.statusText}>{timeKeepingInfo?.GIORA ? timeKeepingInfo?.GIORA : "Chưa có thông tin"}</Text>
                
            </View>
          </View>
          <View style={styles.actionArea}>
            <DateTimePicker
                style = {styles.datePicker}
                value={date}
                mode={"date"}
                maximumDate={new Date()}
                onChange={onChange}
            />
            <TouchableOpacity style={styles.historyButton} onPress={handleGetHistoryTimeKeeping}>
                <Text style={styles.historyBtnText}>Xem lịch sử</Text>
            </TouchableOpacity>
          </View>
          
      </View>
      <TouchableOpacity style={styles.circleButton} onPress={handleTimeKeeping}>
      <Text style={styles.textButton}>Chấm Công</Text>
          <Svg viewBox='0 0 100 100' >
              <Circle
                  cx='50'
                  cy='50'
                  r='45'
                  stroke='#7469B6'
                  strokeWidth='5'
                  fill='transparent'
              />
          </Svg>
      </TouchableOpacity>
      {/* <View>
        <TouchableOpacity onPress={handleLogOut}>
            <View>
                <Text>Đăng xuất</Text>
            </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    profile: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginHorizontal: '5%',
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 80
    },
    userProfile: {
      marginLeft: 35
    },
    status: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      marginHorizontal: '5%',
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 30
    },
    leftStatus: {
      marginLeft: 20
    },
    rightStatus: {
      marginRight: 20
    },
    statusText: {
      paddingVertical: 10
    },
    historyStatus: {
      backgroundColor: '#fff',
      marginHorizontal: '5%',
      paddingVertical: 20,
      borderRadius: 10,
      marginTop: 30
    },
    actionArea: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
    },
    datePicker: {
      marginRight: 20,
    },
    historyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2A629A',
      borderRadius: 20,
      width: '40%',
      height: '100%'
    },
    historyBtnText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#fff'
    },
    circleButton: {
      flex: 0.7,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 80,
      marginTop: 30
      // marginVertical: 30
    },
    textButton: {
      fontSize: 24,
      fontWeight:'bold',
      position: 'absolute'
    }
  });
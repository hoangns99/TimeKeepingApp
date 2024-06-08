import React, { useEffect, useState } from "react";
import * as Application from 'expo-application';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginApi } from "../redux/apis/login";

export default function Login() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [deviceID, setDeviceID] = useState();
    const [secureTextEntry,setSecureTextEntry] = useState(true);

    const showPassword = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    const getDeviceID = async () => {
        let deviceID = await Application.getIosIdForVendorAsync();
        setDeviceID(deviceID);
    }

    useEffect(()=> {
        getDeviceID();
    }, [])

    const showDeviceID = () => {
        Alert.alert('ID thiết bị là: ', deviceID);
    }
    const handleLogin = () => {
        const user = {
            USERNAME: userName,
            PASS: password,
            THIETBI: deviceID
        };
        loginApi(user, dispatch, navigation);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.headerImg}
                        alt="Logo"
                    />
                    <Text style={styles.title}>
                        Đăng nhập
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Tên đăng nhập</Text>
                        <TextInput
                            style={styles.inputControl}
                            placeholder="Nhập tên đăng nhập"
                            placeholderTextColor="#6b7280"
                            onChange={e => setUserName(e.nativeEvent.text)}
                        />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Mật khẩu</Text>
                        <View style={styles.inputPassword}>
                        <TextInput
                            style={styles.inputControlPassword}
                            secureTextEntry={secureTextEntry}
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor="#6b7280"
                            onChange={e=> setPassword(e.nativeEvent.text)}
                        />
                        
                        <TouchableOpacity onPress={showPassword}>
                            {
                                secureTextEntry ? (
                                    <Ionicons name="eye-outline" size={24} color="black" />
                                ) : (<Ionicons name="eye-off-outline" size={24} color="black" />)
                            }
                        </TouchableOpacity>
                        </View>
                        
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={handleLogin} >
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Đăng nhập</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ marginTop: 'auto' }} onPress={showDeviceID} >
                        <Text style={styles.formFooter}> Xem mã thiết bị </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flex: 1
    },
    header: {
        marginVertical: 16
    },
    headerImg: {
        width: 250,
        height: 150,
        alignSelf: 'center',
        marginBottom: 10
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1e1e1e',
        textAlign: 'center',
        marginBottom: 16
    },
    input: {
        marginBottom: 16
    },
    inputPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 44,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    inputControlPassword: {
        height: 44,
        fontSize: 15,
        fontWeight: '500',
        color: '#222', 
        flex: 1
    },
    form: {
        marginBottom: 24,
        flex: 1
    },
    formAction: {
        marginVertical: 24
    },
    formFooter: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15
      },
    btn: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#075eec',
        backgroundColor: '#075eec',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    }
  });
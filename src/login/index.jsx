import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../config/db';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        db.transaction((tx) => {
            // SELECT query untuk memeriksa apakah username dan password cocok
            tx.executeSql(
                'SELECT * FROM users WHERE username = ? AND password = ?;',
                [username, password],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        navigation.navigate('Home'); // Navigasi ke halaman Home setelah login berhasil
                    } else {
                        alert('Username atau password salah. Silakan coba lagi.');
                    }
                },
                (error) => {
                    alert('Terjadi kesalahan: ' + error);
                }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logocasflow.png')}
                style={styles.logo}
            />
            {/* <Text style={styles.appTitle}>MyCashBook</Text> */}
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={{ width: '80%' }}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>Belum punya Akun? <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{ fontWeight: 'bold' }}>Sign Up</Text></TouchableOpacity></Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'semi-bold',
        color: 'black',
        marginTop: 10,
        alignSelf: 'flex-start',
        width: '80%',
        marginLeft: '10%'
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#435ED1',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default LoginScreen;

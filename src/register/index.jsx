import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../config/db';

function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        db.transaction((tx) => {
            // Lakukan INSERT data pengguna ke dalam tabel users
            tx.executeSql(
                'INSERT INTO users (username, password) VALUES (?, ?);',
                [username, password],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        alert('Registrasi berhasil!');
                        navigation.navigate('Login'); // Navigasi ke halaman login setelah registrasi
                    } else {
                        alert('Registrasi gagal. Silakan coba lagi.');
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
            <Text style={styles.title}>Register</Text>

            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={{ width: '80%' }}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Daftar</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Sudah punya Akun? <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ fontWeight: 'bold' }}>Sign In</Text></TouchableOpacity></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#435ED1'
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
    button: {
        backgroundColor: '#435ED1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RegisterScreen;

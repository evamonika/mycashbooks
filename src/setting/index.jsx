import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import db from '../config/db';

function SettingScreen({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSimpan = () => {
        db.transaction((tx) => {
            // SELECT query untuk memeriksa apakah password saat ini benar
            tx.executeSql(
                'SELECT * FROM users WHERE username = ? AND password = ?;',
                ['user', currentPassword], // Mengganti 'user' sesuai dengan username
                (tx, results) => {
                    if (results.rows.length > 0) {
                        // UPDATE query untuk mengganti password
                        tx.executeSql(
                            'UPDATE users SET password = ? WHERE username = ?;',
                            [newPassword, 'user'], // mengganti 'user' sesuai dengan username
                            (tx, results) => {
                                if (results.rowsAffected > 0) {
                                    alert('Password berhasil direset.');
                                } else {
                                    alert('Gagal mereset password. Silakan coba lagi.');
                                }
                            },
                            (error) => {
                                alert('Terjadi kesalahan: ' + error);
                            }
                        );
                    } else {
                        // Password saat ini tidak cocok
                        alert('Password saat ini salah. Silakan coba lagi.');
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
            <Text style={styles.title}>Pengaturan</Text>

            <Text style={styles.label}>Ganti Password</Text>

            <Text style={styles.subLabel}>Password Saat Ini</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan password saat ini"
                secureTextEntry
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
            />

            <Text style={styles.subLabel}>Password Baru</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan password baru"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSimpan}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <View style={styles.aboutContainer}>
                <View style={styles.aboutHeader}>
                    <Text style={styles.aboutHeaderText}>Tentang Aplikasi</Text>
                </View>
                <View style={styles.aboutContent}>
                    <Text style={styles.aboutLabel}>Dibuat oleh:</Text>
                    <Text style={styles.aboutText}>Eva Monika Septiana</Text>
                    <Text style={styles.aboutLabel}>NIM:</Text>
                    <Text style={styles.aboutText}>2141764017</Text>
                    <Text style={styles.aboutLabel}>Tanggal:</Text>
                    <Text style={styles.aboutText}>27 September 2023</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    subLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
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
    aboutButton: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    aboutContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    },
    aboutInfo: {
        fontSize: 14,
    },
    aboutContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    aboutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    aboutIcon: {
        marginRight: 10,
    },
    aboutHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    aboutContent: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    aboutLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    aboutText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },

});

export default SettingScreen;

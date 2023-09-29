import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import db from '../config/db'

function AddExpenditureScreen({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [nominal, setNominal] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const resetDate = () => {
        setDate(new Date());
    };

    const formatCurrency = (value) => {
        return 'Rp. ' + value.toLocaleString('id-ID');
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleSimpan = () => {
        const formattedDate = date.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        // Lakukan penyimpanan data pengeluaran ke dalam tabel transactions
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO transactions (type, amount, description, date) VALUES (?, ?, ?, ?);',
                ['pengeluaran', nominal, keterangan, formattedDate],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        alert('Data pengeluaran berhasil disimpan.');
                        // Kembali ke halaman sebelumnya (Home)
                        navigation.goBack();
                    } else {
                        console.warn('Gagal menyimpan data pengeluaran.');
                    }
                },
                (error) => {
                    console.error('Terjadi kesalahan: ' + error);
                }
            );
        });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tambah Pengeluaran</Text>

            <Text style={styles.label}>Tanggal:</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
                <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                />
            )}

            <Text style={styles.label}>Nominal:</Text>
            <TextInput
                style={styles.input}
                value={formatCurrency(nominal)}
                onChangeText={(text) => setNominal(text.replace(/\D/g, ''))}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Keterangan:</Text>
            <TextInput
                style={styles.input}
                value={keterangan}
                onChangeText={(text) => setKeterangan(text)}
            />

            <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={resetDate}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleSimpan}>
                <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Kembali</Text>
            </TouchableOpacity>
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
        color: 'red',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        textAlign: 'left'
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
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    datePickerButton: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

export default AddExpenditureScreen;

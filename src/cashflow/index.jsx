import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import db from '../config/db';

function CashflowScreen({ navigation }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Mengambil data transaksi dari tabel transactions
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM transactions;',
                [],
                (tx, { rows }) => {
                    // Mengonversi hasil query ke dalam bentuk array
                    const result = [];
                    for (let i = 0; i < rows.length; i++) {
                        result.push(rows.item(i));
                    }
                    setTransactions(result);
                },
                (error) => {
                    console.error('Terjadi kesalahan: ' + error);
                }
            );
        });
    }, []);

    const removeAllTransaction = () => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM transactions', [], (tx, results) => {
                if (results.rowsAffected > 0) {
                    alert('Semua data berhasil dihapus dari tabel transactions.');
                } else {
                    alert('Tidak ada data yang dihapus dari tabel transactions.');
                }
            });
        });
    }

    const renderItem = ({ item }) => (
        <View style={styles.transactionItem}>
            <AntDesign
                name={item.type === 'pemasukan' ? 'arrowleft' : 'arrowright'}
                color={item.type === 'pemasukan' ? 'green' : 'red'}
                size={24}
            />
            <View style={styles.transactionDetails}>
                <Text style={styles.transactionAmount}>
                    {[item.type === 'pemasukan' ? '+ ' : '- ', 'Rp. ', item.amount.toLocaleString('id-ID')]}
                </Text>
                <Text style={styles.transactionDescription}>{item.description}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detail Cash Flow</Text>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={[styles.backButton, { backgroundColor: 'red' }]}
                onPress={removeAllTransaction}
            >
                <Text style={styles.backButtonText}>Hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Kembali</Text>
            </TouchableOpacity>
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
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    transactionDetails: {
        flex: 1,
        marginLeft: 10,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    transactionDescription: {
        fontSize: 14,
        color: 'black',
    },
    transactionDate: {
        fontSize: 12,
        color: 'grey',
    },
    backButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CashflowScreen;

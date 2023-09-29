import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import db from '../config/db';

function HomeScreen({ navigation }) {
    const [totalPemasukan, setTotalPemasukan] = useState(0);
    const [totalPengeluaran, setTotalPengeluaran] = useState(0);
    const [chartData, setChartData] = useState();

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT SUM(amount) AS total FROM transactions WHERE type = "pemasukan";',
                [],
                (_, { rows }) => {
                    setTotalPemasukan(rows.item(0).total || 0);
                }
            );

            tx.executeSql(
                'SELECT SUM(amount) AS total FROM transactions WHERE type = "pengeluaran";',
                [],
                (_, { rows }) => {
                    setTotalPengeluaran(rows.item(0).total || 0);
                }
            );
        });

        const fetchDailyData = () => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT date, SUM(CASE WHEN type = "pemasukan" THEN amount ELSE -amount END) AS total FROM transactions GROUP BY date',
                    [],
                    (_, { rows }) => {
                        const result = [];
                        for (let i = 0; i < rows.length; i++) {
                            result.push(rows.item(i));
                        }
                        setChartData(result);
                    }
                );

            });
        };
        fetchDailyData();
    }, []);

    const label = chartData?.map((el) => el.date?.slice(3, 5))
    const data = chartData?.map(el => el.total)

    return (
        <View style={styles.container}>
            <Text style={styles.summaryTitle}>Rangkuman Bulan Ini</Text>
            <Text style={[styles.summaryText, { color: 'red' }]}>
                Pengeluaran: Rp. {totalPengeluaran.toLocaleString('id-ID')}
            </Text>
            <Text style={[styles.summaryText, { color: 'green' }]}>
                Pemasukan: Rp. {totalPemasukan.toLocaleString('id-ID')}
            </Text>
            <View >
                <LineChart
                    data={{
                        labels: label || [],
                        datasets: [
                            {
                                data: data || []
                            }
                        ]
                    }}
                    width={350}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `black`,
                        labelColor: (opacity = 1) => `black`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    verticalLabelRotation={30}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
            <View style={styles.imageButtonContainer}>
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddIncome')}
                        style={styles.imageButton}
                    >
                        <Image
                            source={require('../assets/profits.png')}
                            style={styles.image}
                        />
                        <Text style={styles.imageText}>Tambah Pemasukan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddExpenditure')}
                        style={styles.imageButton}
                    >
                        <Image
                            source={require('../assets/pengeluaran.png')}
                            style={styles.image}
                        />
                        <Text style={styles.imageText}>Tambah Pengeluaran</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CashFlow')}
                        style={styles.imageButton}
                    >
                        <Image
                            source={require('../assets/cash-flow.png')}
                            style={styles.image}
                        />
                        <Text style={styles.imageText}>Detail Cash Flow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Setting')}
                        style={styles.imageButton}
                    >
                        <Image
                            source={require('../assets/setting.png')}
                            style={styles.image}
                        />
                        <Text style={styles.imageText}>Pengaturan</Text>
                    </TouchableOpacity>
                </View>
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
    summaryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 16,
        marginBottom: 10,
    },
    imageButtonContainer: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageButton: {
        borderWidth: 1,
        borderColor: 'orange',
        margin: 10,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        width: 150,
    },
    image: {
        width: 50,
        height: 50,
    },
    imageText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;

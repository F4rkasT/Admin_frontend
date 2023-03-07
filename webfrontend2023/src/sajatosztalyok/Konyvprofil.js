// Szükséges komponensek importálása
import React, { Component } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Button, Pressable, Modal, SafeAreaView, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// IP cím importálása
const IP = require('./Ipcim');

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            katt: true,
            datauzenet: [],
            datauzenet2: [],
            iroid: '0',
            konyvid: '3',
            modalVisible: false,
            date: new Date(),
            date2: new Date(),
            datum: "",
            show: false,
            show2: false
        };
    }
    tobb = () => {

        this.state.katt ? this.setState({ katt: false }) : this.setState({ katt: true })
    }

    konyv = async (valamiid) => {
        this.setState({ konyvid: valamiid })
        //alert(valamiid)
        //uzenet backend végpont meghívása
        try {
            let adatok = {
                konyvid: valamiid
            }
            const response = await fetch(IP.ipcim + 'konyvprofil',
                {
                    method: "POST",
                    body: JSON.stringify(adatok),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                }
            );
            const json = await response.json();
            //alert(JSON.stringify(json))
            //console.log(json)
            this.setState({ datauzenet: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }



    felvitel = async () => {
        alert("Sikeres Felvitel")

        //uzenet backend végpont meghívása
        try {
            let adatok = {
                bevitel1: this.state.date2,
                bevitel2: this.state.konyvid,



            }
            const response = await fetch(IP.ipcim + 'ujkolcsonzes',
                {
                    method: "POST",
                    body: JSON.stringify(adatok),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                }
            );
            const json = await response.json();
            //alert(JSON.stringify(json))
            //console.log(json)
            this.setState({ datauzenet: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
            this.setState({ modalVisible: false });

        }
        this.konyv(this.props.route.params.konyvid)
    }

    componentDidMount() {
        this.konyv(this.props.route.params.konyvid);
    }


    onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        this.setState({ show: false });
        this.setState({ date: currentDate });


    };

    onChange2 = (event, selectedDate) => {
        const currentDate2 = selectedDate;
        this.setState({ show2: false });
        this.setState({ date2: currentDate2 });


    };

    showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            this.setState({ show: true });
            // for iOS, add a button that closes the picker
        }


    };

    showMode2 = (currentMode) => {
        if (Platform.OS === 'android') {
            this.setState({ show2: true });
            // for iOS, add a button that closes the picker
        }


    };

    showDatepicker = () => {
        this.showMode('date')
    };

    showDatepicker2 = () => {
        this.showMode2('date')
    };

    magyarul = () => {
        console.log(this.state.date)
    }


    render() {
        const { data, katt, isLoading, datauzenet, datauzenet2, modalVisible } = this.state;

        return (
            <SafeAreaView style={{ backgroundColor: 'rgb(245, 240, 230)', height: '100%' }}>
                <FlatList
                    data={datauzenet}
                    renderItem={({ item }) => (
                        <View>
                            <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150, height: 250, alignSelf: 'center', borderRadius: 5 }} />
                            <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: 15, fontWeight: 'bold' }}>{item.konyv_cime}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15, paddingBottom: 15, fontWeight: 'bold' }}>{item.kp_leiras}</Text>
                            {/* Modal */}
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    this.setState({ modalVisible: !modalVisible });
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        {/*<Button onPress={this.magyarul} title="Dátumlog" />*/}

                                        <Button onPress={this.showDatepicker2} title="Ettől" />
                                        <Text style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: "grey", textAlign: "center", width: 200, margin: 10, padding: 10 }}>
                                            {this.state.date2.getFullYear() + "/" + (this.state.date2.getMonth() + 1) + "/" + this.state.date2.getDate()}
                                        </Text>

                                        {this.state.show2 && (
                                            <DateTimePicker
                                                testID="dateTimePicker2"
                                                value={this.state.date2}
                                                mode="date"
                                                is24Hour={true}
                                                onChange={this.onChange2}
                                                minimumDate={new Date()}
                                            />
                                        )}
                                        {/************************************  +1 DATETIMEPICKER HA KÉNE
                                            <Button onPress={this.showDatepicker} title="Eddig" />
                                            <Text style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: "grey", textAlign: "center", width: 200, margin: 10, padding: 10 }}>
                                                {this.state.date.getFullYear() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getDate()}
                                            </Text>
                                            {this.state.show && (
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={this.state.date}
                                                    mode="date"
                                                    is24Hour={true}
                                                    onChange={this.onChange}
                                                    minimumDate={new Date()}
                                                    
                                                />
                                            )}
                                            **************************************/}
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => this.setState({ modalVisible: !modalVisible })}>
                                            <Text style={styles.textStyle}>Mégse</Text>
                                        </Pressable>

                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => this.felvitel()}>
                                            <Text style={styles.textStyle}>Foglalás</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    )}
                />
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => this.setState({ modalVisible: true })}>
                    <Text style={styles.textStyle}>Kölcsönzés</Text>
                </Pressable>
            </SafeAreaView>
        );
    }
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgb(245, 240, 230)',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#2196F3',
        bottom: 5,

    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


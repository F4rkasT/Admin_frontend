// Szükséges komponensek importálása
import React, { Component } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Button, Pressable, Modal, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// IP cím importálása
const IP = require('./IPcim');

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
            show2: false,
            katt: true
        };
    }
    tobb = () => {

        this.state.katt ? this.setState({ katt: false }) : this.setState({ katt: true })
    }

    konyv = async (valamiid) => {
        this.setState({ konyvid: valamiid })
        // alert(valamiid)
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
    componentWillUnmount(){
        this.konyv(this.props.route.params.konyvid)
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

    tobb = () => {

        this.state.katt ? this.setState({ katt: false }) : this.setState({ katt: true })
    }


    render() {
        const { data, katt, isLoading, datauzenet, datauzenet2, modalVisible } = this.state;

        return (
            <SafeAreaView style={{ backgroundColor: 'rgb(245, 240, 230)', height: '100%' }}>
                <StatusBar style="light" />

                <FlatList
                    data={datauzenet}
                    renderItem={({ item }) => (

                        <ScrollView style={{
                            flex: 1,
                            backgroundColor: "#ede4d1",

                        }}>

                            {/* -----------------------------------------------------------------Első block--------------------------------------------------------------------------------------------------------- */}
                            <View style={{ flex: 1, marginTop: '6%', backgroundColor: 'white', marginBottom: '1%', width: '90%', alignSelf: 'center', borderRadius: 10, elevation: 10 }}>
                                <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{item.konyv_cime}</Text>
                                {item.alcim != '' ? <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 15, fontWeight: 'bold' }}>{item.alcim}</Text> : <Text style={{ height: 12 }}>{item.alcim}</Text>}

                                <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 200, height: 300, alignSelf: 'center', borderRadius: 5 }} />

                                {/* Modal */}
                                <Modal
                                    animationType="fade"
                                    transparent={false}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
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
                                <Pressable
                                    style={{ backgroundColor: "#15374B", height: 70, borderRadius: 10, marginTop: "2%" }}
                                    onPress={() => this.setState({ modalVisible: true })}>
                                    <Text style={{

                                        color: 'white',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        height: "100%",
                                        textAlignVertical: 'center'
                                    }}>Kölcsönzés</Text>
                                </Pressable>
                            </View>
                            {/* ----------------------------------------------------------------Leírás---------------------------------------------------------------------------------------------------------- */}

                            <View style={{ flex: 1, marginTop: 15, backgroundColor: 'white', marginBottom: 12, width: '90%', alignSelf: 'center', borderRadius: 10, elevation: 10 }} >
                                <View style={{ margin: '2%' }}>
                                    <Text style={{ textAlign: 'left', fontSize: 30, fontWeight: 'bold', paddingBottom: 10, fontWeight: 'bold' }}>Leírás</Text>
                                    <Pressable onPress={() => this.tobb()}>
                                        {this.state.katt ? <Text style={{ fontSize: 16, paddingBottom: 15, fontWeight: '800', color: '#5e5e5e' }}>{item.kp_leiras.substring(0, 300)} ...Tovább</Text> : <Text style={{ fontSize: 16, paddingBottom: 15, fontWeight: '800', color: '#5e5e5e' }}>{item.kp_leiras}</Text>}
                                    </Pressable>
                                </View>
                            </View>


                            {/* ----------------------------------------------------------------Mufaj,író block---------------------------------------------------------------------------------------------------------- */}

                            <View style={{ flex: 1, marginTop: 15, backgroundColor: 'white', marginBottom: 12, width: '90%', alignSelf: 'center', borderRadius: 10, elevation: 10, height: 200 }}>
                                <Pressable style={{ flex: 1, flexDirection: 'row' }}  onPress={() => this.props.navigation.navigate('Iroprofil', { aktualid: item.iro_id})}>
                                    <MaterialCommunityIcons style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} size={25} name="pencil" color={"grey"} />
                                    <Text style={{ flex: 5, fontSize: 16,fontWeight: '800', textAlignVertical: 'center' }} >{item.iro_neve}</Text>
                                </Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('Mufajkonyv', { mufajid: item.mufaj1 })}>
                                    <MaterialIcons style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} size={25} name="category" color={"grey"} />

                                    <Text style={{ flex: 5, fontSize: 16,fontWeight: '800', textAlignVertical: 'center' }} >{item.mufaj_nev}</Text>
                                </Pressable>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <MaterialCommunityIcons style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} size={25} name="exclamation-thick" color={"grey"} />
                                    {item.kotelezoolvasmany ? <Text style={{ flex: 5,fontSize: 16,fontWeight: '800', textAlignVertical: 'center' }}>Kötelezőolvasmány</Text> : <Text style={{ flex: 5,fontSize: 16,fontWeight: '800', textAlignVertical: 'center' }}>Nem kötelezőolvasmány</Text>}
                                </View>

                            </View>
                            <StatusBar style="light" />
                        </ScrollView>

                        // <View style={{paddingTop:"2%"}}>

                        //     
                        //     
                        //    


                        // </View>
                    )}
                />

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
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
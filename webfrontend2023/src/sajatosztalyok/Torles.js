import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
const IP = require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      keres: ''
    };
  }


  async getMovies() {
    try {
      const response = await fetch(IP.ipcim + 'kolcsonzesek');
      const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  tordeles = (datum) => {
    let kecske1 = datum.split('T')
    return kecske1[0]
  }

  torles = (szam) => {
    alert(szam)
    var bemenet = {
      bevitel1: szam
    }

    fetch(IP.ipcim + 'torles', {
      method: "delete",
      body: JSON.stringify(bemenet),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    )
      .then((response) => response.text())
      .then((r) => {
        //alert(JSON.stringify(responseJson))
        alert(r)

      })
      .catch((error) => {
        console.error(error);
      });


  }


  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24, marginTop: 5, backgroundColor: 'rgb(245, 240, 230)' }}>

        <ScrollView>
          {isLoading ? <ActivityIndicator /> : (
            data.map(item =>
              <View style={{ paddingBottom: 15, textAlign:"center" }}>
                <Text style={{ fontSize: 30, color: 'red', textAlign: 'center', paddingBottom: 10, fontWeight: 'bold' }}><Text>A könyv címe:</Text> {item.konyv_cime} <br></br> <Text>Kölcsönzés dátuma:</Text> {this.tordeles(item.k_kezdet)}<br></br> <Text>Felhasználónév:</Text> {item.tp_felhasznalonev}</Text>
                <TouchableOpacity style={{ flex: 1,  }} onPress={() => this.torles(item.k_id)}  >
                  <Text style={{ fontSize: 8, backgroundColor: "brown", marginTop: 3, padding: 3, color: "white", textAlign: "center", height: 20, width: 20, borderRadius: 3 }}>X</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, color: 'darkred', textAlign: 'center', paddingBottom: 10, fontWeight: 'bold' }}></Text>
                <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150, height: 225, alignSelf: 'center', borderRadius: 5 }} />
               
              </View>
            )
          )}
        </ScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginLeft: 30,
    marginRight: 30
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});
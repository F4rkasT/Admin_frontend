import React, { Component } from 'react';
import {ActivityIndicator, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
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
      
      <View style={{flex: 1, padding: 24, marginTop: 5, backgroundColor: 'rgb(245, 240, 230)'}}>
        <ScrollView>
          {isLoading ? <ActivityIndicator /> : (
            data.map(item =>
              <View style={{ paddingBottom: 15, textAlign:"center", flexDirection: 'row'}}>
                <View style={{flex:5,paddingBottom:15,backgroundColor:"white",borderRadius:15}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}><Text>A könyv címe:</Text> {item.konyv_cime} <br></br> <Text>Kölcsönzés dátuma:</Text> {this.tordeles(item.k_kezdet)} <br></br> <Text style={{paddingBottom:15}}>Felhasználónév:</Text> {item.tp_felhasznalonev}</Text>
                <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150, height: 225, borderRadius: 5, alignSelf:"center"}} />
                </View>


                <View style={{flex: 1,backgroundColor:"grey",borderLeftColor:"blue",borderRadius:15}}>
                <TouchableOpacity style={{marginBottom:"auto",marginTop:"auto"}} onPress={() => this.torles(item.k_id)}>
                  <Text style={{alignSelf:"center",fontSize:"190%",width:'25%', textAlign: "center", backgroundColor:"white",fontWeight:"bold",borderRadius:100}}>X</Text>
                </TouchableOpacity>
                </View>
              </View>
            )
          )}
        </ScrollView>
      </View>
    );
  }
};

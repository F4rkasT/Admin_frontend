import React, { Component } from 'react';
import {ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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
      const response = await fetch(IP.ipcim + 'osszes');
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

  kattintas = () => { 
   
       //alert(this.state.keres)

       var bemenet={
        bevitel1:this.state.keres
       
      }
fetch(IP.ipcim+'osszeskereso', {
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      //alert(JSON.stringify(responseJson))
      this.setState({
   
        data: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
      }
    
  

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)' }}>
        <View style={{width:"90%",alignSelf:'center'}}>
        <TextInput
          style={{ height: 45, fontSize: 30,textAlign:'center',fontWeight:'bold' }}
          placeholder="Keress könyvet!"
          onChangeText={(beirtszoveg) => this.setState({ keres: beirtszoveg })}
          value={this.state.keres}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#15374B", margin: 5,borderRadius:10, height:45}}
          onPress={() => this.kattintas()}>
          <Text style={{margin:"auto", color:'white',fontSize:20,textAlignVertical:'center',alignSelf:'center', fontWeight:'bold'}}>Keresés</Text>
        </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)', paddingTop: "4%", }}>

        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                  <ScrollView style={{ width: "90%", alignSelf: 'center' }}>
                    <View style={{ flex: 1,paddingTop:'1%',paddingBottom:"1%",paddingLeft:'1%', marginBottom: 15,backgroundColor:"white",borderRadius:10,elevation:5}} >
                      <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', width: "90%" }} >
                        <View style={{ flex: 1 }}><Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 100, height: 150, alignSelf:'flex-end', borderRadius: 5 }} /></View>
                        <View style={{ marginLeft: 10, flex: 3 }}>
                          {item.alcim == "" ? 
                          <View style={{ flex: 1 }}>
                            <Text style={{ color: 'darkred', fontSize: 20, textAlignVertical: 'center', textAlign: 'center', flex: 1 }}>{item.konyv_cime}</Text>
                          </View>:
                          <View style={{ flex: 1 }}>
                            <Text style={{ color: 'darkred', fontSize: 20, textAlignVertical: 'bottom', textAlign: 'center', flex: 1 }}>{item.konyv_cime}</Text>
                            <Text style={{ fontWeight: '700', fontSize: 15, textAlignVertical: 'top', textAlign: 'center', flex: 1 }}>{item.alcim}</Text>
                          </View>}
                        </View>
                      </View>
                    </View>
                  </ScrollView>
              </View>
            )}
          />
        )}
      </View>
      </View>
    );
  }
};
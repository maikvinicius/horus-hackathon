import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import logo from '../assets/logo.jpg';

import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';

import {
    PieChart
} from "react-native-chart-kit";

export default class MainScreen extends Component {

    state = {
        products: '',
        address: '',
        radius: 5000,
        listAddress: [],
        place: null,
        city: '',
        latitude: -22.7427304,
        longitude: -45.5925402,
        markers: [],
        loading: false,
        region: {
            latitude: -22.7427304,
            longitude: -45.5925402,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        relatorioGeneros: [],
        relatorioIdades: [],
        relatorioProdutos: [],
    }

    onRegionChange(region) {
        this.setState({
            region: region
        });
    }

    openDrawer() {
        this.props.navigation.openDrawer();
    }

    async getAddress(place) {
        this.setState({ address: place })
        const apiKey = 'AIzaSyA3nJnxfBhpQ3DIsYCm5yZi_XV7qSv4gUE';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&language=pt_BR&key=${apiKey}`
        self = this;
        if (place.length > 4) {
            await axios.get(apiUrl, {})
                .then(function (response) {
                    if (self.state.listAddress && self.state.listAddress.length >= 0 && response.data.predictions.length > 0) {
                        self.setState({ listAddress: response.data.predictions })
                    }
                }).catch(error => {
                    self.setState({ listAddress: [] })
                });
        }
    }

    async selectedPlace(place) {
        const apiKey = 'AIzaSyA3nJnxfBhpQ3DIsYCm5yZi_XV7qSv4gUE';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,geometry&key=${apiKey}`
        self = this;
        this.setState({ loading: true })
        await axios.get(apiUrl, {})
            .then(async function (response) {
                self.setState({
                    region: {
                        latitude: response.data.result.geometry.location.lat,
                        longitude: response.data.result.geometry.location.lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    },
                    latitude: response.data.result.geometry.location.lat,
                    longitude: response.data.result.geometry.location.lng,
                    listAddress: [],
                    address: place.description
                });

                let lat = String(response.data.result.geometry.location.lat);
                let lng = String(response.data.result.geometry.location.lng);

                await axios.get("https://api.opencagedata.com/geocode/v1/json", {
                    params: {
                        q: `${lat},${lng}`,
                        key: "f4ee44678a53425884dc6e32c3e927be",
                        pretty: "1",
                        no_annotations: "1",
                        countrycode: "br",
                    },
                }).then(function (response) {
                    let resp = response.data.results[0].components;
                    if (!("city" in resp)) {
                        self.setState({ city: response.data.results[0].components.city_district });
                    } else {
                        self.setState({ city: response.data.results[0].components.city });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            }).finally(() => this.setState({ loading: false }));
    }

    async sendSearch() {
        const { address, products, radius, latitude, longitude, loading, city } = this.state;

        if (address.length > 0 && products.length > 0) {
            const data = {
                city: city,
                latitude: latitude,
                longitude: longitude,
                products: products,
                radius: radius,
            }
            self = this;
            if (!loading) {
                this.setState({ loading: true })
                await axios.post("https://horus-hackaton-api.herokuapp.com/random-geo-coordinates", data)
                    .then(function (response) {
                        const list = response.data.data;

                        let markers = []
                        let i = 1;

                        list.map(item => {
                            markers.push({
                                id: i,
                                latlng: { latitude: Number(item.latitude), longitude: Number(item.longitude) },
                                title: `${item.product}`,
                                description: `${item.sex} | ${item.age}`
                            })
                            i += 1;
                        });

                        self.insertReports(list)
                        self.setState({ markers: markers })

                    }).catch(error => {
                        console.log(error);
                    }).finally(() => this.setState({ loading: false }));
            }
        }
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    insertReports(list) {

        let feminino = 0;
        let outros = 0;
        let masculino = 0;

        let de13a25 = 0;
        let de26a50 = 0;
        let de51a80 = 0;

        let produtos = [];

        list.map(item => {

            switch (item.sex) {
                case 'Feminino':
                    feminino += 1;
                    break;
                case 'Outros':
                    outros += 1;
                    break;
                case 'Masculino':
                    masculino += 1;
                    break;
                default:
                    break;
            }

            if (item.age < 26) {
                de13a25 += 1;
            } else if (item.age > 25 && item.age < 51) {
                de26a50 += 1;
            } else if (item.age > 50 && item.age < 81) {
                de51a80 += 1;
            }

            let index = produtos.findIndex(produto => produto.name == item.product);
            if (index === undefined || index < 0) {
                produtos.push({
                    name: item.product,
                    population: 1,
                    color: this.getRandomColor(),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                });
            } else {
                produtos[index].population = produtos[index].population + 1;
            }

        });

        this.setState({
            relatorioGeneros: [
                {
                    name: "Feminino",
                    population: feminino,
                    color: "#3e95cd",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                },
                {
                    name: "Masculino",
                    population: masculino,
                    color: "#8d5da2",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                },
                {
                    name: "Outros",
                    population: outros,
                    color: "#3cbb9e",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                }
            ],
            relatorioIdades: [
                {
                    name: "- 13 a 25 anos",
                    population: de13a25,
                    color: "#3e95cd",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                },
                {
                    name: "- 26 a 50 anos",
                    population: de26a50,
                    color: "#8d5da2",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                },
                {
                    name: "- 51 a 80 anos",
                    population: de51a80,
                    color: "#3cbb9e",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                },
            ],
            relatorioProdutos: produtos,
        })
    }

    render() {

        const {
            listAddress,
            products,
            address,
            radius,
            region,
            loading,
            relatorioGeneros,
            relatorioIdades,
            relatorioProdutos
        } = this.state;

        return (
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.openDrawer()}>
                        <Ionicons name="md-menu" size={32} color="black" />
                    </TouchableOpacity>
                    <Text style={{ color: '#384873', fontSize: 16 }}>Hórus - Hackorona 2020</Text>
                    <Image source={logo} style={{ width: 30, height: 30 }} />
                </View>
                <ScrollView
                    nestedScrollEnabled={true}>
                    <View style={{ marginBottom: 40 }}>
                        {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
                        <View style={styles.card}>
                            <View style={styles.boxInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: Bolo de milho, Café, Pão..."
                                    placeholderTextColor="#929292"
                                    value={products}
                                    onChangeText={(value) => this.setState({ products: value })}
                                />
                                <TouchableOpacity style={styles.inputButton} onPress={() => this.sendSearch()}>
                                    <Ionicons name="md-search" size={20} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.boxInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: Av Paulista 123, Bela Vista - SP"
                                    placeholderTextColor="#929292"
                                    value={address}
                                    onChangeText={(value) => this.getAddress(value)}
                                />
                                <TouchableOpacity style={styles.inputButton} onPress={() => this.sendSearch()}>
                                    <Ionicons name="md-search" size={20} color="#000" />
                                </TouchableOpacity>
                            </View>
                            {
                                listAddress && listAddress.length > 0 &&
                                <View View style={{ alignItems: 'center' }}>
                                    <ScrollView
                                        nestedScrollEnabled={true}
                                        style={{ width: 300, height: 150, borderWidth: 1, borderColor: '#e1e1e1' }}>
                                        {listAddress.map(item => (
                                            <TouchableOpacity onPress={() => this.selectedPlace(item)} key={String(item.id)}>
                                                <View style={styles.boxSearchAddress}>
                                                    <Text style={styles.textAddress}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            }
                            <View style={{ marginTop: 10, paddingLeft: 16, paddingRight: 16, borderRadius: 20, borderWidth: 1, borderColor: '#e1e1e1' }}>
                                <RNPickerSelect
                                    onValueChange={(value) => this.setState({ radius: Number(value) })}
                                    items={[
                                        { label: '5 km', value: 5000 },
                                        { label: '8 km', value: 8000 },
                                        { label: '15 km', value: 15000 },
                                    ]}
                                    value={radius}
                                    placeholder={{
                                        label: 'Selecione o raio',
                                        value: null,
                                        color: '#929292',
                                    }}
                                    style={{
                                        inputIOS: {
                                            color: 'black',
                                            backgroundColor: '#FFF',
                                            width: 100,
                                            height: 40,
                                            borderRadius: 20,
                                            textAlign: 'center'
                                        },
                                        inputAndroid: {
                                            color: 'black',
                                            backgroundColor: '#FFF',
                                            width: 100,
                                            height: 40,
                                            borderRadius: 20,
                                            textAlign: 'center'
                                        },
                                    }}
                                />
                            </View>
                            <MapView
                                zoomEnabled={true}
                                style={styles.mapStyle}
                                region={region}
                                onRegionChange={region => {
                                    this.setState({ region });
                                }}>
                                {this.state.markers.map(marker => (
                                    <Marker
                                        key={String(marker.id)}
                                        coordinate={marker.latlng}
                                        title={marker.title}
                                        description={marker.description}
                                    />
                                ))}
                            </MapView>
                        </View>
                        {relatorioGeneros.length > 0 && relatorioIdades.length > 0 && relatorioProdutos.length > 0 &&
                            <View style={styles.card}>
                                <View style={styles.cardCenter}>
                                    <Text style={styles.titleCard}> Gêneros </Text>
                                    <PieChart
                                        data={relatorioGeneros}
                                        width={300} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#e26a00",
                                            backgroundGradientFrom: "#fb8c00",
                                            backgroundGradientTo: "#ffa726",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `#000`,
                                            labelColor: (opacity = 1) => `#000`
                                        }}
                                        accessor="population"
                                        backgroundColor="transparent"
                                        paddingLeft="15"
                                        absolute
                                        style={{ marginTop: 20 }}
                                    />
                                </View>
                                <View style={styles.cardCenter}>
                                    <Text style={styles.titleCard}> Idade </Text>
                                    <PieChart
                                        data={relatorioIdades}
                                        width={300} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#e26a00",
                                            backgroundGradientFrom: "#fb8c00",
                                            backgroundGradientTo: "#ffa726",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `#000`,
                                            labelColor: (opacity = 1) => `#000`
                                        }}
                                        accessor="population"
                                        backgroundColor="transparent"
                                        paddingLeft="15"
                                        absolute
                                        style={{ marginTop: 20 }}
                                    />
                                </View>
                                <View style={styles.cardCenter}>
                                    <Text style={styles.titleCard}> Produtos </Text>
                                    <PieChart
                                        data={relatorioProdutos}
                                        width={300} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#e26a00",
                                            backgroundGradientFrom: "#fb8c00",
                                            backgroundGradientTo: "#ffa726",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `#000`,
                                            labelColor: (opacity = 1) => `#000`
                                        }}
                                        accessor="population"
                                        backgroundColor="transparent"
                                        paddingLeft="15"
                                        absolute
                                        style={{ marginTop: 20 }}
                                    />
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    card: {
        backgroundColor: '#FFF',
        margin: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    titleCard: {
        textTransform: 'uppercase'
    },
    input: {
        width: '80%',
        backgroundColor: '#FFF',
        height: 40,
        paddingLeft: 20,
        borderRadius: 20
    },
    inputButton: {
        marginLeft: 10,
        backgroundColor: '#FFF',
        padding: 10,
        height: 40,
        borderRadius: 20
    },
    boxInput: {
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapStyle: {
        marginTop: 20,
        width: '100%',
        height: 500,
    },
    cardCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxSearchAddress: {
        marginLeft: 16,
        marginRight: 16,
        borderBottomWidth: 1,
        borderColor: '#00000040',
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAddress: {
        fontSize: 14,
        color: '#000000A6',
        fontWeight: '500'
    },
});
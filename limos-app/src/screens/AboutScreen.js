import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Card from '../components/Card'

const Drawer = createDrawerNavigator();

import logo from '../assets/logo.jpg';
import google from '../assets/google-play.jpg';
import ifsp from '../assets/logo-ifsp.jpg';

import icons from '../icons'

export default class MainScreen extends Component {

    openDrawer() {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.openDrawer()}>
                        <Ionicons name="md-menu" size={32} color="black" />
                    </TouchableOpacity>
                    <Text style={{ color: '#384873', fontSize: 16 }}>Hórus - Hackorona 2020</Text>
                    <Image source={logo} style={{ width: 30, height: 30 }} />
                </View>
                <ScrollView>
                    <View style={{ marginBottom: 40 }}>
                        <View style={styles.card}>
                            <View style={styles.cardCenter}>
                                <Text style={{ textTransform: 'uppercase', fontSize: 16, marginBottom: 20 }}>
                                    Sobre o Hórus!
                                </Text>

                                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={{ textAlign: 'justify' }}>
                                        O Hórus é uma proposta de solução para o
                                    </Text>
                                    <TouchableOpacity onPress={() => Linking.openURL("https://github.com/maikvinicius/horus-hackathon")}>
                                        <Text style={{ textAlign: 'center', color: '#3f6ad8' }}>
                                            4º Desafio de Inovação do IFSP.
                                    </Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ marginTop: 20, textAlign: 'justify' }}>
                                    O protótipo de Sistema foi desenvolvido pela equipe Limos do IFSP de Campos do Jordão:
                                </Text>

                                <View style={{ marginTop: 20, borderWidth: 1, padding: 20 }}>
                                    <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
                                        Lucas Ventura Moura Alves
                                    </Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/ventura-lucas-moura-alves/")}>
                                            <Image source={{ uri: icons.linkedin }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/lucasvma/")}>
                                            <Image source={{ uri: icons.github }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("mailto:venturaml21@gmail.com")}>
                                            <Image source={{ uri: icons.gmail }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/luketrj45/")}>
                                            <Image source={{ uri: icons.instagram }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ borderWidth: 1, padding: 20 }}>
                                    <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
                                        Maik Vinicius Guimaraes
                                    </Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/maikvinicius/")}>
                                            <Image source={{ uri: icons.linkedin }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/maikvinicius/")}>
                                            <Image source={{ uri: icons.github }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("mailto:maikmv.mv@gmail.com")}>
                                            <Image source={{ uri: icons.gmail }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/maikviniciusdev/")}>
                                            <Image source={{ uri: icons.instagram }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ borderWidth: 1, padding: 20 }}>
                                    <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
                                        Leonam Mendonça Pereira
                                    </Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/leonammendonca")}>
                                            <Image source={{ uri: icons.linkedin }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/leonammp/")}>
                                            <Image source={{ uri: icons.github }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("mailto:leonammp.15@gmail.com")}>
                                            <Image source={{ uri: icons.gmail }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/leoo_mend/")}>
                                            <Image source={{ uri: icons.instagram }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Image source={logo} style={{ marginTop: 20, width: '100%', height: 100, resizeMode: 'contain' }} />

                                <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 18 }}>
                                    Hórus: encontrando seus clientes
                                </Text>

                                <TouchableOpacity onPress={() => Linking.openURL("https://github.com/maikvinicius/horus-hackathon")}>
                                    <Text style={{ marginTop: 20, textAlign: 'center', color: '#3f6ad8' }}>
                                        DOCUMENTAÇÃO DA COMPETIÇÃO
                                    </Text>
                                </TouchableOpacity>

                                <View style={{ alignItems: 'center' }}>
                                    <Image source={ifsp} style={{ marginTop: 20, width: 220, height: 70, resizeMode: 'contain' }} />
                                </View>

                            </View>
                        </View>
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
        backgroundColor: '#f2f2f2',
        height: 40,
        paddingLeft: 20,
        borderRadius: 20
    },
    inputButton: {
        marginLeft: 10,
        backgroundColor: '#e4e4e4',
        padding: 10,
        height: 40,
        borderRadius: 20
    },
    boxInput: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapStyle: {
        marginTop: 20,
        width: '100%',
        height: 300,
    },
});
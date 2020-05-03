import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

export default function Card({ title }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardCenter}>
                <Ionicons name="md-paper" size={32} color="black" />
                <View style={styles.hr} />
                <Text style={styles.titleCard}> {title} </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    hr: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        height: 1,
        backgroundColor: '#ccc'
    },
    cardCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
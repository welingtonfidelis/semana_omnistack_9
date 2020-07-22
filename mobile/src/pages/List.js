import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, AsyncStorage, Text, Image, StyleSheet, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() =>{
        AsyncStorage.getItem('user').then(user_id =>{
            const socket = socketio('http://192.168.4.101:3001',{
                query: { user_id }
            })

            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foio ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}></Image>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)}
            </ScrollView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30
    }
})
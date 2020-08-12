import React, { useState, useEffect } from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native'
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveIcon from '../../assets/images/icons/give-classes.png';
import purpleHeartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
function Landing(){
    const {navigate} = useNavigation();
    function handleNavigationGiveClasses(){
        navigate('Give Classes');
    }
    function handleNavigationStudy(){
        navigate('Study');
    }
    const [totalConnections, setTotalConnections] = useState(0);
    useEffect(()=>{
        api.get('/connections').then(result=>{
            const total = result.data;
            setTotalConnections(total);
        });
    },[])
    return(
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner}/>
            <Text style={styles.title}>
                Seja bem vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer</Text>
            </Text>
            <View style={styles.buttonsContainer}>
                <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigationStudy}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>
                <RectButton style={[styles.button, styles.buttonSecundary]} onPress={handleNavigationGiveClasses}>
                    <Image source={giveIcon}/>
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>
            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas{' '}<Image source={purpleHeartIcon}/> 
            </Text>
        </View>
    );
}

export default Landing;
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import styles from './style';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';

function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [subject,setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');
    const [favorites, setFavorites] = useState<number[]>([]);
    function handleToogleFilter(){
        setIsFilterVisible(!isFilterVisible);
    }
    async function search(){
        const response = await api.get('classes',{
            params:{
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
    }
    useEffect(()=>{
        AsyncStorage.getItem('favorites').then(response=>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) =>{
                    return teacher.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    },[])
    return( 
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={handleToogleFilter}>
                    <Feather name="filter"  size={20} color="#FFF"/>
                </BorderlessButton>
            )}>
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput style={styles.input} value={subject} onChangeText={text=>setSubject(text)} placeholder="Qual a matéria ?" placeholderTextColor="#c1bccc"/>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput style={styles.input} placeholder="Qual o Dia da semana ?" value={week_day} onChangeText={text=>setWeekday(text)} placeholderTextColor="#c1bccc"/>
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput style={styles.input} placeholder="Qual o horario ?" placeholderTextColor="#c1bccc" value={time} onChangeText={text=>setTime(text)}/>
                            </View>
                        </View>
                        <RectButton style={styles.submitButton} onPress={search}>
                            <Text style={styles.submitButtonText}>Procurar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal:16,
                    paddingBottom:16
                }}
            >
                {teachers.map((teacher: Teacher) =>{
                    <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>
                })}
            </ScrollView>
            
        </View>
    )
}

export default TeacherList;
import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';
import styles from './style';
import { RectButton } from 'react-native-gesture-handler';
import heart from '../../assets/images/icons/heart-outline.png';
import unfavorite from '../../assets/images/icons/unfavorite.png';
import whatsapp from '../../assets/images/icons/whatsapp.png';
export interface Teacher{
    id:number,
    avatar:string,
    bio:string,
    cost:number,
    name:string,
    subject:string,
    whatsapp:string
}
interface TeacherProps{
    teacher:Teacher,
    favorited:boolean
}
const TeacherItem: React.FC<TeacherProps> = ({teacher,favorited})=>{
    const [isFavorited, setIsFavorited] = useState(favorited);
    async function handleToggleFavorited(){
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
        if(favorites){
            favoritesArray = JSON.parse(favorites);
        }
        if(isFavorited){
            favoritesArray= favoritesArray.filter((teacherItem:Teacher) =>{
                return teacherItem.id !== teacher.id;
            });
            setIsFavorited(false);
        }else{
            
            favoritesArray.push(teacher);
            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }
    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{uri:teacher.avatar}} style={styles.avatar}/>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                {teacher.bio}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {' '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, isFavorited ? styles.favorited :{}]}>
                        {isFavorited ? <Image source={heart}/> : <Image source={unfavorite}/>}
                        
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={()=>Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)}>
                        <Image source={whatsapp}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
};
export default TeacherItem;
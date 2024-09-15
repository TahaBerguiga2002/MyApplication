import {  Image , View , StyleSheet } from "react-native";
import Icon from "../../assets/image.jpg"

export default function SplachScreen(){
    return(

        <View style = {styles.container}>
            <View style ={styles.imageContainer}>
                <Image source={Icon}/>    
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: 'white',
    },
    imageContainer : {
        position: 'absolute',
    }

    
})
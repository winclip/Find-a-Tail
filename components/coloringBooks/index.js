import React from 'react';
import { 
    Text,
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
  } from 'react-native';
  import { RFPercentage } from "react-native-responsive-fontsize";
  import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

  export default class ColoringBooks extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <>
        <ImageBackground
        style={styles.homeBG}
        source= {require('../home/img/bg.jpg')}
        >
          <View style={styles.blockHome} key="home">
            <TouchableHighlight underlayColor='transparent' onPress={ () => {
                this.currentSound && this.currentSound.stop();
                this.props.navigation.navigate("Home");
                }
              }>
              <Image style={styles.btnHome} source={require('../animals/img/home.png')} resizeMode='contain' />
            </TouchableHighlight>
          </View>
          <View style={styles.container}>
              <View style={styles.mainBlock}>
                <View style ={styles.imgHalfScreenView}>
                    <Image source={require('./img/coloring.png')} style={styles.coloringImg} resizeMode='contain' />
                </View>
                <View style ={styles.buttonsHalfScreenView}>
                    <Text style={{fontSize: RFPercentage(2.4), margin: deviceWidth * 0.01}}>
                      {'   '}In gratitude for downloading our app, we added a special bonus-coloring illustrations from the game! You can send yourself an email link to download the archive with coloring pages. The email will be sent from your email client.
                      Our app does not collect data about email, usernames, or passwords.
                    </Text>
                    <AwesomeButtonRick type="secondary" style={{margin: deviceWidth * 0.01}}  onPress={() => this.onShare()}>
                    <Text style={{fontSize: RFPercentage(3)}}>Share with email</Text>
                    </AwesomeButtonRick>
                </View> 
              </View>
          </View>
      </ImageBackground>
      </>
    );
  }
}
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  homeBG:{
    width: '100%', 
    height: '100%',
  },
  blockHome:{
    position:'absolute',
    width:'10%',
    bottom: '2%', 
    right: '2%', 
    zIndex: 1  ,
    },
  container:{
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center'
   },
   mainBlock:{
    width: '90%',
    height: '90%',
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    borderRadius: deviceWidth * 0.05,
    padding: deviceWidth * 0.03
  },
  imgHalfScreenView:{
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  buttonsHalfScreenView:{
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coloringImg:{
    width: '100%',
    height: '100%'
  },
  btnHome:{
    width:'100%',
  }
});
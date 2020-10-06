import React from 'react';
import { StyleSheet,
  Animated, 
  Text, 
  View,
  ImageBackground, 
  Dimensions, 
  TouchableHighlight, 
  Image } from 'react-native';
import animalsList from '../animals/animalsList.js';
import FadeInView from '../animatedView';
import Sound from 'react-native-sound';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Modal from "react-native-modal";
import { RFPercentage } from "react-native-responsive-fontsize";
import soundsList from '../animals/phrases' ;
import { Shuffle, ArrayRandElement } from "../addtitionalFunctions";

export default class GameAFindTail extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.currentSound = undefined;
    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;
    this.shuffledAnimalsArr = [];
    this.rightAnswer = '';
    this.finalScore = 0;
    this.finalCountOfErrors = 0;
    this.state = {
      rightChoise: '',
      isRendered: false,
      animalsImagesArr: [],
      isModalVisible: false,
      mistakenAnswers: [],
      isAnswerCheckngGoing: false,
}
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

checkAnswer = ( item ) => {
  this.setState({isAnswerCheckngGoing : true});
    if(this.currentSound){
      this.currentSound.stop()
    }
   if( item === this.rightAnswer){
     this.finalScore++;
     let randNum = Math.floor(Math.random() * soundsList.phrases.praise.length);        
     this.currentSound = new Sound(soundsList.phrases.praise[randNum].src, () => this.currentSound.play( () =>{
      this.currentSound = new Sound(this.state.rightChoise.soundAnimalTitle, Sound.MAIN_BUNDLE , () => this.currentSound.play( () =>{
        setTimeout(() => {
          if(this.finalScore >= 7 ){
            this.currentSound= new Sound(soundsList.phrases.playAgain.src,() => this.currentSound.play())     
            this.toggleModal();
          }else this.loadImages();
        }, 500);
      }))
     }))

  }else {
    if(this.currentSound){
      this.currentSound.stop()
    }
    this.finalCountOfErrors++;
    this.setState({mistakenAnswers : this.state.mistakenAnswers.concat(item) });
    this.setState({isAnswerCheckngGoing : false});
    let randNum = Math.floor(Math.random() * soundsList.phrases.mistakes.length);        
    this.currentSound= new Sound(soundsList.phrases.mistakes[randNum].src,() => this.currentSound.play( () =>{

      let randNum = Math.floor(Math.random() * soundsList.phrases.whichAnimalSays.length);    
      this.currentSound= new Sound(
        soundsList.phrases.whichAnimalSays[randNum].src,
        (error) => {
          this.currentSound.play( ()=>{
            this.currentSound = new Sound( this.state.rightChoise.soundHowAnimalTell , Sound.MAIN_BUNDLE, () => {
              this.currentSound.play();
          })
        })},
      );
    } ))  
  }
}
 
findAndAddWrongTails = arr => {
  let rand = Math.floor(Math.random() * arr.length);
  if(!this.state.animalsImagesArr.includes(arr[rand].imgAnimalWithTail)){
    if(this.state.animalsImagesArr.length != 3){
      this.setState({ animalsImagesArr: [...this.state.animalsImagesArr, arr[rand].imgAnimalWithTail]})
      this.findAndAddWrongTails(this.shuffledAnimalsArr);
    }else {
      let arr = Shuffle(this.state.animalsImagesArr)
      this.setState({animalsImagesArr: arr});    
    }
  }else this.findAndAddWrongTails(this.shuffledAnimalsArr);
}

loadImages = () =>{
  this.setState({isAnswerCheckngGoing : false});
  this.setState({ mistakenAnswers: []})
  this.currentSound && this.currentSound.stop();
  let randNum = Math.floor(Math.random() * soundsList.phrases.whichAnimalSays.length);    
  this.currentSound= new Sound(
    soundsList.phrases.whichAnimalSays[randNum].src,
    (error) => {
      this.currentSound.play( ()=>{
        this.currentSound = new Sound( this.state.rightChoise.soundHowAnimalTell , Sound.MAIN_BUNDLE, () => {
          this.currentSound.play();
      })
    })},
  );
 
  this.setState({animalsImagesArr: []});
  Shuffle(this.shuffledAnimalsArr);
  let rightChoiseAnimal = ArrayRandElement(this.shuffledAnimalsArr);
  this.setState({rightChoise: rightChoiseAnimal})
  setTimeout(() => {
    this.rightAnswer = rightChoiseAnimal.imgAnimalWithTail;
    this.setState({ animalsImagesArr: [...this.state.animalsImagesArr, this.state.rightChoise.imgAnimalWithTail]})
    this.findAndAddWrongTails(this.shuffledAnimalsArr);  
    this.shuffledAnimalsArr = this.shuffledAnimalsArr.filter( item => this.state.rightChoise.title != item.title);
}
  , 0);
  this.setState({isRendered : true});

}

componentDidMount = () => {
  this.shuffledAnimalsArr = animalsList;
  this.loadImages();
  this.setState({isRendered: true});
}


render() {
  
    return (
    <ImageBackground
      style={styles.homeBG}
      source= {require('../home/img/bg.jpg')}
    >
    <View style={styles.blockHome} key="home">
      <TouchableHighlight underlayColor='transparent' onPress={ () => {
        this.currentSound.stop();
        this.props.navigation.navigate("Home");
      }
    }>
        <Image style={styles.btnHome} source={require('../animals/img/home.png')} resizeMode='contain' />
      </TouchableHighlight>
    </View>

      {this.state.isRendered && 
      (
        <View style={styles.container}>
      
        {this.state.animalsImagesArr.map( (item , i )=>
          <FadeInView  style={{width: '31%', height: '100%',  justifyContent: 'center' }} key={i}>
          <TouchableHighlight underlayColor='transparent' style={{width: '100%', height: '60%', alignItems:'center'}} onPress={() => !this.state.isAnswerCheckngGoing && this.checkAnswer(item)  }>
          <Image source={item} 
          style={{width: '90%', height: '100%',}}
          resizeMode='contain' />

          </TouchableHighlight>
          {this.state.mistakenAnswers.includes(item) &&
            <Image source={require('../animals/img/decline.png')} style={styles.mistakenImg} resizeMode='contain' />}
          </FadeInView>
          )}
        </View>
              )
      }

 
 
        <Modal isVisible={this.state.isModalVisible} style={{justifyContent: 'center', alignItems: 'center'}}>
          <View  style={styles.modalWindow}>
            <View style={{width: '100%', height: '70%',borderBottomColor: '#FFFFFF',  borderBottomWidth: this.deviceHeight* 0.02, backgroundColor: '#00BFFF',      borderRadius: this.deviceWidth * 0.02}}>
              {
                this.finalCountOfErrors < 3 ?
                (
                  <View style={styles.starView}>
                    <Animated.Image source={require('../animals/img/star_left.png')} style={styles.starImg}  resizeMode='contain' />
                    <Animated.Image source={require('../animals/img/star_double.png')} style={styles.starImg}  resizeMode='contain' />
                    <Animated.Image source={require('../animals/img/star_right.png')} style={styles.starImg}  resizeMode='contain' />
                  </View>
                ) : this.finalCountOfErrors < 5 ?
                (
                  <View style={styles.starView}>
                    <Animated.Image source={require('../animals/img/star_left.png')} style={styles.starImg}  resizeMode='contain' />
                    <Animated.Image source={require('../animals/img/star_cry.png')} style={styles.starImg}  resizeMode='contain' />
                    <Animated.Image source={require('../animals/img/star_right.png')} style={styles.starImg}  resizeMode='contain' />
                  </View>                
                ):
                (
                  <View style={styles.starView}>
                    <Animated.Image source={require('../animals/img/star_cry.png')} style={styles.starImg} resizeMode='contain' />
                    <Animated.Image source={require('../animals/img/star_double.png')} style={styles.starImg}  resizeMode='contain' />
                    <Animated.Image source={require('../animals/img/star_cry.png')} style={styles.starImg}  resizeMode='contain' />
                  </View>               
                )

              }
              <View style={{width: '100%', height: '20%', alignItems: 'center',     borderRadius: this.deviceWidth * 0.02}}>
                <Text style={{fontSize: RFPercentage(4)}}>You're the best!</Text>
              </View>
            </View>
            <View style={{width: '100%', height: '30%', backgroundColor: '#EE82EE' ,flexDirection: 'row', justifyContent: 'space-around',alignItems: 'center',      borderRadius: this.deviceWidth * 0.02}}>
            <AwesomeButtonRick type="primary" onPress={ () => {
                this.toggleModal();
                setTimeout(() => {
                  this.shuffledAnimalsArr = animalsList;
                  this.finalCountOfErrors = 0;
                  this.finalScore = 0 ;
                  this.loadImages()
                }, 100);
              }}><Text style={{fontSize: RFPercentage(3)}} > Again</Text></AwesomeButtonRick>
              <AwesomeButtonRick type="primary" onPress={ () => {
                  this.toggleModal();
                  setTimeout(() => {
                    this.props.navigation.navigate("Home")
                  }, 500);
                }}>
                  <Text style={{fontSize: RFPercentage(3)}}>Menu</Text>
              </AwesomeButtonRick>
              </View>
              </View>
        </Modal>
</ImageBackground>
    );
}
}
let deviceWidthStyle = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around'
   },
   homeBG:{
    width: '100%', 
    height: '100%',
    resizeMode: 'contain',
  },
   halfScreenView:{
     width: '50%',
     height: '100%',
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
     alignItems:'stretch',
     alignContent: 'space-around'
   },
   modalWindow:{
     width: '60%',
     height: '80%',
     backgroundColor: 'white',
     margin: 0,
     borderRadius: deviceWidthStyle * 0.02,
     padding: deviceWidthStyle * 0.01,
     borderColor: '#FFFFFF',

   },
   starView:{
     width: '100%', 
     height: '80%',
     borderBottomColor: '#FFFFFF',  
     flexDirection: 'row',
     justifyContent: 'space-around'
    },
    starImg:{
      width: '33%', 
      height: '100%'
    },
    mistakenImg:{
      position: 'absolute',
      width: '50%',
      height: '50%',
      top: '25%',
      left:'25%',
    },
    blockHome:{
      position:'absolute',
      width:'10%',
     top: '2%', 
     right: '2%', 
     zIndex:1  
  
      },
      btnHome:{
        width:'100%',
 
      }
});

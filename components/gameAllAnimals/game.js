import React from 'react';
import { StyleSheet, Image, View, Dimensions, TouchableHighlight } from 'react-native';
import animalsList from '../animals/animalsList.js';
import Carousel from 'react-native-snap-carousel';
import Sound from 'react-native-sound';
import { Shuffle } from "../addtitionalFunctions";

export default class GameAllAnimals extends React.Component {
  constructor(props) {
    super(props);
    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;
    this.currentSound = null;
    this.shuffledAnimalsArr = animalsList.concat();
    this.state = {
      activeSlide: 0,
      isRendered: false,
}
}

  _renderItem({item,index}){
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
                        <View style={{width: '100%', height: '90%'}}>
                    <Image source = {item.imgAnimalWithTail} resizeMode='contain' style={{width: '100%', height: '100%'}} />
                  </View>                
        </View>
    )
}

componentDidMount = () => {
   Shuffle(this.shuffledAnimalsArr);     
  this.currentSound = new Sound(this.shuffledAnimalsArr[0].soundAnimalTitle,Sound.MAIN_BUNDLE, (e) => {
    if(e){
      console.log(e)
    } else
    this.currentSound.play(() => {
        this.currentSound = new Sound(this.shuffledAnimalsArr[0].soundHowAnimalTell, Sound.MAIN_BUNDLE,() => {
          this.currentSound.play();
      });
      });
  }); 
 this.setState({isRendered: true});
}

onSnapPlay = index =>{
  this.setState({activeSlide: index})
  this.currentSound.stop();
  this.currentSound = new Sound(this.shuffledAnimalsArr[index].soundAnimalTitle, Sound.MAIN_BUNDLE,(e) => {
    if(e){
      console.log(e)
    } else
    this.currentSound.play(() => {
      this.currentSound = new Sound(this.shuffledAnimalsArr[index].soundHowAnimalTell, Sound.MAIN_BUNDLE,() => {
        this.currentSound.play();
    });
    });
});
}

render() {
    return (
    <View style={styles.container}>
      <View style={styles.blockHome} key="home">
        <TouchableHighlight underlayColor='transparent' onPress={ () => {
              this.currentSound.stop();
              setTimeout(() => {
                this.props.navigation.navigate("Home");
            }, 100);
            }
          }>
          <Image style={styles.btnHome} source={require('../animals/img/home.png')} resizeMode='contain' />
        </TouchableHighlight>
      </View>

      <View style={styles.nextPrevView}>
        <TouchableHighlight underlayColor='transparent' onPress={() => {
          this.carousel._snapToItem(this.state.activeSlide - 1)
          }}
          style={styles.touchArrow}
          >
            {this.state.activeSlide === 0 ?
              <Image source={require('../animals/img/arrow_empty.png')}  style={styles.arrowLeft}  />
              :
              <Image source={require('../animals/img/arrow_full.png')}  style={styles.arrowLeft}  />
          }
        </TouchableHighlight>
      </View>
      <View style={styles.carousel}>
        {this.state.isRendered &&
          <Carousel
          ref ={ ref => this.carousel = ref }
                  data={this.shuffledAnimalsArr}
                  sliderWidth={this.deviceWidth * 0.7}
                  itemWidth={this.deviceWidth * 0.7}
                  renderItem={this._renderItem}
                  onSnapToItem={(index) => this.onSnapPlay(index)}
                  removeClippedSubviews={false}
              />
            }
      </View>
      <View style={styles.nextPrevView}>
        <TouchableHighlight underlayColor='transparent' onPress={() => {
          this.carousel._snapToItem(this.state.activeSlide + 1)}}
          style={styles.touchArrow}
          >
            {this.state.activeSlide === this.shuffledAnimalsArr.length - 1 ?
              <Image source={require('../animals/img/arrow_empty.png')}  />
              :
              <Image source={require('../animals/img/arrow_full.png')}   />
            }
        </TouchableHighlight>
      </View>
    </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
   },
  carousel:{
    width: '70%',
    height: '100%',
  },
  nextPrevView:{
    width: '15%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  touchArrow:{
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowLeft:{
    transform:  [
      { rotate: '180deg'
     }],
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

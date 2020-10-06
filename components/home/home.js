import React from 'react';
import { Image, View, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Text,TextInput } from 'react-native';
import gameList from './gameList.js';
import Sound from 'react-native-sound';
import { RFPercentage } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.currentSound = undefined;
    this.state = {
      isParentsButtonVisible: false,
      gameTypes: [],
      clockIsOpened : false,
      isTvTurnedOn: false,
      parentalGateArr: [],
      playersParentAnswer: null,
    };
 
 
}
 

renewParentalGate = () =>{
  this.setState({playersParentAnswer: ''})

    let firstNum = Math.floor(Math.random() * 10);
    let secondNum = Math.floor(Math.random() * 10);
    let answer = firstNum + secondNum;
    this.setState({parentalGateArr: [firstNum, secondNum, answer]});
 
 
  
  }
toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible });
};

toggleClock = () =>{
  this.setState({ clockIsOpened: !this.state.clockIsOpened });
  this.currentSound = new Sound('./sounds/cuckoo.mp3', Sound.MAIN_BUNDLE, (e) => {
    if (e) {
      console.log('error', e);
      return;
    }else{
      this.currentSound.play( () =>   this.setState({ clockIsOpened: !this.state.clockIsOpened }) );
    }
  });

}

toggleTv = () =>{
  this.setState({ isTvTurnedOn: !this.state.isTvTurnedOn });
  setTimeout(() => {
    this.setState({ isTvTurnedOn: !this.state.isTvTurnedOn });
  }, 2111);

 
}


  render() {
    return (
      <>
            <ImageBackground
          style={styles.homeBG}
          source= {require('./img/bg.jpg')}
        >
 <View style={styles.container}>
{
  
  gameList.map(item => {
 
    return <View style={styles[item.itemStyle]} key={item.id} >
      <TouchableOpacity style={styles.gameImg} onPress={ () => {
        setTimeout(() => {
          this.props.navigation.navigate(item.title)
        }, 100);
      }}>
        <Image style={styles.gameImg} source={item.imgSrc} resizeMode='contain' />
      </TouchableOpacity>
    </View>
  })
 
}
<View style={styles.clock}  >
      <TouchableOpacity activeOpacity={1} style={styles.gameImg} onPress={ () => !this.state.clockIsOpened && this.toggleClock() }>
        {!this.state.clockIsOpened ? 
            <Image style={styles.gameImg} source={require('../animals/img/clock_closed.png')} resizeMode='contain' />
          :
            <Image style={styles.gameImg} source={require('../animals/img/clock_opened.png')} resizeMode='contain' />
        }
      </TouchableOpacity>
    </View>

    <View style={styles.tv}  >
      <TouchableOpacity style={styles.gameImg} onPress={ () => !this.state.isTvTurnedOn && this.toggleTv() }>
       {!this.state.isTvTurnedOn ? 
        <Image style={styles.gameImg} source={require('./img/tv.png')} resizeMode='contain' />
      :
        <Image style={styles.gameImg} source={require('./img/tv.gif')} resizeMode='contain' />
      }
      </TouchableOpacity>
    </View>

<View style={styles.easel}  >
      <TouchableOpacity style={styles.gameImg} onPress={ () => {
        this.toggleModal();
        this.renewParentalGate();
      }}>
        <Image style={styles.gameImg} source={require('./img/easel.png')} resizeMode='contain' />
      </TouchableOpacity>
    </View>
 </View>

 <Modal isVisible={this.state.isModalVisible} style={{height : '100%', justifyContent: 'flex-start', alignItems: 'center' }} backdropOpacity={0} onBackdropPress={ () => this.toggleModal()}>
          <View  style={styles.modalWindow}>
            <Text style={{fontSize: RFPercentage(2)}}>
              To share a link to the archive with coloring books, you need to call your parents to solve a mathematical example.
            </Text>
            <Text style={{fontSize: RFPercentage(2), fontWeight: 'bold'}}>{this.state.parentalGateArr[0]} + {this.state.parentalGateArr[1]} </Text>
                <TextInput
                    style={{ fontSize: RFPercentage(2), height: deviceWidthStyle * 0.05,margin :deviceWidthStyle * 0.01, width: deviceWidthStyle * 0.14, borderColor: 'gray', borderWidth: 1,textAlign: 'center' }}
                    onChangeText={text => this.setState({playersParentAnswer: text})}
                    value={this.state.playersParentAnswer}
                  />
              <AwesomeButtonRick onPress={ () => {this.state.parentalGateArr[2] == this.state.playersParentAnswer ? 
              setTimeout(() => {
                this.toggleModal() 
                this.props.navigation.navigate('ColoringBooks')
              }, 0)
                :                  
              this.renewParentalGate()
                
              }
              }>

                  <Text style={{fontSize: RFPercentage(3)}}>GO</Text>
              </AwesomeButtonRick>
          </View>

        </Modal>
      </ImageBackground>
      </>
    );
  }
}

let deviceWidthStyle = Dimensions.get('window').width;

const styles = StyleSheet.create({
  
  homeBG:{
    width: '100%', 
    height: '100%',
  },
  container:{
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
   },
   gameAsAnimalSaysStyle:{
    width: '27%',
    height: '37%',
    position:'absolute',
    top: '13%', 
    right: '4%', 
  },
   gameFindATailStyle:{
    width: '27%',
    height: '37%',
    position:'absolute',
   top: '35%', 
   right: '36%', 
  },
  gameAllAnimalsStyle:{
    width: '27%',
    height: '37%',
    position:'absolute',
   top: '8%', 
   left: '5%', 
  },
  gameImg:{
    width: '100%',
    height: '100%'
  },
  easel:{
    width: '19%',
    height: '52%',
    position:'absolute',
    bottom: '0.2%', 
    left: '7%', 
  },
  clock:{
    width: '13%',
    height: '30%',
    position:'absolute',
    top: '3.5%', 
    left: '44%', 
  },
  carpet:{
    width: '33%',
    height: '30%',
    position:'absolute',
    bottom: '-16%', 
    left: '37%', 
  },
  tv:{
    width: '29%',
    height: '45%',
    position:'absolute',
    bottom: '2%', 
    right: '1%', 
  },
  modalWindow:{
    display: 'flex',
    width: '40%',
    backgroundColor: 'white',
    margin: 0,
    borderRadius: deviceWidthStyle * 0.02,
    padding: deviceWidthStyle * 0.01,
    alignItems: 'center'
 
  },
});
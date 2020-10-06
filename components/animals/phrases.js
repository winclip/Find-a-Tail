const soundsList={
	phrases:{
		praise:[
			{
				src: require('./sounds/phrases/praise/excellent_work.mp3')
            },
            {
                src: require('./sounds/phrases/praise/nice_job.mp3')
            },
            {
                src: require('./sounds/phrases/praise/terrific_work.mp3')
            },
            {
                src: require('./sounds/phrases/praise/thats_right.mp3')
            }
        ],
		mistakes:[
			{	
				src: require('./sounds/phrases/mistakes/try_again.mp3')
			},
			{
				src: require('./sounds/phrases/mistakes/oops.mp3')
            },
            {
				src: require('./sounds/phrases/mistakes/not_quite.mp3')
			}
		],
		needTail:[
			{
			src: require('../animals/sounds/phrases/additional/needTail/whitch_tail_does_this_animal_need.mp3')
			},
			{
			src: require('../animals/sounds/phrases/additional/needTail/choose_the_correct_tail.mp3')
			}
		],
		whichAnimalSays:[
			{
				src: require('./sounds/phrases/additional/whichAnimalSays/whose_voice_is_that.mp3')
			},
			{
				src: require('./sounds/phrases/additional/whichAnimalSays/which_animal_says_that.mp3')
			}
		],
		playAgain:{
			src: require('./sounds/phrases/additional/playAgain/showing_play_again.mp3')
			}
        
	}
}

export default soundsList;
	
	 
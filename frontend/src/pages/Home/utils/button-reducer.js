function buttonReducer(selectedButton,action){
  let newSelectedButton = selectedButton;
  if(action.type == "VIDEOANDAUDIO"){
    newSelectedButton = "videoandaudio";
  }else if(action.type == "AUDIOONLY"){
    newSelectedButton = "audioonly";
  }else if(action.type == "THUMBNAIL"){
    newSelectedButton = "thumbnail";
  }else if(action.type == "SUBSTITLE"){
    newSelectedButton = "substitle";
  }
  return newSelectedButton;
};

export default buttonReducer;
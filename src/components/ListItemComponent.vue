<template>
  <div id = 'container'>
    <div id="item" v-bind:class="[ (index%2 === 0) ? 'even' : 'odd']">
      <!-- <div id = "sentenceWrapper"> -->
        <div @click="audioPlay" id = "playWrapper" width = "auto">
          <img  class="audioIcon" width ="32px" height = "55px" src="../../public/playButton.svg" />
        </div>
        <div>
          <p v-bind:id="[String(index)]"></p>
        </div>
      <!-- </div> -->
      <audio v-bind:id="'audio' + [String(index)]">
        <source v-bind:src="sentence.drive">
      </audio>
    </div>  
    <!-- <hr class="my-4 middleHR"> -->

    <div id="translations">
      <p>> {{sentence.translation}}</p>
    </div>
    <hr class="my-4">

  </div>
</template>

<script>
export default {
  name: "ListItemComponent",
  props: {
    sentence: Object,
    search: String,
    index: Number,
  },
  data() {
    return {
      outputText: ""
    };
  },
  mounted() {
    //highlight the searched word in text
    var re = new RegExp(this.search, "g");
    this.outputText = this.sentence.quote.replace(re, '<span style="color:#77B26A;">' + this.search + '</span>');
    document.getElementById(this.index).innerHTML = this.outputText;
  },
  methods: {
      removeItem() {
        this.$parent.removeItem(this.index);
      },
      audioPlay() {
        console.log(this.drive);
        this.$parent.audioPlay(this.index);      
      },
      // playAudio() {    used for the S3 buckets version of audio
      //   console.log('list item')
      //   this.$parent.playAudio(this.index);      
      // },
      colourString() {
        // console.log('yesss')
        // str = str.replace(/red/g, '<span style="color:red;">red</span>');
      }
  },
};
</script>

<style scoped>

p {
  font-size: 37px;
  margin: 0px;
  padding: 0px;
  padding-left:8px
}
button {
  width:100%;
  height:100%;
  background-color: rgb(102, 102, 102);
  border: none;
  color: rgb(255, 255, 255);
}
button :active {
  border: none;
}
button:focus {outline:0;}
/* p {
  padding-left: 5px;

} */
#playWrapper {
  cursor: pointer;
}
#item {
  
  width: 100%; 
  display: flex;
  margin: 0px;
  /* padding-bottom: 10px;
  padding-top:5px; */
  /* background-color: rgb(196, 196, 196); */
  /* border: 1px solid black; */
}

#sentenceWrapper { 
  display: flex;
  justify-content: left;
  flex-direction: row ;
  width: 100%;
  height:auto;
}
#sentenceWrapper p {
  margin: 0px;
  font-size: 30px;
  height:100%;
}
#container {
  text-align: left;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width:74%;
  margin-left: 13%;
}
.middleHR {
  width: 50%;
  margin-left: 25%;
}

#translations p {
  width: 100%;
  font-size: 20px;
}
/* .even {
  background-color: #d8d8d8;
}
.odd {
  background-color: #b4b4b4;
} */

#playButton {
  background-color: rgb(0, 155, 0);
}
#removeButton {
  background-color: rgb(192, 3, 3);
}
</style>
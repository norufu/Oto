<template>
  <div class="home">
    <audio id = 'aud'>
      <source src="https://docs.google.com/uc?export=download&id=1D7_BdUs7BZqn9LDCRPZ3LctfcNqo6u5o">
    </audio>
    <!-- <button v-on:click="audioPlay">test</button> -->
    <div id = "searchWrapper">
      <div >
        <b-form-input id='searchTerm' class = 'search' v-model="searchTerm" placeholder="探す"></b-form-input>
      </div>
      <div>
        <b-button  v-on:click="searchWord" id = "searchButton" variant="light">Go</b-button>
        <!-- <button v-on:click="searchWord" id = "searchButton">Go</button> -->
      </div>
    </div>

    <div id  = "resultsDiv">
      <list-component :sentences="sentenceData" :search="searchTerm" @playSound="playSound($event)" @removeItem="removeSentence($event)"></list-component>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import ListComponent from "../components/ListComponent.vue";

export default {
  name: "Home",
    data() {
      return {
        searchTerm: null,
        testAudio: null,
        // sentences: [],
        sentenceData: []
      }
  },
  components: {
    ListComponent
  },
  methods: {
    async searchWord() {
      document.getElementById("searchButton").disabled = true;

      this.sentenceData = []
      await this.$http
        .get("/searchWord", {  // Gets phrases for the search term
          params: {
            searchTerm: this.searchTerm
          }
        })
        .then(response => {
          for(var i = 0; i < response.data.length; i++) { // sentenceData[i] = {(sound)data, file, quote, show, translation}
            this.sentenceData.push(response.data[i])
          }
          console.log(this.sentenceData);
          document.getElementById("searchButton").disabled = false;
        })
    },
    removeSentence: function(i) {
      console.log(i);
      this.sentences.splice(i, 1);
    },
    playSound: async function(sentenceIndex) {
      //get sentence audio adjust volume & play
      let audio = document.getElementById("audio" + sentenceIndex);
      audio.volume = 0.3;
      audio.play();
    }
    //this play sound function works with the S3 buckets data
   // playSound: async function(sentenceIndex) { //sample rate should be 48000 https://stackoverflow.com/questions/24151121/how-to-play-wav-audio-byte-array-via-javascript-html5
    //   let data = this.sentenceData[sentenceIndex].data.data;
    //   const aCtx = new AudioContext();
    //   let source = aCtx.createBufferSource();
    //   let gainNode = aCtx.createGain();
    //   gainNode.gain.value = 0.4 // 50% volume
    //   gainNode.connect(aCtx.destination);

    //   source.connect(gainNode)
    //   let arrayBuffer = new ArrayBuffer(data.length);
    //   let bufferView = new Uint8Array(arrayBuffer);
    //   for (let i = 0; i < data.length; i++) {
    //     bufferView[i] = data[i];
    //   }

    //   let newBuf = await aCtx.decodeAudioData(arrayBuffer);
    //   source.buffer = newBuf;
    //   source.connect(gainNode);
    //   // source.connect(aCtx.destination)
    //   source.start(0);
    //   console.log('started?');
    // },
    }
};

</script>

<style>
  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #searchWrapper {
    padding:25px;
    display: flex;
    justify-content: center;
    flex-direction: row ;
    width: 100%;
    height:auto;
  }
  #searchButton {
    height:100%;
    outline: none;
  }
  .btn:focus {
    outline: none;
    box-shadow: none;
  }
  .btn{
    border: 1px solid lightgray;  
  }
  .search {
    width:100%;

    /* background: tomato; */
  } 
  #resultsDiv {
    width: 80%
  }
</style>

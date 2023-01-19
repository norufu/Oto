<template>
  <div class="home">
  
    <div v-if="!hasSearched" id="instructionDiv">
      <h1>Welcome to Oto!</h1>
      <h2>Type in a Japanese word or phrase to find an example from TV or Movies <br>
        For example try `だった` or `have`
      </h2>
    </div>

    <form @submit.prevent="searchWord">
        <h1>test</h1>
        <div id = "searchWrapper">
          <b-form-input id='searchTerm' class = 'search' v-model="searchTerm" placeholder="探す"></b-form-input>
          <b-button  type="submit" v-on:click="searchWord" id = "searchButton" variant="light">Go</b-button>
        </div>
    </form>

    <div id  = "resultsDiv">
      <p id="resultsMessage" v-if="!sentenceData.length && hasSearched">No search results to show, maybe try a shorter phrase.</p>
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
        audio: null,
        hasSearched: false,
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
          this.hasSearched = true;
        })
    },
    removeSentence: function(i) {
      console.log(i);
      this.sentences.splice(i, 1);
    },
    playSound: async function(sentenceIndex) {
      //get sentence audio adjust volume & play
      if(this.audio) {  //pause incase audio is already playing
        this.audio.pause();
      }
      this.audio = document.getElementById("audio" + sentenceIndex);
      this.audio.volume = 0.3;
      this.audio.play();
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

  #instructionDiv {
    padding-top:10px;
  }
  #searchWrapper {
    padding:25px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height:auto;
  }
  .form {
    width:100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;  
    }
  #searchButton {
    height:100%;
    /* outline: none; */
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

  #resultsMessage {
    font-size:25px;
  }

  @media (max-width: 700px) {
    h1, h2, p {
      font-size:25px;
    }
    p {
      font-size:10px;
    }
  }
</style>

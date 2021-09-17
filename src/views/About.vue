<template>
  <div class="about">
    About oto
    <button v-on:click="upload">Go</button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "About",
  components: {},
  methods: {
    async upload() {
      console.log("gogo")

      await this.$http
        .get("http://localhost:5000/uploadWordData", {
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          alert(err);
        });
    },
  }
};
</script>

<style>

</style>
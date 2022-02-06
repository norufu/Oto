<template>
  <div>
    <b-navbar class="navbar-custom shadow-sm" toggleable="lg">
      <b-navbar-brand id ="brand" to="/">
        <img class="logo" width ="70%" height = "70%" src="../../public/oto logo.svg" />
      </b-navbar-brand>

    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {}
};
</script>

<style scoped>
    #brand {
      width:50px;
      height:50px;
    }
    .logo {
    transform: scale(1.4);
    margin-left: 0px;
    }
    .navbar-custom {
    background-color: whitesmoke;
    }
    .navbar-light .navbar-nav .nav-link {
    color: rgb(0, 0, 0);
    }

</style>

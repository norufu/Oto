<template>
  <div>
    <b-navbar class="navbar-custom shadow-sm" toggleable="lg">
      <b-navbar-brand to="/" href="#">
        <img class="logo" width ="10%" height = "10%" src="../../public/oto logo.svg" />
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
    .logo {
    transform: scale(1.4);
    margin-left: 20px;
    }
    .navbar-custom {
    background-color: whitesmoke;
    }
    .navbar-light .navbar-nav .nav-link {
    color: rgb(0, 0, 0);
    }

</style>
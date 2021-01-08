<template>

  <section class="src-components-nav-bar">

<nav class="navbar navbar-expand-lg navbar-dark bg-info" >
   <router-link to="/login">
  <a class="navbar-brand" href="#">Inicio</a>
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav" >
      
      <li class="nav-item" >
          <router-link to="/formulario">
        <a class="nav-link" href="#">Formulario</a>
          </router-link>
      </li>

      <li class="nav-item">
      <router-link to="/datosForm">
        <a class="nav-link" href="#">Operaciones y Balance</a>
      </router-link>
      </li>

         <ul class="nav justify-content-end">
          <li class="nav-item">
            <button v-if="this.$store.state.isLogin" type="button" class="btn btn-outline-danger my-2 my-sm-0" @click="logout()">
              Logout
            </button>
          </li>
        </ul>
      
    </ul>
  </div>
</nav>


  </section>

</template>

<script>

  export default  {
    name: 'src-components-nav-bar',
    props: [],
    mounted () {
    },
    data () {
      return {
        isLogin:true

      }
    },
    methods: {

      validarEstadoLogin(estado){
          this.isLogin = estado;
      }, 

      logout() {
      localStorage.jwt = null;
      console.log(localStorage.jwt);
     this.$store.dispatch('chequearLogin', false);

      this.$router.push("/login");
    },

    },
    computed: {



    }
}


</script>

<style scoped lang="css">
  .src-components-nav-bar {

  }

  button {
  position: absolute;
  right: 17px;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>

<template>

  <section class="src-components-inicio">
    <h1>Bienvenidos</h1>
  </section>

</template>

<script >

  export default  {
    name: 'src-components-inicio',
    props: [],
    mounted () {
      this.goLogin();

    },
    data () {
      return {

      }
    },
    methods: {

        goLogin(){
        this.$router.push("/login");

        }


    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-inicio {

  }
</style>

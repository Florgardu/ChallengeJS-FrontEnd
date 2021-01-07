<template>
 <section class="src-components-altaproducto">
    <div class="jumbotron m-5">
      <h4>Modificar Operacion</h4>
      <hr />
      <div v-if="isRequestLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-if="modificado" class="alert alert-success">
        REGISTRO MODIFICADO
      </div>
      <div class="container" align="center">
        <div class="col-md-8">
          <form novalidate autocomplete="off" @submit.prevent="modificar()">
            <!-- ------------ -->
            <!-- CAMPO CONCEPTO -->
            <!-- ------------ -->
            <div class="form-group">
              <label for="concepto" class="font-weight-bold">Marca</label>
              <input id="concepto" v-model="v.f.concepto.$model" type="text" class="form-control" placeholder="Ingrese concepto.." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.concepto.$error && v.f.concepto.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.concepto.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>
          
            <!-- ------------- -->
            <!--  CAMPO MONTO  -->
            <!-- ------------- -->
            <div class="form-group mt-5">
              <label for="monto" class="font-weight-bold">Monto</label>
              <input id="monto" v-model="v.f.monto.$model" type="number" class="form-control" placeholder="Ingrese monto.." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.monto.$error && v.f.monto.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.monto.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>

             <!-- ------------ -->
            <!-- CAMPO FECHA -->
            <!-- ------------ -->
            <div class="form-group">
              <label for="fecha" class="font-weight-bold">Fecha</label>
              <input id="fecha" v-model="v.f.fecha.$model" type="text" class="form-control" placeholder="Ingrese fecha.." />
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.fecha.$error && v.f.fecha.$dirty" class="alert alert-danger mt-1">
                <div v-if="v.f.fecha.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>
            <!-- ------------ -->
            <!-- BOTÓN ENVÍO  -->
            <!-- ------------ -->
            <div class="form-group">
              <button type="submit" :disabled="v.$invalid" class="btn btn-success mt-4">
                Modificar
              </button>
              <br>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="mt-5 mb-2 justify-content-end">
      <button class="btn btn-info" @click="irAOperaciones()">
        Volver
      </button>
    </div>
  </section>
</template>

<script >
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

  export default  {
    name: 'src-components-modificar',
    props: ["id"],
    mounted () {
    this.getOperacion(this.id);
    },
     created() {
    const rules = {
      f: {
        _id: {
          required
        },
        concepto: {
          required
        },
        monto: {
          required
        },
        fecha: {
          required
        }
      }
    };

    const { f } = this;
    this.v = useVuelidate(rules, { f });
  },
    data () {
      return {
         f: {
        _id: "",
        concepto: "",
        monto: "",
        fecha: ""
      },
      v: null,
      modificado: false,
      url: "http://localhost:3000/operaciones/",
      isRequestLoading: false
      }
    },
    methods: {
      async getOperacion(operacionId) {
         const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.jwt}`
          }
        };
      const res= await this.axios(this.url + operacionId,config);
      this.v.f._id.$model = operacionId;
      this.v.f.concepto.$model = res.data[0].concepto;
      this.v.f.monto.$model = res.data[0].monto;
      this.v.f.fecha.$model = res.data[0].fecha;
      this.isRequestLoading = false;
    },


    irAOperaciones(){
       this.$router.push({
        name: "DatosForm"
      });
    },


    async modificar(){
      this.v.$touch();
      if (!this.v.$invalid) {
        const form = this.f;
        await this.updateOperacion(form);
        this.modificado = true;
        this.isRequestLoading = false;
        setTimeout(() => {
          this.$router.push("/DatosForm");
        }, 2000);
      }
    },

    updateOperacion(nuevosDatos){
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.jwt}`
          }
        };
        if (confirm(`Esta seguro que desea modificar el producto: "${nuevosDatos.concepto}" ?`)) {
          this.isRequestLoading = true;
          const productoId = nuevosDatos._id;
          const datosEnviar=
           {
        "concepto": nuevosDatos.concepto,
        "monto": nuevosDatos.monto,
        "fecha": nuevosDatos.fecha
    };
           this.axios.put(this.url + productoId, datosEnviar,config);
          // console.log(`Se modifico el producto con el ID = ${res.data._id}`);
          this.isRequestLoading = false;
        }
    }

    },

    computed: {},

     
}


</script>

<style scoped lang="css">
  .src-components-inicio {

  }
</style>

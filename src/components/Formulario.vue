<template>

    <section class="src-components-formulario">
        <div class="jumbotron">
            <h2> Formulario de registro de Operaciones</h2>
            <hr>

            <!-- formulario con el evento submit(apretar botón) llama a metodo enviar  -->
            <form novalidate autocomplete="off" @submit.prevent="enviar()">


                <!-- ingreso de dato concepto  -->
                <div class="form-group">
                    <label for="nombre"> Concepto </label>
                    <input type="text" id="concepto" class="form-control" v-model="$v.f.concepto.$model">
                </div>

                <!-- cartel de validación concepto -->
                <div v-if="$v.f.concepto.$error && $v.f.concepto.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.concepto.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.concepto.minLength.$invalid">Este campo debe tener al menos {{$v.f.concepto.minLength.$params.length}} caracteres</div>
                    <div v-else-if="$v.f.concepto.maxLength.$invalid">Este campo debe tener máximo {{$v.f.concepto.maxLength.$params.max}} caracteres</div>
                </div>

          <!--  Ingreso IMPORTE-->
          <!-- ------------ -->
          <div class="form-group">
                <label for="monto">Monto</label>
                <input 
                    type="number"
                    id="monto"
                    class="form-control"
                    v-model.number="$v.f.monto.$model"
                >
                <!-- CARTELES DE VALIDACIÓN de importe -->
                <div v-if="$v.f.monto.$error && $v.f.monto.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.monto.required.$invalid">Este campo es requerido</div>
                </div>
          </div>

            <!-- Ingreso de fecha-->
                <div class="form-group">
                    <label for="fecha"> Ingrese fecha con formato 'xxxx-xx-xx' </label>
                    <input type="text" id="fecha" class="form-control" v-model="$v.f.fecha.$model">
                </div>

                <!-- cartel de validación fecha -->

                <div v-if="$v.f.fecha.$error && $v.f.fecha.$dirty" class="alert alert-danger mt-1">
                  <div v-if="$v.f.fecha.required.$invalid">Este campo es requerido</div>
                 
                </div>


                <!-- Ingreso de TIPO-->
                <div class="form-group">
                    <label for="tipo"> Ingrese TIPO de Operación (INGRESO O EGRESO) </label>
                    <input type="text" id="tipo" class="form-control" v-model="$v.f.tipo.$model">
                </div>
                <!-- cartel de validación TIPO -->

                <div v-if="$v.f.tipo.$error && $v.f.tipo.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.tipo.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.tipo.ingresoValido.$invalid">Debe ingresar Ingreso o Egreso</div>

                </div>

                <!-- Botón de envio -->
                <div class="form-group">
                    <input type="submit" class="btn btn-success mt-4" value="Enviar" :disabled="$v.$invalid">
                </div>
            </form>
        </div>
        {{$v.f.fecha.$model}}

    </section>
</template>

<script>
import jwt from "jsonwebtoken";

import {
  required,
  minLength, 
  maxLength,
 
} from '@vuelidate/validators'

// FUNCION VALIDADORA PARA TIPO
  function validarTipo(value) {
    let esValido=false;
    if (value=='INGRESO' || value=='EGRESO' ) {
      esValido=true;
    }
    return esValido;
  }


export default {
  name: 'src-components-formulario',
  props: [],
  mounted() {
  },
   components: {
  },
  data() {
    return {
      f: {
        concepto: '',
        monto: '',
        fecha: '',
        tipo:''
      },
      url: 'http://localhost:3000/operaciones'
    }
  },
  // acá valido los campos de f (formulario)
  validations: {
    f: {
  concepto: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(15)
      },
       monto: {
        required,
      },
        fecha: {
        required,
      },
     tipo: {
        required,
        ingresoValido: validarTipo,

      },
    }
  },
  methods: {
    //Envio los datos del formulario al backend con AXIOS- POST
    async sendDatosForm(datos) {
       const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.jwt}`
          }
        };
      const tokenDecoded = jwt.decode(localStorage.jwt);
      const userId = tokenDecoded.id;

        const datosEnviar = {
        "concepto": datos.concepto,
        "monto": datos.monto,
        "fecha": datos.fecha,
        "tipo": datos.tipo,
        "idUser": userId
      };

      try {
        let response = await this.axios.post(this.url, datosEnviar, config )
        console.log(response.data);
        console.log(userId);
      } catch (error) {
          console.log('HTTP POST ERROR', error)

      }
    },
    // SUBMIT DEL FORMULARIO
    async enviar() {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          let form = this.f;
          try{
            await this.sendDatosForm(form);
            this.f = this.resetCasillas();
            this.$v.$reset();            
          }catch(err){
            console.err(err);
          }
        } else {
          this.f = this.resetCasillas()
          this.$v.$reset()
        }
    },
    // REINICIO DE LOS DATOS- PONE EN BLANCO LAS CASILLAS COMPLETADAS 
    resetCasillas() {
      return {
        concepto: '',
        monto: '',
        fecha:'',
        tipo:''
      }
    }
  },
  computed: { 
  }
}
</script>

<style scoped lang="css">
  .jumbotron {
    background-color: rgb(25, 184, 144);
    color: white;
  }
  hr {
    background-color: #ddd;
  }
  .btn {
    border: none;
    background-color: white;
    font-family: "Montserrat", "Avenir";
    text-transform: uppercase;
    height: 100%;
    font-weight: 700;
    letter-spacing: 1px;
    color: steelblue;
    transition: all 0.3s;
    outline: none;
  }
  .btn:hover {
    color: white;
    background-color: rgb(216, 95, 15);
  }
</style>

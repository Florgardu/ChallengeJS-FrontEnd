<template>
  <section class="src-components-home px-5 m-5">
    <div class="jumbotron">
      <div class="container mainDiv" align="center">
        <h2>Formulario de registro de Operaciones</h2>
        <div class="col-md-8">
          <form novalidate autocomplete="off" @submit.prevent="enviar()">
            <!-- ------------ -->
            <!--  CAMPO CONCEPTO -->
            <div class="form-group mt-5">
              <label for="concepto"><b>Concepto</b></label>
              <input
                id="concepto"
                v-model="v.f.concepto.$model"
                type="text"
                class="form-control"
                placeholder="Ingrese concepto..."
              />
              <!-- CARTELES DE VALIDACIÓN -->
              <div
                v-if="v.f.concepto.$error && v.f.concepto.$dirty"
                class="alert alert-danger mt-1"
              >
                <div v-if="v.f.concepto.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>

            <!-- ------------- -->
            <!--  CAMPO MONTO  -->
            <!-- ------------- -->
            <div class="form-group">
              <label for="monto" class="label-form font-weight-bold"
                >Monto</label
              >
              <input
                id="monto"
                v-model="v.f.monto.$model"
                type="number"
                class="form-control"
                placeholder="Ingrese monto..."
              />
              <!-- CARTELES DE VALIDACIÓN -->
              <div
                v-if="v.f.monto.$error && v.f.monto.$dirty"
                class="alert alert-danger mt-1"
              >
                <div v-if="v.f.monto.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>
            <!-- ------------ -->
            <!--  CAMPO FECHA  -->
            <div class="form-group mt-5">
              <label for="fecha"><b>Fecha</b></label>
              <input
                id="fecha"
                v-model="v.f.fecha.$model"
                type="date"
                class="form-control"
                placeholder="Ingrese fecha..."
              />
              <!-- CARTELES DE VALIDACIÓN -->
              <div
                v-if="v.f.fecha.$error && v.f.fecha.$dirty"
                class="alert alert-danger mt-1"
              >
                <div v-if="v.f.fecha.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>

            <!-- ------------- -->
            <!--  CAMPO TIPO  -->
            <!-- ------------- -->
            <div class="form-group">
              <label for="tipo" class="label-form font-weight-bold"
                >Monto</label
              >
              <input
                id="tipo"
                v-model="v.f.tipo.$model"
                type="text"
                class="form-control"
                placeholder="Ingrese tipo EGRESO/INGRESO..."
              />
              <!-- CARTELES DE VALIDACIÓN -->
              <div
                v-if="v.f.tipo.$error && v.f.monto.$dirty"
                class="alert alert-danger mt-1"
              >
                <div v-if="v.f.tipo.required.$invalid">
                  Este campo es requerido
                </div>
              </div>
            </div>

            <!-- BOTÓN ENVÍO  -->
            <div class="form-group my-3">
              <button
                type="submit"
                :disabled="v.$invalid"
                class="btn btn-success mt-4"
                value="Enviar"
              >
                Enviar
              </button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import jwt from "jsonwebtoken";

export default {
  name: "SrcComponentsHome",
  props: [],

  data() {
    return {
      f: {
        concepto: "",
        monto: "",
        fecha: "",
        tipo: "",
      },
      v: null,
      url: "http://localhost:3000/operaciones",
    };
  },

  computed: {},
  mounted() {},

  created() {
    const rules = {
      f: {
        concepto: {
          required,
        },
        monto: {
          required,
        },
        fecha: {
          required,
        },
        tipo: {
          required,
        },
      },
    };

    const { f } = this;
    this.v = useVuelidate(rules, { f });
  },
  methods: {
    async sendDatosFormAxios(datos) {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.jwt}`,
        },
      };
      const tokenDecoded = jwt.decode(localStorage.jwt);
      const userId = tokenDecoded.id;

      let datosAEnviar = {
        concepto: datos.concepto,
        monto: datos.monto,
        fecha: datos.fecha,
        tipo: datos.tipo,
        idUser: userId,
      };
      try {
        const res = await this.axios.post(this.url, datosAEnviar, config);
        console.log(res.data);
      } catch (error) {
        console.log("HTTP POST ERROR", error);
      }
    },

    async enviar() {
      this.v.$touch();
      if (!this.v.$invalid) {
        const form = this.f;
        console.log(form);
        await this.sendDatosFormAxios(form);
        this.resetForm();
        this.v.$reset();
      }
    },
    /* valor inicial de los campos de datos del formularioVue */
    resetForm() {
      this.v.f.concepto.$model = "";
      this.v.f.monto.$model = "";
      this.v.f.fecha.$model = "";
      this.v.f.tipo.$model = "";
    },
  },
};
</script>

<style scoped lang="css">
.src-components-home {
}

button {
  position: absolute;
  right: 17px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.jumbotron {
  text-align: center;
  border: 1px solid #213141;
  background-color: #cdcfd1;
  margin-left: 200px;
  margin-right: 200px;
}

form {
  text-align: left;
}
</style>

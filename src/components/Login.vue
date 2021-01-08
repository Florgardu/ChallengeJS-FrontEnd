<template>
  <section class="src-components-home px-5 m-5">
    <div class="jumbotron">
      <div class="container mainDiv" align="center">
        <h2>Bienvenido!</h2>
        <p>Ingresá con tu cuenta para empezar a cargar Operaciones.</p>
        <div class="col-md-8">
          <div v-if="errorLogueo" class="alert alert-warning">
            Usuario Incorrecto, intente nuevamente
          </div>
          <form novalidate autocomplete="off" @submit.prevent="enviar()">
            <!-- ------------- -->
            <!--  CAMPO EMAIL  -->
            <!-- ------------- -->
            <div class="form-group">
              <label for="email" class="label-form font-weight-bold"
                >Email</label
              >
              <input
                id="email"
                v-model="v.f.email.$model"
                type="email"
                class="form-control"
                placeholder="Ingrese su correo electrónico..."
              />
              <!-- CARTELES DE VALIDACIÓN -->
              <div
                v-if="v.f.email.$error && v.f.email.$dirty"
                class="alert alert-danger mt-1"
              >
                <div v-if="v.f.email.required.$invalid">
                  Este campo es requerido
                </div>
                <div v-if="v.f.email.email.$invalid">
                  Debe proveer un email válido
                </div>
              </div>
            </div>
            <!-- ------------ -->
            <!--  CAMPO DESCRIPCION  -->
            <div class="form-group mt-5">
              <label for="contrasena"><b>Contraseña</b></label>
              <input
                id="contrasena"
                v-model="v.f.contrasena.$model"
                type="password"
                class="form-control"
                placeholder="Ingrese password..."
              />
              <!-- CARTELES DE VALIDACIÓN -->
              <div
                v-if="v.f.contrasena.$error && v.f.contrasena.$dirty"
                class="alert alert-danger mt-1"
              >
                <div v-if="v.f.contrasena.required.$invalid">
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
                Ingresar
              </button>
              <br />
              <br />
            </div>

            <!-- BOTÓN REGISTRAR USUARIO NUEVO  -->
            <div class="form-group my-3">
              <button
                type="button"
                :disabled="v.$invalid"
                class="btn btn-primary"
                @click="goCreateForm()"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
//import jwt from "jsonwebtoken";

export default {
  name: "SrcComponentsHome",
  props: ["onEstadologin"],

  data() {
    return {
      f: {
        email: "",
        contrasena: "",
      },
      v: null,
      url: "http://localhost:3000/users/login",
      errorLogueo: "",
      isAdmin: null,
      estalogueado: false,
    };
  },

  computed: {},
  mounted() {},

  created() {
    const rules = {
      f: {
        email: {
          required,
          email,
        },
        contrasena: {
          required,
        },
      },
    };

    const { f } = this;
    this.v = useVuelidate(rules, { f });
  },
  methods: {
    async sendDatosFormAxios(datos) {
      let datosAEnviar = {
        email: datos.email,
        contrasena: datos.contrasena,
      };
      try {
        const res = await this.axios.post(this.url, datosAEnviar, {
          "content-type": "application/json",
        });
        console.log(res.data);
        localStorage.jwt = res.data.token;
        console.log("jwt::", localStorage.jwt);
        this.errorLogueo = false;
        this.$store.dispatch("chequearLogin", true);
        this.estalogueado = true;
        this.$router.push("/DatosForm");
      } catch (error) {
        console.log("HTTP POST ERROR", error);
        this.errorLogueo = true;
        this.estalogueado = false;
      }
      this.$emit("estadologin", this.estalogueado);
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
      this.v.f.contrasena.$model = "";
      this.v.f.email.$model = "";
    },

    goCreateForm() {
      this.$router.push("/newUserForm");
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

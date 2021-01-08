<template>
  <section class="src-components-usuarios-registrados">
    <h1>Operaciones cargadas en formulario</h1>

    <div v-if="this.$store.state.datosForm.length" class="table-responsive">
      <table class="table">
        <tr class="bg-success text-white">
          <th>Concepto</th>
          <th>Importe</th>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
        <tr
          class="bg-info text-white"
          v-for="(dato, index) in operationsLimited"
          :key="index"
        >
          <td>{{ dato.concepto }}</td>
          <td>{{ ponerPeso(dato.monto) }}</td>
          <td>{{ formatearFecha(dato.fecha) }}</td>
          <td>{{ dato.tipo }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning"
              @click="editarOperacion(dato.nro_id)"
            >
              Editar
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarOperacion(dato)"
            >
              Eliminar
            </button>
          </td>
        </tr>

        <tr v-bind:style="{ color: 'green' }">
          <td colspan="2">Total Ingresos</td>
          <td colspan="2">${{ calcularTotalIngresos }}</td>
        </tr>

        <tr v-bind:style="{ color: 'red' }">
          <td colspan="2">Total Egresos</td>
          <td colspan="2">${{ calcularTotalEgresos }}</td>
        </tr>

        <tr v-bind:style="{ color: colorCalculado }">
          <td colspan="2">Balance Total</td>
          <td colspan="2">${{ calcularTotal }}</td>
        </tr>
      </table>
    </div>
    <h2 v-else class="alert alert-warning">
      No se encontraron nuevos datos cargados
    </h2>
  </section>
</template>

<script>
import Filtros from "../Filtros.js";
import jwt from "jsonwebtoken";

export default {
  name: "src-components-usuarios-registrados",
  mixins: [Filtros],
  props: [],
  components: {},
  mounted() {
    this.getDatosForm();
  },
  data() {
    return {
      url: "http://localhost:3000/operaciones/",
    };
  },
  methods: {
    //pedido de los datos almacenados en el backend - GET
    getDatosForm() {
      this.$store.dispatch("getDatosForm");
    },

    eliminarOperacion(dato) {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.jwt}`,
        },
      };

      if (
        confirm(
          `Esta seguro que desea eliminar esta operacion: "${dato.concepto}" ?`
        )
      ) {
        try {
          this.axios.delete(this.url + dato.nro_id, config);
          this.getDatosForm();
        } catch (err) {
          console.log(err);
        }
      }
    },

    editarOperacion(id) {
      this.$router.push({
        name: "ModificarOperacion",
        params: {
          id,
        },
      });
    },
  },
  computed: {
    colorCalculado() {
      let total = this.calcularTotal;
      let color = "magenta";
      if (total > 100) {
        color = "green";
      } else if (total < 100) {
        color = "red";
      }
      return color;
    },

    calcularTotal() {
      let total = 0;
      let ingresos = this.calcularTotalIngresos;
      let egresos = this.calcularTotalEgresos;
      total = ingresos - egresos;
      return total;
    },

    calcularTotalIngresos() {
      let total = 0;
      let datos = this.operacionesPorUsuario;
      for (let index = 0; index < datos.length; index++) {
        const element = datos[index];
        if (element.tipo === "INGRESO") {
          if (element.monto && !isNaN(element.monto)) {
            total = total + element.monto;
          }
        }
      }
      return total;
    },

    calcularTotalEgresos() {
      let total = 0;
      let datos = this.operacionesPorUsuario;
      for (let index = 0; index < datos.length; index++) {
        const element = datos[index];
        if (element.tipo == "EGRESO") {
          if (element.monto && !isNaN(element.monto)) {
            total = total + element.monto;
          }
        }
      }
      return total;
    },

    operationsLimited() {
      let datos = this.operacionesPorUsuario;
      return datos.slice(0, 10);
    },

    operacionesPorUsuario() {
      let operaciones = this.$store.state.datosForm;
      const tokenDecoded = jwt.decode(localStorage.jwt);
      const userId = tokenDecoded.id;
      let operacionesPorUser = operaciones.filter(
        (operacion) => operacion.idUser === userId
      );
      return operacionesPorUser;
    },
  },
};
</script>

<style scoped lang="css">
.src-components-usuarios-registrados {
}
</style>

import {createStore} from 'vuex';
import axios from 'axios';

const url = 'http://localhost:3000/operaciones'

// creamos un store 
export default createStore({
    state(){
        return {
    contador: 123,
    datosForm:[],
    isLogin:false
        }
    }, 
    actions: {
        contarUp({commit}, cantidad){
            commit('incrementar', cantidad)
        },
          
        contarDown({commit}, cantidad){
            commit('incrementar', cantidad)
        },
        async getDatosForm({commit}){
        try {
            const config = {
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${localStorage.jwt}`
                }
              };
          let response= await axios(url,config)
          console.log(response.data)
          commit('guardarDatosFormMutation',response.data);
            } catch (error) {
              console.log('get error' , error)
            }
          },

          chequearLogin({commit},estado){
            commit('cambiarEstadoLogin',estado);
          },

    },

    mutations : {
        incrementar(state, cantidad){
        state.contador+=cantidad;
        },

        decrementar(state, cantidad){
            state.contador-=cantidad;
            },

        guardarDatosFormMutation(state, data){
            state.datosForm=data;
        },
        cambiarEstadoLogin(state, estado){
            state.isLogin=estado;
        }

    },

});

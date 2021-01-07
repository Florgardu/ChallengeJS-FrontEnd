import { createWebHistory, createRouter } from 'vue-router'
import Formulario from '../components/Formulario.vue'
import DatosForm from '../components/DatosForm.vue'
import Inicio from '../components/Inicio.vue'
import NavBar from '../components/NavBar.vue'
import Login from '../components/Login.vue'
import newUserForm from '../components/newUserForm.vue'
import ModificarOperacion from '../components/ModificarOperacion.vue'

const routes = [
    {path: '/datosForm', name: 'DatosForm', component: DatosForm},
    {path: '/formulario' , name: 'Formulario', component: Formulario},
    {path: '/' , name: 'Login', component:Login},
    {path: '/navBar' , name: 'NavBar', component: NavBar},
    {path: '/login' , name: 'Login', component: Login},
    {path: '/newUserForm' , name: 'newUserForm', component: newUserForm},

    { path: '/:catchAll(.*)', name: 'Nofound', component: Inicio },
    {
        path: '/modificarOperacion/:id', name: 'ModificarOperacion', component: ModificarOperacion, props: true,
      },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
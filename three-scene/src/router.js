import { createRouter, createWebHistory } from 'vue-router'


const routerHistory = createWebHistory()

import Scene from "./pages/Scene";
import Tank from "./pages/Tank";


const router = createRouter({
    history: routerHistory,  // history
    routes:[
        {
            path:"/",
            name:"scene",
            component:Scene
        }, {
            path:"/tank",
            name:"Tank",
            component:Tank
        }
    ]
});

export default router;
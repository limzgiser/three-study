<template>
    <canvas id="three-container">

    </canvas>
</template>

<script>
   import  * as THREE from 'three';
    export default {
        name: "Scene",
        mounted() {
          this.  main();
        },
        methods:{
            main:function () {
                const canvas = document.querySelector('#three-container');
                const renderer = new THREE.WebGLRenderer({canvas});
                const fov = 40;
                const aspect = 2;
                const near = 0.1;
                const far = 1000;
                const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
                camera.position.set(0, 150, 0);
                camera.up.set(0, 0, 1);
                camera.lookAt(0,0,0) ;
                const scene = new THREE.Scene();
                {
                    const color = 0xFFFFFF;
                    const intensity = 3 ;
                    const light = new THREE.PointLight(color,intensity);
                    scene.add(light);
                }
                const objects = [];

                const radius = 1;
                const widthSegments = 6;
                const heightSegments = 6;
                const sphereGeometry = new THREE.SphereBufferGeometry(
                    radius, widthSegments, heightSegments);

                // 太阳系
                const solarSystem = new THREE.Object3D();
                scene.add(solarSystem);
                objects.push(solarSystem);

                // 添加太阳
                const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
                const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
                sunMesh.scale.set(5, 5, 5);
                solarSystem.add(sunMesh);
                objects.push(sunMesh);

                // 地月系/地球轨道
                const earthOrbit = new THREE.Object3D();
                earthOrbit.position.x = 10;
                solarSystem.add(earthOrbit);
                objects.push(earthOrbit);

                // 添加地球
                const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
                const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
                earthOrbit.add(earthMesh);
                objects.push(earthMesh);

                // 月亮轨道
                const moonOrbit = new THREE.Object3D();
                moonOrbit.position.x = 2;
                earthOrbit.add(moonOrbit);

                // 添加月亮
                const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
                const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
                moonMesh.scale.set(.5, .5, .5);
                moonOrbit.add(moonMesh);
                objects.push(moonMesh);

                function resizeRendererToDisplaySize(renderer){
                    const canvas = renderer.domElement;
                    const width = canvas.clientWidth;
                    const height = canvas.clientHeight;
                    const needResize = canvas.width !==width || canvas.height!==height;
                    if(needResize){
                        renderer.setSize(width,height,false);
                    }
                    return needResize;
                }
                // 绘制辅助轴线
                objects.forEach((node) => {
                    const axes = new THREE.AxesHelper();
                    axes.material.depthTest = false;
                    axes.renderOrder = 1;
                    node.add(axes);
                });
                function render(time) {
                    time *= 0.001;
                    if (resizeRendererToDisplaySize(renderer)) {
                        const canvas = renderer.domElement;
                        camera.aspect = canvas.clientWidth / canvas.clientHeight;
                        camera.updateProjectionMatrix();
                    }
                    objects.forEach((obj) => {
                        obj.rotation.y = time;
                    });
                    renderer.render(scene, camera);
                    requestAnimationFrame(render);
                }
                requestAnimationFrame(render);
            }

        }
    }
</script>

<style scoped>
#three-container{
    width: 100%;
    height: 100vh;
    display: block;
    margin: 0px;
    padding: 0px;
    border: 5px solid red ;
   box-sizing: border-box;
}
</style>
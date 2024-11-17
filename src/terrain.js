import * as THREE from 'three/tsl';


export class Terrain extends THREE.Mesh {
   constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.creteGeometry();
        this.material = new THREE.MeshStandardMaterial({color: 0x50a000})
        this.geometry = new THREE.PlaneGeometry(width,height);
        this.rotation.x = -Math. PI / 2;
    }

    creteGeometry() {
        this.geometry?.dispose();
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
    }
};
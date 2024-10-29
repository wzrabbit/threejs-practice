import "./style.css";
import * as THREE from "three";

class App {
  #renderer: THREE.WebGLRenderer;
  #appElement: Element | null;
  #scene: THREE.Scene = new THREE.Scene();
  #camera?: THREE.PerspectiveCamera;
  #cube?: THREE.Mesh;

  constructor() {
    this.#renderer = new THREE.WebGLRenderer({ antialias: true });
    this.#renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.#appElement = document.querySelector("#app");

    console.log(this.#appElement);

    if (this.#appElement) {
      this.#appElement.appendChild(this.#renderer.domElement);
    }

    this.#setupCamera();
    this.#setupLight();
    this.#setupModels();
    this.#setupEvents();
  }

  #setupCamera() {
    if (!this.#appElement) {
      return;
    }

    const width = this.#appElement?.clientWidth;
    const height = this.#appElement?.clientHeight;

    this.#camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.#camera.position.z = 2;

    this.#scene.add(this.#camera);
  }

  #setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    this.#scene.add(light);
  }

  #setupModels() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x3030ff });
    this.#cube = new THREE.Mesh(geometry, material);
    this.#scene.add(this.#cube);
  }

  #setupEvents() {
    window.onresize = this.#resize.bind(this);
    this.#renderer.setAnimationLoop(this.#render.bind(this));
    this.#resize();
  }

  #resize() {
    if (!this.#appElement) {
      return;
    }

    const width = this.#appElement.clientWidth;
    const height = this.#appElement.clientHeight;
    const camera = this.#camera;

    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.#renderer.setSize(width, height);
  }

  #update(time: number) {
    time *= 0.001;

    const cube = this.#cube;

    if (cube) {
      cube.rotation.x = time;
      cube.rotation.y = time;
    }
  }

  #render(time: number) {
    if (this.#camera) {
      this.#update(time);
      this.#renderer.render(this.#scene, this.#camera);
    }
  }
}

new App();

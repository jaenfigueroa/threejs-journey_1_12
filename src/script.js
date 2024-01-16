import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// import typefont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/* axes helper */
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const texture_matcap_1 = textureLoader.load('/textures/matcaps/1.png')
const texture_matcap_2 = textureLoader.load('/textures/matcaps/2.png')
const texture_matcap_3 = textureLoader.load('/textures/matcaps/3.png')
const texture_matcap_4 = textureLoader.load('/textures/matcaps/4.png')
const texture_matcap_5 = textureLoader.load('/textures/matcaps/5.png')
const texture_matcap_6 = textureLoader.load('/textures/matcaps/6.png')
const texture_matcap_7 = textureLoader.load('/textures/matcaps/7.png')
const texture_matcap_8 = textureLoader.load('/textures/matcaps/8.png')

texture_matcap_1.colorSpace = THREE.SRGBColorSpace
texture_matcap_2.colorSpace = THREE.SRGBColorSpace
texture_matcap_3.colorSpace = THREE.SRGBColorSpace
texture_matcap_4.colorSpace = THREE.SRGBColorSpace
texture_matcap_5.colorSpace = THREE.SRGBColorSpace
texture_matcap_6.colorSpace = THREE.SRGBColorSpace
texture_matcap_7.colorSpace = THREE.SRGBColorSpace
texture_matcap_8.colorSpace = THREE.SRGBColorSpace

/* fonts */

const fontLoader = new FontLoader()

// prettier-ignore
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'Jaen Figueroa',
      {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12, /* 12 */
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5 /* 5 */
      }
    )

    /* PRIMERA FORMA DE CENTRAR UN TEXTO */
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //   - (textGeometry.boundingBox.max.x - 0.02) * 0.5, /* en lugar de 0.02 debemos poner el mismo valor del "bevelSize" de arriba */
    //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //   - (textGeometry.boundingBox.max.z - 0.03) * 0.5, /* aqui en cambio ponemos "bevelThickness" */
    // )

    // textGeometry.computeBoundingBox()
    // console.log(textGeometry.boundingBox);
    /*  */

    /* SEGUNDA FORMA DE CENTRAR UN TEXTO */
    textGeometry.center()


    /* MATERIALS */

    // const material = new THREE.MeshBasicMaterial()
    // material.wireframe = true

    // const material = new THREE.MeshNormalMaterial({map: texture})

    const material = new THREE.MeshMatcapMaterial()
    material.matcap = texture_matcap_4

    const text = new THREE.Mesh(textGeometry, material)
    scene.add(text)
    
    /* AGREGAR DONAS A AZAR */

    for (let i = 0; i < 100; i++) {

      const donaGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
      const donaMaterial = new THREE.MeshMatcapMaterial()
      donaMaterial.matcap = texture_matcap_4

      const dona = new THREE.Mesh(donaGeometry, donaMaterial)

      dona.position.x = (Math.random() - 0.5) * 10
      dona.position.y = (Math.random() - 0.5) * 10
      dona.position.z = (Math.random() - 0.5) * 10

      dona.rotation.x = Math.random() * Math.PI
      dona.rotation.y = Math.random() * Math.PI

      scene.add(dona)
    }

  }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial())

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

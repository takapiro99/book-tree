import { useEffect } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { errorToast } from '../lib/toasts'
import { ReviewJoinedUser } from '../lib/types'

class PickHelper {
    raycaster: any
    pickedObject: any
    pickedObjectSavedColor: any

    constructor() {
        this.raycaster = new THREE.Raycaster()
        this.pickedObject = null
        this.pickedObjectSavedColor = 0
    }
    pick(normalizedPosition: any, scene: any, camera: any, time: any) {
        // restore the color if there is a picked object
        if (this.pickedObject) {
            this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor)
            this.pickedObject = undefined
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera)
        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(scene.children)
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object
            // save its color
            this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex()
            // set its emissive color to flashing red/yellow
            this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xffff00 : 0xff0000)
        }
    }
}

// 初期位置
// ローテーション制限つける

const Sample = ({ books }: { books: ReviewJoinedUser[] }) => {
    console.log(books)
    const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
        if (!canvas) {
            return
        }
        const loader = new GLTFLoader()
        const width = canvas.clientWidth
        const height = canvas.clientHeight

        // init scene
        const scene = new Scene()

        const createBook = (bookScenes: any[], imageURL: string, theta: number) => {
            const r = 4.5
            console.log(theta)
            const texture = new THREE.TextureLoader().load(imageURL, () => {
                const width = texture.image.width
                const height = texture.image.height
                const ratio = height / width
                const geometry = new THREE.BoxGeometry(1.5, 1.5 * ratio, 0.1)
                const material = new THREE.MeshBasicMaterial({ map: texture })
                const cube = new THREE.Mesh(geometry, material)
                cube.position.y = 4
                cube.position.x = r * Math.sin(theta)
                cube.position.z = r * Math.cos(theta)
                cube.rotateY(theta)
                scene.add(cube)
                bookScenes.push(cube)
            })
        }

        const camera = new PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        )

        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
        renderer.setSize(width, height)
        scene.background = new THREE.Color(0xcce0ff)
        scene.fog = new THREE.Fog(0xcce0ff, 500, 10000)
        // resize
        window.addEventListener('resize', () => handleResize({ camera, renderer, canvas }))

        const light2 = new THREE.AmbientLight(0x666666, 1) // soft white light
        scene.add(light2)

        const light = new THREE.DirectionalLight(0xdfebff, 1)
        light.position.set(50, 200, 100)
        light.position.multiplyScalar(1.3)
        light.castShadow = true
        light.shadow.mapSize.width = 1024
        light.shadow.mapSize.height = 1024

        const d = 300

        light.shadow.camera.left = -d
        light.shadow.camera.right = d
        light.shadow.camera.top = d
        light.shadow.camera.bottom = -d
        light.shadow.camera.far = 1000

        scene.add(light)
        camera.position.z = 5

        loader.load(
            '/tree.gltf',
            // called when the resource is loaded
            (gltf: any) => {
                scene.add(gltf.scene)
                // gltf.animations; // Array<THREE.AnimationClip>
                // gltf.scene; // THREE.Group
                // gltf.scenes; // Array<THREE.Group>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object
            },
            undefined,
            (error: any) => {
                console.error(error)
                errorToast('3D モデルのロードに失敗しました。')
            }
        )

        // TODO 画像を読みこんで表示する
        // ...  ユーザーアイコンと合わせる
        // ...  クリックしてリンクを飛ばせるようにする。
        // ...  適切な位置に配置する
        // ...  textureLoaderを使う

        const threeCubeBooks: any[] = []
        const urls: any[] = []
        const url = `https://quiet-bayou-57256.herokuapp.com/${books[0].bookImageURL}`
        const url2 = `https://quiet-bayou-57256.herokuapp.com/${books[1].bookImageURL}`
        const url3 = `https://quiet-bayou-57256.herokuapp.com/${books[2].bookImageURL}`
        // const url = `https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg`
        const indexes = [0, 1, 2]
        urls.push(url)
        urls.push(url2)
        urls.push(url3)
        indexes.forEach((index) => {
            createBook(threeCubeBooks, urls[index], (index / indexes.length) * (2 * Math.PI))
        })

        const controls = new OrbitControls(camera, renderer.domElement)

        // pick
        const pickPosition = { x: 0, y: 0 }
        clearPickPosition()

        function getCanvasRelativePosition(event: any) {
            const rect = canvas.getBoundingClientRect()
            return {
                x: ((event.clientX - rect.left) * canvas.width) / rect.width,
                y: ((event.clientY - rect.top) * canvas.height) / rect.height
            }
        }

        function setPickPosition(event: any) {
            const pos = getCanvasRelativePosition(event)
            pickPosition.x = (pos.x / canvas.width) * 2 - 1
            pickPosition.y = (pos.y / canvas.height) * -2 + 1 // note we flip Y
        }

        function clearPickPosition() {
            // unlike the mouse which always has a position
            // if the user stops touching the screen we want
            // to stop picking. For now we just pick a value
            // unlikely to pick something
            pickPosition.x = -100000
            pickPosition.y = -100000
        }

        window.addEventListener('mousemove', setPickPosition)
        window.addEventListener('mouseout', clearPickPosition)
        window.addEventListener('mouseleave', clearPickPosition)

        const pickHelper = new PickHelper()

        controls.update()
        renderer.render(scene, camera)
        handleResize({ camera, renderer, canvas })
        function animate() {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            controls.update()
        }
        animate()
    }

    const handleResize = ({
        camera,
        renderer,
        canvas
    }: {
        camera: PerspectiveCamera
        renderer: WebGLRenderer
        canvas: HTMLCanvasElement
    }) => {
        let width = canvas.parentElement?.clientWidth || 0
        let height = canvas.parentElement?.clientHeight || 0
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
    }
    useEffect(() => {
        return () => window.removeEventListener('resize', () => handleResize)
    })
    return <canvas ref={onCanvasLoaded} id="canvas" />
}

export default Sample

import { useEffect } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { errorToast } from '../lib/toasts'
import { ReviewJoinedUser } from '../lib/types'

const meshID2url: any = {}
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
            this.pickedObject.material.opacity = 1
            this.pickedObject = undefined
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera)
        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(scene.children)
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object
            this.pickedObject.material.opacity = 0.8
        }
    }

    pickClick(normalizedPosition: any, scene: any, camera: any) {
        // restore the color if there is a picked object
        if (this.pickedObject) {
            this.pickedObject = undefined
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera)
        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(scene.children)
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object
            const bookLink = meshID2url[this.pickedObject.uuid]
            location.href = bookLink
            console.log(this.pickedObject)
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

        const createBook = (book: any, theta: number) => {
            const r = 4.5
            console.log(book)
            const imageURL = `https://quiet-bayou-57256.herokuapp.com/${book.bookImageURL}`
            const texture = new THREE.TextureLoader().load(imageURL, () => {
                const width = texture.image.width
                const height = texture.image.height
                const ratio = height / width
                const geometry = new THREE.BoxGeometry(1.5, 1.5 * ratio, 0.1)
                const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, })
                const cube = new THREE.Mesh(geometry, material)
                cube.position.y = 4
                cube.position.x = r * Math.sin(theta)
                cube.position.z = r * Math.cos(theta)
                cube.rotateY(theta)
                scene.add(cube)
                meshID2url[cube.uuid] = book.bookLink
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

        // TODO
        // ...  ユーザーアイコンと合わせる
        // ...  クリックしてリンクを飛ばせるようにする。
        // ...  適切な位置に配置する
        // ...  textureLoaderを使う

        // const url = `https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg`
        books.forEach((book, index) => {
            createBook(book, (index / books.length) * (2 * Math.PI))
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
            pickPosition.x = -100000
            pickPosition.y = -100000
        }

        const pickHelper = new PickHelper()

        window.addEventListener('mousemove', setPickPosition)
        window.addEventListener('mouseout', clearPickPosition)
        window.addEventListener('mouseleave', clearPickPosition)
        window.addEventListener('mousedown', (e) => {
            console.log("click")
            setPickPosition(e)
            pickHelper.pickClick(pickPosition, scene, camera);
        })

        controls.update()
        renderer.render(scene, camera)
        handleResize({ camera, renderer, canvas })
        function render(time: any) {
            time *= 0.001;  // convert to seconds;
            pickHelper.pick(pickPosition, scene, camera, time);
            renderer.render(scene, camera)
            controls.update()
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
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

import { useEffect } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { errorToast } from '../lib/toasts'
import { ReviewJoinedUser } from '../lib/types'

// TODO
// 木の裏側にある本がクリックできてしまう
// 404 not foundが多い
// resize周り

type PickedObjectType = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
const meshID2url = new Map<string, { type: 'book' | 'icon'; link: string }>()
class PickHelper {
    raycaster: THREE.Raycaster
    pickedObject: PickedObjectType | null | undefined

    constructor() {
        this.raycaster = new THREE.Raycaster()
        this.pickedObject = null
    }
    pick(
        normalizedPosition: { x: number; y: number },
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera
    ) {
        // restore the color if there is a picked object
        if (this.pickedObject) {
            this.pickedObject.material.opacity = 1
            this.pickedObject = undefined
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera)
        // get the list of objects the ray intersected
        const bookManager = scene.getObjectByName('bookManager')
        const intersectedObjects = bookManager
            ? this.raycaster.intersectObjects(bookManager.children, true)
            : []
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object as PickedObjectType
            this.pickedObject.material.opacity = 0.8
        }
    }

    pickClick(
        normalizedPosition: { x: number; y: number },
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        controls: OrbitControls
    ) {
        // restore the color if there is a picked object
        if (this.pickedObject) {
            this.pickedObject = undefined
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera)
        // get the list of objects the ray intersected
        const bookManager = scene.getObjectByName('bookManager')
        const intersectedObjects = bookManager
            ? this.raycaster.intersectObjects(bookManager.children, true)
            : []
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object as PickedObjectType
            const urlObject = meshID2url.get(this.pickedObject.uuid)
            if (!urlObject) return
            if (urlObject.type === 'book') {
                window.open(urlObject.link, '_blank')
                controls.saveState()
                controls.reset()
            } else if (urlObject.type === 'icon') {
                location.href = urlObject.link
            }
        }
    }
}

// 初期位置
// ローテーション制限つける

const Sample = ({ books }: { books: ReviewJoinedUser[] }) => {
    const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
        if (!canvas) {
            return
        }
        const loader = new GLTFLoader()
        const width = canvas.clientWidth
        const height = canvas.clientHeight

        // init scene
        const scene = new Scene()
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

        const bookManager = new THREE.Object3D()
        bookManager.name = 'bookManager'
        scene.add(bookManager)

        const createBook = (book: ReviewJoinedUser, theta: number) => {
            const r = 4.7
            const imageURL = `https://quiet-bayou-57256.herokuapp.com/${book.bookImageURL}`
            const profileImage = `https://quiet-bayou-57256.herokuapp.com/${book.user.profileImage}`
            const mypageLink = `/${book.uid}`
            const textureLoader = new THREE.TextureLoader()
            textureLoader.load(imageURL, (texture) => {
                const width = texture.image.width
                const height = texture.image.height
                const ratio = height / width
                const geometryBook = new THREE.BoxGeometry(1.5, 1.5 * ratio, 0.1)
                const materialBook = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true
                })
                const bookMesh = new THREE.Mesh(geometryBook, materialBook)

                textureLoader.load(profileImage, (texture) => {
                    const geometryIcon = new THREE.CircleGeometry(0.4, 64)
                    const materialIcon = new THREE.MeshBasicMaterial({
                        map: texture,
                        transparent: true
                    })
                    const iconMesh = new THREE.Mesh(geometryIcon, materialIcon)
                    iconMesh.position.x = 1
                    iconMesh.position.y = -1
                    iconMesh.position.z = 0.1
                    bookMesh.add(iconMesh)

                    bookMesh.position.y = 4.2
                    bookMesh.position.x = r * Math.sin(theta)
                    bookMesh.position.z = r * Math.cos(theta)
                    bookMesh.rotateY(theta)
                    bookMesh.name = 'book'
                    bookManager.add(bookMesh)
                    meshID2url.set(bookMesh.uuid, {
                        type: 'book',
                        link: book.bookLink
                    })
                    meshID2url.set(iconMesh.uuid, {
                        type: 'icon',
                        link: mypageLink
                    })
                })
            })
        }

        // resize
        window.addEventListener('resize', () => handleResize({ camera, renderer, canvas }))

        scene.add(new THREE.AmbientLight(0x666666, 1))

        const d = 300
        const light = new THREE.DirectionalLight(0xdfebff, 1)
        light.position.set(50, 200, 100)
        light.position.multiplyScalar(1.3)
        light.castShadow = true
        light.shadow.mapSize.width = 1024
        light.shadow.mapSize.height = 1024
        light.shadow.camera.left = -d
        light.shadow.camera.right = d
        light.shadow.camera.top = d
        light.shadow.camera.bottom = -d
        light.shadow.camera.far = 1000
        scene.add(light)

        camera.position.set(6.5, 3, 6.5)

        loader.load(
            '/tree3.gltf',
            // called when the resource is loaded
            (gltf) => {
                scene.add(gltf.scene)
            },
            undefined,
            (error) => {
                console.error(error)
                errorToast('3D モデルのロードに失敗しました。')
            }
        )

        // TODO
        // ...  ユーザーアイコンと合わせる

        // const url = `https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg`
        books.forEach((book, index) => {
            createBook(book, (index / books.length) * (2 * Math.PI))
        })

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target = new THREE.Vector3(0, 2.5, 0)
        controls.maxPolarAngle = Math.PI * 0.5
        controls.minPolarAngle = Math.PI * 0.4
        controls.minDistance = 7
        controls.maxDistance = 14

        // pick
        const pickPosition = { x: 0, y: 0 }
        clearPickPosition()

        function getCanvasRelativePosition(event: MouseEvent) {
            const rect = canvas.getBoundingClientRect()
            return {
                x: ((event.clientX - rect.left) * canvas.width) / rect.width,
                y: ((event.clientY - rect.top) * canvas.height) / rect.height
            }
        }

        function setPickPosition(event: MouseEvent) {
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
            setPickPosition(e)
            pickHelper.pickClick(pickPosition, scene, camera, controls)
        })

        handleResize({ camera, renderer, canvas })
        function render() {
            pickHelper.pick(pickPosition, scene, camera)
            renderer.render(scene, camera)
            controls.update()
            requestAnimationFrame(render)
        }
        requestAnimationFrame(render)
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

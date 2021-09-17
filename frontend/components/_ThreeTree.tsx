import { useEffect } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { errorToast } from '../lib/toasts'
import { ReviewJoinedUser } from '../lib/types'

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

        const createBook = (bookScenes: any[], imageURL: string) => {
            const texture = new THREE.TextureLoader().load(imageURL, () => {
                const width = texture.image.width
                const height = texture.image.height
                const ratio = height / width
                const geometry = new THREE.BoxGeometry(2, 2 * ratio, 0.1)
                const material = new THREE.MeshBasicMaterial({ map: texture })
                const cube = new THREE.Mesh(geometry, material)
                cube.position.y = 10
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
        const validateResponse = (response) => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response
        }

        const threeCubeBooks: any[] = []
        const urls: any[] = []
        // const url = `https://no--cors.herokuapp.com/?url=${books[0].bookImageURL}`
        const url = `https://no--cors.herokuapp.com/?url=https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg`
        // const url = `https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg`
        urls.push(url)
        console.log(urls[0])
        // fetch(url)
        //     .then(validateResponse)
        //     .then((response) => response.blob())
        //     .then((blob) => {
        //         let a = URL.createObjectURL(blob)
        //         console.log(a)
        //         // http://localhost:3004/ce25bc1c-5687-44c6-8248-f86c48a2baf9
        //         urls.push(a)
        //     })
        createBook(threeCubeBooks, urls[0])

        const controls = new OrbitControls(camera, renderer.domElement)

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

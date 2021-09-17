import { useEffect } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// 初期位置
// ローテーション制限つける

const Sample = ({ hoge }: { hoge: boolean }) => {
    console.log(hoge)
    const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
        if (!canvas) {
            return
        }
        const loader = new GLTFLoader()
        const width = canvas.clientWidth
        const height = canvas.clientHeight

        // init scene
        const scene = new Scene()

        // const renderer = new THREE.WebGLRenderer();
        // renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        const camera = new PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        )

        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
        // renderer.setClearColor('#1d1d1d')
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
            // resource URL
            // '../public/cube.glb',
            '/tree.gltf',
            // called when the resource is loaded
            function (gltf: any) {
                console.log('aaa')

                scene.add(gltf.scene)

                console.log(gltf)

                // gltf.animations; // Array<THREE.AnimationClip>
                // gltf.scene; // THREE.Group
                // gltf.scenes; // Array<THREE.Group>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object
            },
            // called while loading is progressing
            function (xhr: any) {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            // called when loading has errors
            function (error: any) {
                console.error(error)
                console.log('An error happened')
            }
        )

        // instantiate a loader
        const texture = new THREE.TextureLoader().load('images/BigBookTree.png');
        const material = new THREE.MeshBasicMaterial( { map: texture } );
        

        // load a image resource
        // TODO 画像を読みこんで表示する
        // ...  ユーザーアイコンと合わせる
        // ...  クリックしてリンクを飛ばせるようにする。
        // ...  適切な位置に配置する
        // ...  textureLoaderを使う
        // imageLoader.load(
        //     // resource URL
        //     'images/BigBookTree.png',

        //     // onLoad callback
        //     function (image) {
        //         // use the image, e.g. draw part of it on a canvas
        //         scene.add(image)
        //     },

        //     // onProgress callback currently not supported
        //     undefined,

        //     // onError callback
        //     function () {
        //         console.error('An error happened.')
        //     }
        // )

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

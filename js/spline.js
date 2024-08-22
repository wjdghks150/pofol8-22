import {
    Application
} from 'https://unpkg.com/@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/nUiSQbgIhMS4ykOx/scene.splinecode')

    .then(() => { //로드가 성공했다면 할일



    })
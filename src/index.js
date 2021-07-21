import Post from "./Post";
import './styles/styles';
import json from './assets/json';
import Mat from './assets/mat.jpeg';

console.log(json)

const post = new Post('Post title', Mat)

const el = document.createElement("img")
el.src = Mat
document.body.append(el)

console.log('Post toString:', post.toString())

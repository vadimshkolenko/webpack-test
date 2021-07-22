import Post from 'models/Post';
import './styles/styles';
import json from './assets/json';
import Mat from './assets/mat.jpeg';
import * as $ from 'jquery';

console.log(json)

const post = new Post('Post title', Mat)

$('pre').html(post.toString())

const el = document.createElement("img")
el.src = Mat
document.body.append(el)

console.log('Post toString:', post.toString())

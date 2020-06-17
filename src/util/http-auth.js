import axios from 'axios';

// axios 객체 생성
export default axios.create({
  baseURL: 'http://211.228.6.228:9999/ahh',
  headers:{
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    //'Accept': '*/*',
    'Authorization':'Basic YW5oYXBweWhvdXNlOmhhcHB5aG91c2U='
  }

});

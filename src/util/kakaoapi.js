import axios from 'axios';

// axios 객체 생성
export default axios.create({
  baseURL: 'http://http://211.228.6.228:9999/ahh/vue/api/qna',
  headers: {
    'Content-type': 'application/json',
  },
});

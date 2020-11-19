import axios from 'axios';

const instance= axios.create({
    baseURL:  "http://481bab2343d4.ngrok.io"
});
//instance.defaults.headers.common["User-Agent"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"
export default instance;
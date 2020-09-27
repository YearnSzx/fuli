import axios from 'axios'

const baseURL1 = 'http://api.jkzn365.com/vip/api/ext/wxconfig'


export function post() {
    return axios.post(baseURL1, {
        bsGuid: f986ecacb0d0ecdb426e83084e8d77662543,
        url: 'http://wx2019.piaojingtong.net/'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

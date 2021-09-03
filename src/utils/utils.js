import axios from 'axios'
import Cookies from 'universal-cookie'
import {setCurrentUser} from '../redux/user/user.actions'
import store from '../redux/store'

// todo cannon make access token class field because I should install new eslint
// https://coderoad.ru/34244888/%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D1%8C-ESLint-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B0-fat-arrow
let access_token = ''

export class SmartRequest {
    static async refresh_token(cookies) {
        if (localStorage.getItem('currentUser')) {
            await axios.post('http://localhost:8000/refresh_token/',
                {},
                {
                    withCredentials: true,
                    headers: {'X-CSRFToken': cookies.get('csrftoken')}
                })
                .then(resp => {
                    access_token = resp.data['access']
                    console.log('success refresh:', resp)
                })
                .catch(error => {
                    // todo redirect to sigin page
                    store.dispatch(setCurrentUser(null))
                    console.error('error refresh:', error)
                })
        }
    }

    static async post(url, data = {}, config = {}) {
        const cookies = new Cookies()

        if (access_token === '') {
            await this.refresh_token(cookies)
        }

        config = {
            ...config,
            withCredentials: true,
            headers: {
                ...config.headers,
                'X-CSRFToken': cookies.get('csrftoken'),
                'AUTHORIZATION': access_token ? 'Bearer ' + access_token : ''
            }
        }

        return axios.post(url, data, config)
            .catch((error) => {
                if (error.response.data['detail'] === 'Given token not valid for any token type') {
                    this.refresh_token(cookies).then(() => {
                        config = {
                            ...config,
                            headers: {
                                ...config.headers,
                                'AUTHORIZATION': access_token ? 'Bearer ' + access_token : ''
                            }
                        }
                        return axios.post(url, data, config)
                    })
                } else {
                    throw error
                }
            })

    }


}

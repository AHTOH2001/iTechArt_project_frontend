import axios from 'axios'
import Cookies from 'universal-cookie'
import {setCurrentUserAsync} from '../redux/user/user.actions'
import store from '../redux/store'

// todo cannon make access token class field because I should install new eslint
// https://coderoad.ru/34244888/%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D1%8C-ESLint-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B0-fat-arrow
let access_token = ''
const host = 'http://localhost:8000'

export class SmartRequest {
    static async refresh_token(cookies) {
        await axios.post(`${host}/refresh_token/`,
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
                console.error('error in refresh:', error.response)
                if (error.response.data['detail'] === 'Token is invalid or expired') {
                    console.log('set current user to null because refresh token is invalid')
                    store.dispatch(setCurrentUserAsync(null))
                    throw error
                }
            })
    }

    static async prepareData(url, config, shouldRefresh) {
        if (!url) {
            throw new TypeError('Url cannot be empty')
        }

        const cookies = new Cookies()

        if (access_token === '' && shouldRefresh) {
            await this.refresh_token(cookies)
        }

        url = url.replace(host, '')
        if (!url.startsWith('/')) {
            url = `/${url}`
        }
        url = `${host}${url}`

        config = {
            ...config,
            withCredentials: true,
            headers: {
                ...config.headers,
                'X-CSRFToken': cookies.get('csrftoken'),
                'AUTHORIZATION': access_token ? 'Bearer ' + access_token : ''
            }
        }

        return [url, config]
    }

    static async post(url, data = {}, config = {}, shouldTryAgain = true, shouldRefresh = true) {
        [url, config] = await this.prepareData(url, config, shouldRefresh)


        return axios.post(url, data, config)
            .catch((error) => {
                if (error.response.data['detail'] === 'Given token not valid for any token type') {
                    access_token = ''
                    if (shouldTryAgain) {
                        return this.post(url, data, config, false)
                    }
                }
                throw error
            })
    }

    static async get(url, config = {}, shouldTryAgain = true, shouldRefresh = true) {
        [url, config] = await this.prepareData(url, config, shouldRefresh)

        return axios.get(url, config)
            .catch((error) => {
                if (error.response.data['detail'] === 'Given token not valid for any token type') {
                    access_token = ''
                    if (shouldTryAgain) {
                        return this.get(url, config, false)
                    }
                }
                throw error
            })
    }

    static setAccessToken(token) {
        access_token = token
    }
}



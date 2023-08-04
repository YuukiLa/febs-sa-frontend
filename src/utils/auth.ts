const TOKEN_KEY = 'token'
const ROUTER_KEY = 'router'
const USER_INFO_KEY = 'userInfo'

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)||''
}

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const clearUser = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ROUTER_KEY)
  localStorage.removeItem(USER_INFO_KEY)
}

const clearUserInfo = () => {
  localStorage.removeItem(ROUTER_KEY)
  localStorage.removeItem(USER_INFO_KEY)
}


const setUserRouter = (data:any)=> {
  localStorage.setItem(ROUTER_KEY, JSON.stringify(data))
}

const getUserRouter = ()=> {
  return JSON.parse(localStorage.getItem(ROUTER_KEY)||'[]')
}

const setUserInfo = (data:any)=> {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(data))
}

const getUserInfo = ()=> {
  return  JSON.parse(localStorage.getItem(USER_INFO_KEY)||'{}')
}

export { isLogin, getToken, setToken, clearUser,setUserRouter,getUserRouter,setUserInfo,getUserInfo,clearUserInfo}

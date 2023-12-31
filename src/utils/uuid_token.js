import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果没有uuid则生成
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}


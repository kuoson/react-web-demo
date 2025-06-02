import { useSelector } from 'react-redux'

export const useGetUserInfo = () => {
  const { username, nickname } = useSelector((state) => state.user)

  return { username, nickname }
}

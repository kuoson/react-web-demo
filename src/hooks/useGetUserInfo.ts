import { useSelector } from 'react-redux'

export default function useGetUserInfo() {
  const { username, nickname } = useSelector((state) => state.user)

  return { username, nickname }
}

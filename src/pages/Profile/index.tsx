import { Flex } from '@chakra-ui/react'
import React from 'react'
import UserProfile from './UserProfile'
import TrufProfile from './TrufProfile'

const Profile: React.FC = () => {
  return (
    <Flex height='100%'  flexDirection='column' justifyContent='center' alignItems='center'>
        <UserProfile/>
        <TrufProfile/>
    </Flex>
  )
}

export default Profile
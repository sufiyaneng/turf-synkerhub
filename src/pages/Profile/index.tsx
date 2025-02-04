import { Flex } from '@chakra-ui/react'
import React from 'react'
import UserProfile from './UserProfile'
import TrufProfile from './TrufProfile'

const Profile: React.FC = () => {
  return (
    <Flex height='100%' bg='#F5F5F5'  flexDirection='column' justifyContent='center' alignItems='center' gap={2}>
        <UserProfile/>
        <TrufProfile/>
    </Flex>
  )
}

export default Profile
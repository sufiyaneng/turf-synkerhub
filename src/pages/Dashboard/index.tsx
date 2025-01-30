import { Flex } from '@chakra-ui/react'
import React from 'react'
import Header from './Header'
import Statistics from './Statistics'
import CreateEditDrawer from './CreateEditDrawer'

const Dashboard: React.FC= () => {
  return (
    <Flex direction='column'>
      <Header/>
      <Flex justifyContent='space-between' alignItems='center' background='#F5F6F7' p={5}>
          <Statistics/>
          <CreateEditDrawer/>
      </Flex>
    </Flex>
  )
}

export default Dashboard
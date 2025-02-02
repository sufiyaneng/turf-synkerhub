import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import Header from './Header'
import Statistics from './Statistics'
import CreateEditDrawer from './CreateEditDrawer'
import Toolbar from './Toolbar'
import { tabs } from '@/constants'

const Dashboard: React.FC= () => {
    const [type, setType] = useState<string>(tabs[0].value || 'UPCOMING');
  return (
    <Flex direction='column'>
      <Header/>
      <Flex justifyContent='space-between' alignItems='center' background='#F5F6F7' p={5}>
          <Statistics/>
          <CreateEditDrawer/>
      </Flex>
      <Toolbar type={type} setType={setType}/>
    </Flex>
  )
}

export default Dashboard
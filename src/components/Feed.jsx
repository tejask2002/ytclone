import React, { useEffect, useState } from 'react'
import { Box,Stack,Typography } from '@mui/material'
import SideBar from './SideBar'
import Videos from './Videos'
import { FetchFromApi } from '../utils/FetchFromApi'
const Feed = () => {
  const [videos,setVideo] = useState([])
  const [selectedCategory,setSelectedCategory] = useState('New')
  
  useEffect(()=>{
     FetchFromApi(`search?part=snippet&q=${selectedCategory}`).then((data)=>{ setVideo(data.items); });
     
  },[selectedCategory])
  return (
    <Stack
    sx={{flexDirection:{sx:"column",md:"row"}}}>
    
    <Box sx={{height:{sx:'auto',md:'92vh'},borderRight:"1px solid #3d3d3d", px:{sz:0,md:2}}}>
    <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
     <Typography className='copyright' variant='body2' sx={{mt:1.5,color:"#fff"}}>
       copyright 2023  
     </Typography>
    </Box>

    <Box p={2} sx={{overflowY:'auto',height:"90vh",flex:2}}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{color:'white'}}>
        {selectedCategory}  <span style={{color:"#F31503"}}>videos</span>
      </Typography>
      <Videos videos={videos}/>
    </Box>


    </Stack>
  )
}

export default Feed

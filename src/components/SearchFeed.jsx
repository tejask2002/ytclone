import React, { useEffect, useState } from 'react'
import { Box,Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import Videos from './Videos'
import { FetchFromApi } from '../utils/FetchFromApi'
const Feed = () => {
  const [videos,setVideo] = useState([])
  const {searchTerm} = useParams();
  console.log(searchTerm)
  useEffect(()=>{
     FetchFromApi(`search?part=snippet&q=${searchTerm}`).then((data)=>{ setVideo(data?.items); });
     
  },[searchTerm])

  
  return (
    <Box p={2} sx={{overflowY:'auto',height:"90vh",flex:2}}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{color:'white'}}>
        Search videos for : <span style={{color:"#F31503"}}> Search </span>
      </Typography>
      <Videos videos={videos}/>
    </Box>
  )
}

export default Feed


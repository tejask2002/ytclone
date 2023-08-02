import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import Videos from './Videos'
import ChannelCard from './ChannelCard'
import { FetchFromApi } from '../utils/FetchFromApi'
const ChannelDetails = () => {
  
  const [channelDetails,setChannelDetails] = useState(null);
  const [videos,setVideos] = useState([]);
  const {id} = useParams();
  console.log('yes')
  console.log(channelDetails);
  useEffect(()=>{
     
   

   const fetchResults = async () => {
    const data = await FetchFromApi(`channels?part=snippet&id=${id}`);

    setChannelDetails(data?.items[0]);

    const videosData = await FetchFromApi(`search?channelId=${id}&part=snippet%2Cid&order=date`);

    setVideos(videosData?.items);
  };

  fetchResults();

  },[id])
  return (
    <Box minHeight='95vh'>
      <Box>
      <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetails={channelDetails} marginTop='-110px'/>
      </Box>
      
        
        <Box sx={{ml:{sm:'100px'}}}>
          <Videos  videos={videos} />
        </Box>
      
    </Box>
  )
}

export default ChannelDetails

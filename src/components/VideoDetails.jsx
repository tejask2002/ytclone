import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box,Typography,Stack} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import Videos from './Videos'
import { FetchFromApi } from '../utils/FetchFromApi'
import ReactPlayer from 'react-player'
const VideoDetails = () => {
  const [videoDetails,setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  const {id}=useParams();
  
  useEffect(()=>{
    
    FetchFromApi(`videos?part=snippet,statistic&id=${id}`).then(
      (data)=>{
        setVideoDetails(data.items[0]);
      })

      FetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
    

  },[id])
  if(!videoDetails){ return 'Loading...'; }
  const {snippet:{title,channelId,channelTitle}, statistics:{viewCount,likeCount}} = videoDetails; 
  return (
    <Box minHeight='95vh'>
        
        <Stack  direction={{xs:'column',md:'row'}}>
          <Box flex={1}>
             
             <Box sx={{width:'100%',position:'sticky',top:'86px'}}>
               
               <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}  className='react-player'  controls />
             
             <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
             </Typography>

             <Stack direction='row' justifyContent='space-between' sx={{color:'#fff'}} py={1} px={2}>
               
               <Link to={`channel/${channelId}`}>
                 <Typography variant={{sm:'subtitle1',md:'h6'}} color='#fff'>
                  {channelTitle}
                  <CheckCircle sx={{fontSize:'12px' , color:'gray' ,ml:'5px'}}/>
                 </Typography>
               </Link>
             

             <Stack direction='row' alignItems='centre' gap='20px'>
              <Typography variant='body1' sx={{opacity:0.7}}>
               {parseInt(viewCount).toLocaleString()} views
              </Typography>
              
              <Typography variant='body1' sx={{opacity:0.7}}>
               {parseInt(likeCount).toLocaleString()} views
              </Typography>

             </Stack>
             </Stack>
             </Box>
          </Box>

          <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>

        </Stack>

    </Box>
  )
}

export default VideoDetails

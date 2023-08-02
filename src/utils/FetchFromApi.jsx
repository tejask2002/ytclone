import axios from "axios"

const BASE_URL='https://youtube-v31.p.rapidapi.com';

const options = {
  
    params: {
     
      maxResults: '50'
      
    },
    headers: {
      'X-RapidAPI-Key': 'bf6b1ac29fmshb30931b71233f0fp133db0jsn369d710f7295',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  

  export const FetchFromApi= async (url)=>{

     const {data} = await axios.get(`${BASE_URL}/${url}`,options);

     return data;

  }   
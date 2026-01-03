import axios from 'axios';
import '../styles/Home.css'

const Home = ({onAnalyze}) => {

  const name = localStorage.getItem('username')

  const handleUpload = async (e) => {
      const file = e.target.files[0];

      if(!file) return;

      const formData = new FormData();
      formData.append("file",file)

      const res = await axios.post(
        'http://localhost:8080/analyze',
        formData
      );
      console.log(res.data)
      onAnalyze?.(res.data)
  }

  return (
    <div className='home-page'>
      
      <div className='head-text'>
        <h2>Hello,{name}</h2>
      </div>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias incidunt laudantium omnis veniam, placeat odio iure ullam fugit</p>


      <div className='upload-box'>
          <input
            type='file'
            accept='.zip'
            id = 'upload-file'
            onChange={handleUpload}
            hidden
          />

          <label htmlFor='upload-file' >Upload File</label>

      </div>
      


    </div>
  )
}

export default Home

import axios from 'axios';
import '../styles/Home.css'

const Home = ({onAnalyze}) => {

  const API_URL = import.meta.env.VITE_API_URL;

  const name = localStorage.getItem('username')

  const handleUpload = async (e) => {

      const file = e.target.files[0];

      if(!file) return;

       const token = localStorage.getItem("token");
        console.log("TOKEN:", token);

      const formData = new FormData();
      formData.append("file",file)

      

     const res = await axios.post(
          `${API_URL}/analyze`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
      console.log(res.data)
      onAnalyze?.(res.data)
  }

  return (
    <div className='home-page'>
      
      <div className='head-text'>
        <h1>Hello,<span>{name}</span></h1>
        <h1>Upload your file to Know</h1>
      </div>

      <p>Upload projects and analyze files, APIs, and structure visually </p>


      <div className='upload-box' >
          <input
            type='file'
            accept='.zip'
            id = 'upload-file'
            onChange={handleUpload}
             style={{ opacity: 0, position: "absolute", left: "-9999px" }}
            
          />

           <button
              onClick={() =>
                document.getElementById("upload-file").click()
              }
            >
        Upload File
      </button>

      </div>
      


    </div>
  )
}

export default Home

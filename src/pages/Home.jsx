import Navbar from '../components/Navbar'
import Uploadform from "../components/UploadForm";
import ImageGallery from "../components/ImageGallery"

const home = () => {
  return (
    <div className='mx-auto'>
      <Navbar />
      <Uploadform />
      <ImageGallery />
    </div>
  )
}

export default home

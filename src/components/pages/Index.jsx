import { Nav } from '../Nav'
import { Hero } from '../Hero'
import { GenreSection } from '../GenreSection'
import { FeaturedAlbums } from '../FeaturedAlbums'
import { Footer } from '../Footer'
import { Newsletter } from '../Newsletter'
import { Account } from '../Account';
import '../../index.css'

const Index = () => {
  return (
    <div className='min-h-screen bg-background'>
        <Nav />
        <Account />
        <Hero />
        <FeaturedAlbums />
        <GenreSection />
        <Newsletter />
        <Footer />
    </div>
  )
}

export default Index
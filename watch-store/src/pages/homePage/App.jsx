import React  from 'react';
import Header from '../../components/elements/Header';
import Footer from './Footer';
import HeroSection from './HeroSection';

const HomePageApp= ()=> {
return(
    <div className='min-h-screen bg-background'>
        <div className="min-h-screen bg-background">
        
        
        <Header/>
         <main className="pt-16 lg:pt-20">
        <section id="hero-section" className="relative">
          <HeroSection/>  
        </section>
         </main>



        <Footer/>
        </div>
    
    </div>
)
}

export default HomePageApp

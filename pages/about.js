import React from 'react'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import ContentWrapper from '../components/ContentWrapper';

 const SomeStuff = ()=>{
    return(
        <ContentWrapper>
            <Header/>
            <p>
                Hello world
            </p>
            <Footer/>
        </ContentWrapper>
    );
}

export default SomeStuff

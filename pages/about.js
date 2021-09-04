import React from 'react'; 
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import ContentWrapper from '../components/ContentWrapper';
import Styles from '../styles/About.module.css'

const URL = process.env.STRAPIBASEURL; 

 const SomeStuff = ({body})=>{

    const content = unified()
    .use(parse)
    .use(remark2react)
    .processSync(body).result;
    
    return(
        <ContentWrapper>
            <Header/>
            <div className={Styles.bodyContent}>
                {content}
            </div>
            <Footer/>
        </ContentWrapper>
    );
}

export async function getStaticProps() {
    const fetchParams = {
      method: "POST", 
      headers: { 
        "content-type": "application/json"
      },
      body: JSON.stringify(
        {
          query: `
          {
            aboutContents{
                  body
            }
           }
       `
        }
      )
    }
  
    const res = await fetch(`${URL}/graphql`, fetchParams); 
    const {data} = await res.json(); 
      return {
          props: data.aboutContents[0], 
          revalidate: 10, 
      };
  }
  

export default SomeStuff

import React from 'react'
import styles from '../../styles/BlogPage.module.css'
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import Image from 'next/image';
import ContentWrapper from '../../components/ContentWrapper';

const URL = process.env.STRAPIBASEURL; 

function Content({ title, blogBody, splash}) {
  
const content = unified()
.use(parse)
.use(remark2react)
.processSync(blogBody).result;


  return (
    <ContentWrapper>
      <Header/>
      <main className={styles.grid}>
        <Image src={splash.url} layout="intrinsic" width={800} height={400}/>
        <h1 >{title}</h1>
        <div>{content}</div>
      </main>
      <Footer/>
    </ContentWrapper>
    )
  }
  
  export async function getStaticProps({params}) {
  const fetchParams = {
    method: "POST", 
    headers: { 
      "content-type": "application/json"
    },
    body: JSON.stringify(
      {
        query: `
        {
          blogPosts( where: {slug: "${params.slug}"} ){
            title
            blogBody
            description
            slug
            splash{
              url
            }
          }
        }
     `
      }
    )
  }

  const res = await fetch(`${URL}/graphql`, fetchParams); 
  const {data} = await res.json(); 
    return {
        props: data.blogPosts[0], 
        revalidate: 10
    };
}

export async function getStaticPaths() {
    const fetchParams = {
        method: "POST", 
        headers: { 
          "content-type": "application/json"
        },
        body: JSON.stringify(
          {
            query: `
            {
              blogPosts{
                slug
              }
            }
         `
          }
        )
      }

    const res = await fetch(`${URL}/graphql`, fetchParams);
    const posts = await res.json(); 
     

    const paths = posts.data.blogPosts.map((post) => {
      return { params: { slug: post.slug } };
    });
    
    return {
        paths:paths, 
        fallback: false
    };
}


export default Content

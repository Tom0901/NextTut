import React from 'react'
import styles from '../../styles/BlogPage.module.css'
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import Image from 'next/image';



const URL = process.env.STRAPIBASEURL; 


function Content({ title, blogBody, splash}) {
  
const content = unified()
.use(parse)
.use(remark2react)
.processSync(blogBody).result;

console.log(splash)

  return (
    <div className={styles.container}>
      <Header/>
      <Image src={"https://res.cloudinary.com/tom090/image/upload/v1625419878/large_How_To_Become_A_Web_Developer_badf631983.jpg"} width={300} height={300}/>
      <main className={styles.grid}>
        <h1>{title}</h1>
        <p>{content}</p>
      </main>
      <Footer/>
    </div>
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
        props: data.blogPosts[0]
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
        fallback: true
    };
}


export default Content

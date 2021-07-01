import React from 'react'


const URL = process.env.STRAPIBASEURL; 

function Content({slug, title, description}) {

  return (
    <div>
        <h1>{title}</h1>
        <p>{description}</p>
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

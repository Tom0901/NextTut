import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Blog from '../components/Blog'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentWrapper from '../components/ContentWrapper'

const URL = process.env.STRAPIBASEURL; 

export async function getStaticProps(context) {
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
            title
            description
            blogBody
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
    props: data,
    revalidate: 10, 
  };
}

export default function Home({blogPosts}) {

  return (
    <ContentWrapper>
      <Head>
        <title>Dev.io</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Dev.io</a>
        </h1>

        <p className={styles.description}>
          Check out our articles below 
        </p>

        <div className={styles.grid}>
          {blogPosts.map((blog, i)=>{
            const {title, description, slug, blogBody} = blog
            return <Blog title={title} description={description} slug={slug}key={i}/>
          })}
        </div>
        <Footer/>
      </main>
    </ContentWrapper>
  )
}

import Head from 'next/head'
import Stepper from '../components/Stepper'
import About from '../components/About'
import Summary from '../components/Summary'
import BasicInfo from '../components/BasicInfo'
import fetchJson from '../lib/fetchJson'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home({ profile }) {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(profile);
  const router = useRouter();

  const handleNextClick = (values) => {
    setActiveStep(activeStep + 1);
    setData({ ...data, ...values })
  }

  const handleEdit = () => {
    setActiveStep(0);
  }

  const handleSubmit = () => {
    if (data._id) {
      try {
        fetchJson(`/api/update/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            router.push("/list")
          })
          .catch((err) => {
            console.log({err})
          });
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    } else {
      try {
        fetchJson("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            router.push("/list")
          })
          .catch((err) => {
            console.log({err})
          });
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    }
  }

  const activeComponent = {
    0: <BasicInfo handleNextClick={handleNextClick} data={data} handleEdit={handleEdit} />,
    1: <About handleNextClick={handleNextClick} data={data} handleEdit={handleEdit} />,
    2: <Summary data={data} handleSubmit={handleSubmit} handleEdit={handleEdit} />
  }

  return (
    <>
      <Head>
        <title>Athlete App</title>
        <meta name="description" content="A simple Athlete profile app where an Athelete can save his/her info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stepper activeStep={activeStep} />
      {activeComponent[activeStep]}
    </>
  )
}

export async function getServerSideProps({ query }) {
  if (query.id) {
    const response = await fetch(`http://localhost:3000/api/${query.id}`);
    const profile = await response.json();
  
    return {
      props: {
        profile: profile.data
      }, // will be passed to the page component as props
    }
  } else {
    return {
      props: {
        profile: {}
      }
    }
  }
  
}

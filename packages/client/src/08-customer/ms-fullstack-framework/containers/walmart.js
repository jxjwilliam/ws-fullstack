import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './hook-form.css'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function () {
  const [data, setData] = useState()
  const { register, handleSubmit, errors, formState } = useForm()
  const onSubmit = async formData => {
    await sleep(1000)
    setData(formData)
    console.log(formState)
  }

  return (
    <div className="hook-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Async Submit Validation</h1>
        <label htmlFor="firstName">
          User Name
          <input id="firstName" name="firstName" placeholder="First Name" ref={register} />
        </label>

        <label htmlFor="lastName">
          Last Name
          <input id="lastName" name="lastName" placeholder="Last Name" ref={register} />
        </label>

        <label htmlFor="email">
          Email
          <input id="email" name="email" placeholder="email" type="text" ref={register} />
        </label>

        <div style={{ color: 'rebeccapurple' }}>{Object.keys(errors).length > 0 && 'There are errors'}</div>
        <input type="submit" />

        {data && Object.keys(data).length > 0 && (
          <div className="pre">
            <pre style={{ color: 'white' }}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  )
}

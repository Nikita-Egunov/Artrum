"use client"
import { useEffect, useState } from "react"
import validateInputs from "./utils/validateInputs"
import addSpanError from "./utils/addSpanError"

export default function useForm() {
  const [data, setData] = useState<{ [key: string]: string }>({})
  const [canSend, setCanSend] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const inputs = form.querySelectorAll('input') as NodeListOf<HTMLInputElement>

    let formIsValid = true
    const newData: { [key: string]: string } = {}
    const newErrors: string[] = []

    inputs.forEach(input => {
      const validateResult = validateInputs(input)

      if (typeof validateResult !== 'boolean') {
        formIsValid = false
        newErrors.push(...validateResult)
        addSpanError(input, validateResult)
      } else {
        newData[input.name] = input.value
        addSpanError(input, [], false)
      }
    })

    setCanSend(formIsValid)
    setData(newData)
    setErrors(newErrors)

    if (formIsValid) {
      console.log(newData);

      fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при отправке формы');
          }
          return response.text();
        })
        .then(data => {
          console.log('Форма успешно отправлена:', data);
        })
        .catch(error => {
          console.error('Ошибка:', error.message);
          setErrors([error.message]);
        }).finally(() => {
          window.location.reload()
        })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement

    const validateResult = validateInputs(input)

    if (typeof validateResult !== 'boolean') {
      addSpanError(input, validateResult)
    } else {
      addSpanError(input, [], false)
    }
  }

  return { handleSubmit, handleInputChange }
}

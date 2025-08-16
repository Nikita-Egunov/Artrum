import { emailValidation } from "@/utils/hooks/useValidate/utils/validation";

const errorMessages = {
  nik: {
    message: "Ник должен быть не короче 3 символов",
  },
  email: {
    required: "email нельзя удалить",
    invalid: "Некорректный email",
  },
  password: {
    required: "Нельзя удалить пароль",
    invalid: "Пароль должен быть не менее 8 символов",
  }
}

export default function validateInputs(input: HTMLInputElement) {
  switch (input.name) {
    case "nik": {
      const errors = [] as string[]

      if (input.value.length < 3) {
        errors.push(errorMessages.nik.message)
      }
      if (errors.length === 0) {
        return true
      } else {
        return errors
      }
    }
    case "email": {
      console.log('email');
      
      const errors = [] as string[]
      if (input.value.length === 0) {
        errors.push(errorMessages.email.required)
      }
      if (!emailValidation(input.value)) {
        errors.push(errorMessages.email.invalid)
      }
      if (errors.length === 0) {
        return true
      } else {
        return errors
      }
    }
    case "password": {
      const errors = [] as string[]

      if (input.value.length === 0) {
        return true
      }

      if (input.value.length < 8) {
        errors.push(errorMessages.password.invalid)
      }
      if (errors.length === 0) {
        return true
      } else {
        return errors
      }
    }
    default: {
      return false
    }
  }
}
const classes = {
  errorClasses: ['text-red-500'],
  okClasses: ['hidden']
}

export default function addSpanError(input: HTMLInputElement, error?: string[], isAdd = true) {
  const span = input.closest("div")?.querySelector("span") as HTMLSpanElement;

  if (!isAdd) {
    if (span) {
      span.classList.remove(...classes.errorClasses);
      span.classList.add(...classes.okClasses);
      span.textContent = ""
    }
  }

  if (span) {
    span.classList.remove(...classes.okClasses)
    span.classList.add(...classes.errorClasses);
    const text = error?.join(", ").toLowerCase()
    if (!text) { return }
    span.textContent = text.charAt(0).toUpperCase() + text.slice(1)
  }
}
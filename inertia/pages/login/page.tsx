import { useEffect } from 'react'
import { LoginForm } from './forms/LoginForm'

export default function Login() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <main className="pt-16 flex flex-col min-h-screen justify-center items-center">
      <article className="container px-4 grid md:grid-cols-1 gap-8 py-12 place-items-center">
          <section className="flex flex-col justify-center max-w-3xl w-full">
              <div className="card-content bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="mb-6 phone-hide text-gray-500">LOG IN TO YOUR ACCOUNT</h3>
                  <LoginForm />
              </div>
          </section>
      </article>
    </main>
  )
}

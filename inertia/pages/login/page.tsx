import { DarkThemeToggle } from 'flowbite-react'
import { useEffect } from 'react'
import { LoginForm } from './forms/LoginForm'

export default function Login() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <main className="pt-16 flex flex-col justify-center">
    <article className="container mx-auto px-4 grid md:grid-cols-2 gap-8 py-12">
        <section className="left-wrapper flex flex-col justify-center">
            <div className="content-wrapper mb-8">
                <h1 className="text-4xl font-bold mb-4">Smell that? That's fresh booking power.</h1>
                <p className="text-xl text-gray-600 phone-hide">
                    Easy appointments, automatic reminders, and seamless payments.
                </p>
            </div>
        </section>

        <section className="right-wrapper flex flex-col justify-center">
            <div className="card-content bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold phone-hide">SHOP OWNERS?</h3>
                <h3 className="mb-6 phone-hide text-gray-500">LOG IN TO YOUR ACCOUNT</h3>
                <LoginForm />
            </div>
            <div className="agree-terms mt-8 text-center text-sm text-gray-600">
                <p>By logging in, you agree to our <a href="#" className="text-fuchsia-600">Terms of Use</a> & <a href="#" className="text-fuchsia-600">Privacy Policy</a>.</p>
            </div>
        </section>
    </article>
</main>
  )
}

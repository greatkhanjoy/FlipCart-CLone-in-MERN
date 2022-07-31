import { LockClosedIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import InputGroup from '../components/util/InputGroup'

const Login = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to={'/'}>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link
                to={'/register'}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create new account.
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <InputGroup
                label="Email address"
                id="email-address"
                name="email"
                type="email"
                isRequired={true}
                className="rounded-t-md"
                placeholder="Email address"
              />
              <InputGroup
                label="Password"
                id="password"
                name="password"
                type="password"
                isRequired={true}
                placeholder="Password"
                className="rounded-b-md"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to={'/forgot-password'}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login

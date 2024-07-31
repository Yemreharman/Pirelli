import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { errors, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(errors);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" />;
  }

  const onSubmit = (formData) => {
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/");
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <>
      <motion.div className="absolute inset-0 m-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="">
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={Logo} className="mx-auto h-70 w-auto" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Hesabınıza giriş yapın
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit, onError)} action="#" method="POST" className="space-y-6">
              <div>
                <div className="mt-2 flex flex-row">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=" Email Adresiniz"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm focus:ring-0 focus:outline focus:outline-2 focus:outline-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="text-right">
                  <Link to="#" className="font-semibold text-black hover:text-gray-600">
                    Şifrenizi mi unuttunuz?
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Şifreniz"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Giriş Yap
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}

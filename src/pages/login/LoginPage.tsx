import LoginLayout from "@/layouts/login";
import Head from "next/head";
import Image from "next/image";
import { useLoginPage } from "./useLoginPage";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { menuSelectState } from "@/states/menu-state";

LoginPage.getLayout = (page: React.ReactElement) => (
  <LoginLayout>{page}</LoginLayout>
);

export default function LoginPage() {
  const { login, setUsername } = useLoginPage();
  const [_, setMenu] = useRecoilState(menuSelectState);
  const route = useRouter();
  return (
    <>
      <Head>
        <title> Login</title>
      </Head>
      <div className="flex h-screen flex-col-reverse md:flex-row justify-end md:justify-center bg-[#243831]">
        <div className="w-full  md:w-7/12">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white">
                Sign in
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      placeholder="Username"
                      type="text"
                      required
                      onChange={(e) => setUsername(e.target?.value || "")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      login();
                    }}
                    className="flex w-full justify-center rounded-md bg-[#49A569] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      route.push("/register");
                    }}
                    className="mt-1 flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Register
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenu("home");
                      route.push("/");
                    }}
                    className="mt-1 flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Home Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2B5F44] rounded-b-lg  md:rounded-l-lg w-full  md:w-5/12">
          <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <Image
              src="/assets/loginImg.png"
              alt="Login Img"
              width={299}
              height={230}
              priority
            />
            <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white">
              a Board
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

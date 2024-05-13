import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <RecoilRoot>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {getLayout(<Component />)}
      </RecoilRoot>
    </>
  );
}

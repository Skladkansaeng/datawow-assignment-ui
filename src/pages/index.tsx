import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const route = useRouter();

  useEffect(() => {
    route.push("/homepage");
  }, []);

  return <></>;
}

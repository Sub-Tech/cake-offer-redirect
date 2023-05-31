import Script from "next/script";
import Head from "next/head";
import {Poppins} from "next/font/google";

const poppins = Poppins({weight: ['300', '600'], subsets: []});

export default function GlobalHead() {
    return (<><Head>
            <title>Extra Reward 4 You</title>
            <meta name="description" content="This offer may no longer be available or you do not qualify for it."/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
            <style jsx global>{`
              html {
                font-family: ${poppins.style.fontFamily};
              }
            `}</style>
        </Head>
        </>
    )
}
import GlobalHead from "@/components/head";
import styles from '@/styles/CustomRender.module.css'
import Image from "next/image";
import Countdown, {zeroPad} from "react-countdown";
import {useEffect, useState} from "react";

const observable = {};
export default function CustomRenderVersion(props) {

  const [adzukiAds, setAdzukiAds] = useState([])

  useEffect(() => {
    let t = setInterval(() => {
      if (window.adzukiGlobalAds) {
        setAdzukiAds(window.adzukiGlobalAds.data)
        clearInterval(t)
      }
    }, 1000)
  })

  function getAdzukiAdSlotReadyFoo (config) {
     console.log("is this ever happeing", config)
     // setAdzukiAds(config.data)


     // const targetElem = document.getElementById('zukiTarget')
     // targetElem.innerHTML = ""
     // config.data.forEach(function (a) {
     //   var adBoxElem = document.createElement('div')
     //   adBoxElem.className = "zuki-container"
     //   adBoxElem.appendChild(a.nodeImageWithLinkElement)  // append ready node link wrapper with image, link and event handlers to trigger clicks in adzuki
     //   var h1 = document.createElement("h1")
     //   h1.innerText = a.crender_title || "here is an amazing offer"
     //   var p = document.createElement("p")
     //   p.innerText = a.lead_text
     //   var btn = document.createElement("button")
     //   btn.innerText = "Get it now!"
     //   var div = document.createElement("div")
     //   div.appendChild(h1)
     //   div.appendChild(p)
     //   div.appendChild(btn)
     //   div.appendChild(d.nodePixelElement)  // You MUST do this to register impressions
     //   var linkedContentElem = a.nodeLinkElement.appendChild(div)  // same as nodeImageWithLinkElement but without the image
     //   adBoxElem.appendChild(linkedContentElem)
     //   targetElem.appendChild(adBoxElem)
     // })
   }

   function renderAds () {

      if (! adzukiAds || adzukiAds.length === 0) return null

      return adzukiAds.map((ad, index) => {

        return (
          <div key={index}>
            <div >
              {/*{ad.nodeImageWithLinkElement}*/}
            </div>
            <div>
              <h1>{ad.crender_title}</h1>
              <p>{ad.lead_text}</p>
              <button>Get it now!</button>
              {/*{ad.nodePixelElement}*/}
            </div>
          </div>
        )
      })
   }

  const renderAdzukiDiv = () => {
    if (!props.siteConfig.geo) return null;


    return (
      <>
        <div data-adzuki-id={props.siteConfig.adzuki_id}
             data-adzuki-ads={props.displayConfig.number_of_ads}
             data-adzuki-exclusive={(props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
             data-adzuki-top-tags={(!props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
        ></div>
      </>
    )
  }

   useEffect(() => {
       console.log("custom rendering component")
   }, [])

    return (
        <>
            <GlobalHead props={props}/>

            <div className={styles.body}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.container}>
                            {(props.siteConfig.logo) ?
                                <div className={styles.headerTopLogo}>
                                    <Image
                                        className={styles.headerTopLogoImage}
                                        src={props.siteConfig.logo}
                                        alt="Logo"
                                        width={600}
                                        height={200}
                                        priority
                                    /></div> : null}
                            <h6 className={styles.headerTopText}>Oh no! These things happen from time to time</h6>
                        </div>
                    </div>
                    <div className={styles.headerMain}>
                        <img src={"/images/customRender/cloud_desktop_left.svg"}
                             className={styles.headerMainCloudThree}/>
                        <img src={"/images/customRender/cloud_desktop_left.svg"}
                             className={styles.headerMainCloudFour}/>
                        <img src={"/images/customRender/cloud_desktop_right.svg"}
                             className={styles.headerMainCloudOne}/>
                        <img src={"/images/customRender/cloud_desktop_right.svg"}
                             className={styles.headerMainCloudTwo}/>
                        <div className={styles.container}>
                            <h2 className={styles.headerMainText}>{props.displayConfig.main_header}</h2>
                        </div>
                    </div>
                    <div className={styles.headerMainCountdownContainer}>
                        <div className={styles.container}>
                            <h2 className={styles.headerMainCountdownText}>Your exclusive deals expire in
                                : <b><Countdown date={Date.now() + (5 * 60000)}
                                                renderer={(props) => zeroPad(props.minutes) + ':' + zeroPad(props.seconds)}/></b>
                            </h2>
                        </div>
                    </div>

                  <div>{renderAdzukiDiv()}</div>
                  <div>{renderAds()}</div>

                </div>
            </div>
        </>)
}


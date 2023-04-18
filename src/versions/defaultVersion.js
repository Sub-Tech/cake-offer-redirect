import Image from 'next/image'
import {Poppins} from 'next/font/google'
import GlobalHead from "@/components/head";
import styles from '@/styles/Default.module.css'

const poppins = Poppins({weight: ['300', '600'], subsets: []});

export default function DefaultVersion(props) {

    const renderAdzuki = () => {
        if (!props.siteConfig.geo) return null;


        return (
            <>
                <h2 className={styles.offersHeaderText}>{props.displayConfig.sub_header}</h2>
                <div data-adzuki-id={props.siteConfig.adzuki_id}
                     data-adzuki-ads={props.displayConfig.number_of_ads}
                     data-adzuki-ad-size={props.displayConfig.ad_size}
                     data-adzuki-with-title-text={(props.displayConfig.display_title === '1') ? '1' : ''}
                     data-adzuki-exclusive={(props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
                     data-adzuki-top-tags={(!props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
                ></div>
            </>
        )
    }

    return (
        <>
         <GlobalHead props={props}/>

            <div className={styles.body}>
                <div className={styles.header} style={{backgroundColor: '#' + props.displayConfig.branding_colour}}>
                    {(props.siteConfig.logo) ?
                        <Image
                            className={styles.logo}
                            src={props.siteConfig.logo}
                            alt="Logo"
                            width={600}
                            height={200}
                            priority
                        /> : null}
                    <h2 className={styles.headerText}>{props.displayConfig.main_header}</h2>

                </div>
                <main className={styles.main}>
                    {renderAdzuki()}
                    {(props.siteConfig.link) ? <a href={props.siteConfig.link} className={styles.button}>
                        Return To Site
                    </a> : null}
                </main>
                <div className={styles.footer} style={{backgroundColor: '#' + props.displayConfig.branding_colour}}>
                    <p>Copyright © {new Date().getFullYear()} extrareward4you</p>
                    <p>Owned by Submission Technology Ltd. (04456811)</p>
                </div>
            </div>
        </>
    )
}


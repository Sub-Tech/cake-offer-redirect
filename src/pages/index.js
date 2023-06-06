import CustomRenderVersion from "@/versions/customRenderVersion";
import BoldVersion from "@/versions/boldVersion";
import LocationVersion from "@/versions/locationVersion";
import {useEffect, useState} from "react";
import {getLocation, getPrePopData, getSplitTestVersion} from "@/helpers/helpers"
import WinnerVersion from "@/versions/winnerVersion";

export default function Home(props) {
    const [location, setLocation] = useState({});
    const [adzukiConfig, setAdzukiConfig] = useState(props.adzukiConfig);
    const [displayConfig, setDisplayConfig] = useState(props.displayConfig);
    const [siteConfig, setSiteConfig] = useState(props.siteConfig);

    // quick fix: todo tidy up
    useEffect(() => {
        getLocation().then(function (response) {
            if (response.data.success) {
                setLocation(response.data);
                const countryCode = (response.data.country_code === 'GB') ? 'UK' : response.data.country_code;

                if (countryCode !== adzukiConfig.geo) {
                    setAdzukiConfig({
                        ...adzukiConfig,
                        ...{
                            geo: countryCode === 'UK' ? 'UK' : 'US',
                            adzukiId: countryCode === 'UK' ? '19464' : '19465',
                            exclusiveTags: (countryCode === '19464') ? ['external'] : [],
                            isDefaultAffiliate: true,
                            suppressFetch: false
                        }
                    })
                    return
                }
            }
            setAdzukiConfig({
                ...adzukiConfig,
                ...{
                    suppressFetch: false
                }
            })
        }).catch((e) => {
            setAdzukiConfig({
                ...adzukiConfig,
                ...{
                    suppressFetch: false
                }
            })
        })
    }, [])

    // Render landing page
    switch (props.displayConfig.version) {
        case 'BoldVersion':
            return <BoldVersion adzukiConfig={adzukiConfig} displayConfig={displayConfig} siteConfig={siteConfig} location={location}/>
        case 'LocationVersion':
            return <LocationVersion adzukiConfig={adzukiConfig} displayConfig={displayConfig} siteConfig={siteConfig} location={location}/>
        case 'CustomRenderVersion':
            return <CustomRenderVersion adzukiConfig={adzukiConfig} displayConfig={displayConfig} siteConfig={siteConfig} location={location} />;
          case 'WinnerVersion':
            return <WinnerVersion adzukiConfig={adzukiConfig} displayConfig={displayConfig} siteConfig={siteConfig} location={location} />;
        default:
            return <CustomRenderVersion adzukiConfig={adzukiConfig} displayConfig={displayConfig} siteConfig={siteConfig} location={location} />;
    }
}

export function getServerSideProps(context) {
    const getSiteConfig = () => {

        let config = {
            adzukiId: null,
            geo: null,
            logo: null,
            alt: null,
            link: null,
            tag: null,
            affiliate: (context?.query?.affiliate) ?? null,
            s5: (context?.query?.s5) ?? null,
            isDefaultAffiliate: false
        }

        switch (config.affiliate) {
            // UK Sites
            case '19211':
            case '12':
            case '19191':
            case '19212':
            case '19463':
                config.logo = '/logos/free-club-uk.png';
                config.adzukiId = '19463'
                config.geo = 'UK';
                config.link = 'https://freeclub.co.uk/';
                config.exclusive = true;
                break;
            case '19229':
            case '17739':
            case '19304':
                config.logo = '/logos/cashback.png';
                config.adzukiId = '19304'
                config.geo = 'UK';
                config.link = 'https://cashback.co.uk/';
                config.tag = 'cashback';
                config.exclusive = true;
                break;
            case '18920':
            case '19073' :
                config.logo = '/logos/paid-surveys.png';
                config.adzukiId = '18920';
                config.geo = 'UK';
                config.link = 'https://paidsurveys.uk.com/';
                config.tag = 'paid_surveys';
                break;

            // US Sites
            case '18685':
                config.logo = '/logos/global-survey-hub.png';
                config.adzukiId = '18685';
                config.geo = 'US';
                config.link = 'https://www.globalsurveyhub.com/';
                config.tag = 'coreg';
                break;
            case '18691':
                config.logo = '/logos/product-testing-usa.png';
                config.adzukiId = '18691';
                config.geo = 'US';
                config.link = 'https://producttestingusa.com/';
                config.tag = 'coreg';
                break;
            case '19469': // For Zeropark
            case '19477': // For Zeropark
            case '19468': // For Zeropark
                config.adzukiId = '19468';
                config.geo = 'UK';
                break;
            case '17768':
            case '19410':
            case '16489':
            case '18844':
            case '18824':
                config.logo = '/logos/us-product-testing.png';
                config.adzukiId = '18824';
                config.geo = 'US';
                config.link = 'https://usproducttesting.com/';
                config.tag = 'coreg';
                break;
            case '19425':
                config.geo = 'US';
                config.adzukiId = '19465';
                config.isDefaultAffiliate = true;
                break;
            default:
                if (!context?.query?.country || context?.query?.country === 'GB' | context?.query?.country === 'gb' || context?.query?.country === 'UK' || context?.query?.country === 'uk') {
                    config.geo = 'UK';
                    config.adzukiId = '19464';
                    config.isDefaultAffiliate = true;
                    config.tag = 'external'
                }

                if (context?.query?.country === 'US' || context?.query?.country === 'us') {
                    config.geo = 'US';
                    config.adzukiId = '19465';
                    config.isDefaultAffiliate = true;
                }
                break;
        }

        config.tag = (context?.query?.tag) ?? config.tag
        return config;
    }

    const versionSplits = [
        {
            version: 'CustomRenderVersion',
            split: 0.5,
        },
        {
            version: 'LocationVersion',
            split: 0.25,
        },
        {
            version: 'WinnerVersion',
            split: 0.25,
        }
    ]

    const getDisplayConfig = () => {
        const forceVersion = context?.query?.force_version;

        const version = (
          forceVersion && versionSplits.findIndex((split) => split.version === forceVersion) !== -1
        ) ?
            forceVersion :
            getSplitTestVersion(versionSplits);

        const options = {
            branding_colours: null,
            ad_sizes: null,
            display_titles: null,
            number_of_ads: null,
            main_headers: null,
            sub_headers: null
        }

        switch (version) {
            case 'CustomRenderVersion':
                options.main_headers = {
                    3: 'We are sorry this page is no longer available'
                }
                options.sub_headers = {
                    3: `Choose <span style="color:#7f57bb;">3 vouchers</span> as an apology`,
                }
                options.number_of_ads = [
                    25
                ]
                options.ad_sizes = [
                    'medium_rectangle',
                ]
                break;
            default:
                options.branding_colours = ['5d1cbf'];
                options.ad_sizes = ['medium_rectangle']
                options.display_titles = ['1'];
                options.number_of_ads = ['25'];
                options.main_headers = {3: 'We are sorry this page is no longer available'}
                options.sub_headers = {3: `Choose <span style="color:#7f57bb;">3 vouchers</span> as an apology`}
                break;
        }


        let config = {
            version,
            branding_colour: options.branding_colours ? options.branding_colours[Math.floor(Math.random() * options.branding_colours.length)] : null,
            ad_size: options.ad_sizes ? options.ad_sizes[Math.floor(Math.random() * options.ad_sizes.length)] : null,
            display_title: options.display_titles ? options.display_titles[Math.floor(Math.random() * options.display_titles.length)] : null,
            number_of_ads: options.number_of_ads ? options.number_of_ads[Math.floor(Math.random() * options.number_of_ads.length)] : null,
            main_header: options.main_headers ? Object.keys(options.main_headers)[Object.keys(options.main_headers).length * Math.random() << 0] : null,
            sub_header: options.sub_headers ? Object.keys(options.sub_headers)[Object.keys(options.sub_headers).length * Math.random() << 0] : null,
            code: '',
            noRender: false,
        };


        Object.keys(config).forEach((key, index) => {
            if (key === 'code') {
                return;
            }
            let condensedKey = key.split('_').map((item) => {
                return item.charAt(0);
            }).join('_');


            config.code = config.code + condensedKey + '=' + config[key] + ((index < (Object.keys(config).length - 2)) ? ',' : '');
        });

        config.main_header = options.main_headers ? options.main_headers[config.main_header] : null;
        config.sub_header = options.sub_headers ? options.sub_headers[config.sub_header] : null;


        switch (context?.query?.affiliate) {
            case '19468':
            case '19469':
            case '19477':
                config.main_header = '';
                config.sub_header = '';
                break;
        }

        return config;
    }

    const prePopData = getPrePopData(context);
    const siteConfig = getSiteConfig();
    const displayConfig = getDisplayConfig();

    const adzukiConfig = {
        reference: 'extrareward4you',
        suppressFetch: true,
        geo: siteConfig.geo,
        adzukiId: siteConfig.adzukiId,
        maxAds: displayConfig.number_of_ads,
        s3: displayConfig.code || "",
        s4: siteConfig.affiliate || "",
        s5: siteConfig.s5 || "",
        utm_source: 'extrareward4you',
        ...prePopData
    }

    if (siteConfig.isDefaultAffiliate && siteConfig.affiliate) {
        adzukiConfig.utm_medium = siteConfig.affiliate
    }
    if (siteConfig.exclusive && siteConfig.tag) {
        adzukiConfig.exclusiveTags = [siteConfig.tag]
    }
    if (!siteConfig.exclusive && siteConfig.tag) {
        adzukiConfig.preferTags = [siteConfig.tag]
    }

    return {
        props: {
            affiliate: (context?.query?.affiliate) ?? null,
            tag: (context?.query?.tag) ?? null,
            siteConfig: siteConfig,
            displayConfig: displayConfig,
            adzukiConfig: adzukiConfig,
        },
    };
}
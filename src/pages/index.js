import DefaultVersion from "@/versions/defaultVersion";
import CustomRenderVersion from "@/versions/customRenderVersion";
import BoldVersion from "@/versions/boldVersion";
import LocationVersion from "@/versions/locationVersion";
import axios from "axios";
import {useEffect, useState} from "react";
import {NextRequest} from 'next/server';


export default function Home(props) {
    let [location, setLocation] = useState({});

    console.log(props.config);
    useEffect(() => {
        try {
            axios.get('https://ships.stechga.co.uk/')
                .then(function (response) {
                    setLocation(response.data);
                    const countryCode = (response.data.country_code === 'GB') ? 'UK' : response.data.country_code;

                    console.log(countryCode);

                    if(countryCode !== props.config.geo) {
                        console.log('miss match')
                        if(countryCode === 'UK') {
                            props.config.geo = 'UK';
                            props.config.adzukiId = '19464';
                            props.config.exclusiveTags = [];
                            props.config.isDefaultAffiliate = true;
                            console.log('here UK');
                        } else  {
                            props.config.geo = 'US';
                            props.config.adzukiId = '19465';
                            props.config.exclusiveTags = [];
                            props.config.isDefaultAffiliate = true;
                            console.log('here US');
                        }
                    }
                    props.config.suppressFetch = false;
                })
        } catch (e) {
            console.log('Could not find location')
        }
    }, [])

    switch (props.displayConfig.version) {
        case 'BoldVersion':
            return BoldVersion(props);
        case 'LocationVersion':
            return LocationVersion(props, location);
        case 'CustomRenderVersion':
            return CustomRenderVersion(props);
        default:
            return CustomRenderVersion(props);
    }
}

export function getServerSideProps(context) {
    const getSiteConfig = () => {

        let config = {
            adzuki_id: null,
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
                config.adzuki_id = '19463'
                config.geo = 'UK';
                config.link = 'https://freeclub.co.uk/';
                config.exclusive = true;
                break;
            case '19229':
            case '17739':
            case '19304':
                config.logo = '/logos/cashback.png';
                config.adzuki_id = '19304'
                config.geo = 'UK';
                config.link = 'https://cashback.co.uk/';
                config.tag = 'cashback';
                config.exclusive = true;
                break;
            case '18920':
            case '19073' :
                config.logo = '/logos/paid-surveys.png';
                config.adzuki_id = '18920';
                config.geo = 'UK';
                config.link = 'https://paidsurveys.uk.com/';
                config.tag = 'paid_surveys';
                break;

            // US Sites
            case '18685':
                config.logo = '/logos/global-survey-hub.png';
                config.adzuki_id = '18685';
                config.geo = 'US';
                config.link = 'https://www.globalsurveyhub.com/';
                config.tag = 'coreg';
                break;
            case '18691':
                config.logo = '/logos/product-testing-usa.png';
                config.adzuki_id = '18691';
                config.geo = 'US';
                config.link = 'https://producttestingusa.com/';
                config.tag = 'coreg';
                break;
            case '19469': // For Zeropark
            case '19477': // For Zeropark
            case '19468': // For Zeropark
                config.adzuki_id = '19468';
                config.geo = 'UK';
                break;
            case '17768':
            case '19410':
            case '16489':
            case '18844':
            case '18824':
                config.logo = '/logos/us-product-testing.png';
                config.adzuki_id = '18824';
                config.geo = 'US';
                config.link = 'https://usproducttesting.com/';
                config.tag = 'coreg';
                break;
            case '19425':
                config.geo = 'US';
                config.adzuki_id = '19465';
                config.isDefaultAffiliate = true;
                break;
            default:
                if (!context?.query?.country || context?.query?.country === 'GB' | context?.query?.country === 'gb' || context?.query?.country === 'UK' || context?.query?.country === 'uk') {
                    config.geo = 'UK';
                    config.adzuki_id = '19464';
                    config.isDefaultAffiliate = true;
                }

                if (context?.query?.country === 'US' || context?.query?.country === 'us') {
                    config.geo = 'US';
                    config.adzuki_id = '19465';
                    config.isDefaultAffiliate = true;
                }
                break;
        }

        config.tag = (context?.query?.tag) ?? config.tag
        return config;
    }

    function randomBetween(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const getDisplayConfig = () => {
        // Default lander is always the top version
        const versions = {
            'CustomRenderVersion': 'custom',
            'LocationVersion': 'custom',
            // 'BoldVersion': 'bold',
        }

        const splitPercentage = 20; // How much traffic we will send off from the default lander : 4 = 25%, 5 = 20%, 10 = 10%

        let version = Object.keys(versions)[0]; // Default lander

        if (context?.query?.force_version) {
            version = context?.query?.force_version;
        } else if (randomBetween(1, 100) <= splitPercentage) { // Split the traffic off to test with
            if (Object.keys(versions).length === 1) {
                version = Object.keys(versions)[0]
            } else {
                version = Object.keys(versions)[Object.keys(versions).length * Math.random() << 0];
            }
        }

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

    function formatDateOrNull(dateString) {
        try {
            const date = new Date(dateString);
            if (isNaN(date)) {
                return null;
            }
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        } catch (error) {
            return null;
        }
    }

    const getPrePopData = () => {
        const data = [];

        let possibilities = [
            {'key': 'dob', 'value': ['dob', 'd_o_b', 'date_of_birth', 'd-o-b', 'date-of-birth']},
            {'key': 'age', 'value': ['age']},
            {'key': 'gender', 'value': ['gender', 'g']},
            {'key': 'firstName', 'value': ['firstName', 'first_name', 'firstname', 'fname', 'name', 'f_name']},
            {'key': 'lastName', 'value': ['lastName', 'last_name', 'lastname', 'lname', 'l_name']},
            {'key': 'email', 'value': ['email', 'email_address', 'email-address', 'e-mail']},
            {'key': 'city', 'value': ['city', 'address_city']},
            {'key': 'state', 'value': ['county']},
            {
                'key': 'zipcode',
                'value': ['zip', 'zip_code', 'zip_code', 'postcode', 'post_code', 'pcode', 'postal_code']
            },
            {'key': 'phone', 'value': ['phone', 'tel', 'mob', 'mobile', 'tell', 'telephone']},
        ];

        possibilities.forEach((possibility) => {
            const key = possibility.key;
            let value = null;
            possibility.value.forEach((key) => {
                if (value) {
                    return;
                }
                if (context?.query[key]) {
                    value = context?.query[key];
                }
            });
            if (key && value) {
                data[key] = value;
            }
        });

        if (data['dob']) {
            data['dob'] = formatDateOrNull(data['dob']);
            if (!data['dob']) {
                delete data['dob'];
            }
        }

        if (data['gender']) {
            if (['M', 'male', 'm'].includes(data['gender'])) {
                data['gender'] = 'male';
            } else if (['F', 'female', 'f'].includes(data['gender'])) {
                data['gender'] = 'female';
            } else {
                delete data['gender'];
            }
        }

        return data;
    }

    const prePopData = getPrePopData();
    const siteConfig = getSiteConfig();
    const displayConfig = getDisplayConfig();

    const config = {
        reference: 'extrareward4you',
        suppressFetch: true,
        geo: siteConfig.geo,
        adzukiId: siteConfig.adzuki_id,
        maxAds: displayConfig.number_of_ads,
        s3: displayConfig.code || "",
        s4: siteConfig.affiliate || "",
        s5: siteConfig.s5 || "",
        utm_source: 'extrareward4you',
        ...prePopData
    }

    if (siteConfig.isDefaultAffiliate && siteConfig.affiliate) {
        config.utm_medium = siteConfig.affiliate
    }
    if (siteConfig.exclusive && siteConfig.tag) {
        config.exclusiveTags = [siteConfig.tag]
    }

    if (!siteConfig.exclusive && siteConfig.tag) {
        config.preferTags = [siteConfig.tag]
    }

    return {
        props: {
            affiliate: (context?.query?.affiliate) ?? null,
            tag: (context?.query?.tag) ?? null,
            siteConfig: siteConfig,
            displayConfig: displayConfig,
            config: config,
        },
    };
}
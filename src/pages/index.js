import DefaultVersion from "@/versions/defaultVersion";
import CustomRenderVersion from "@/versions/customRenderVersion";
import BlingVersion from "@/versions/blingVersion";


export default function Home(props) {
    switch (props.displayConfig.version) {
        case 'BlingVersion':
            return BlingVersion(props);
        case 'CustomRenderVersion':
            return CustomRenderVersion(props);
        default:
            return DefaultVersion(props);
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

    const getDisplayConfig = () => {
        const versions = {
            'DefaultVersion': 'default',
            'CustomRenderVersion': 'custom',
            'BlingVersion': 'bling',
        }

        const version = context?.query?.force_version ?? Object.keys(versions)[Object.keys(versions).length * Math.random() << 0];

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
                    4: `Here's <span style="color:#7f57bb;">a voucher</span> as an apology`,
                    5: `You can choose <span style="color:#7f57bb;">2 vouchers</span>`,
                }
                options.number_of_ads = [
                    25
                ]
                options.ad_sizes = [
                    'medium_rectangle',
                ]
                break;
            default:
                options.branding_colours = [
                    // '1c99bf',
                    // '1cbf4a',
                    // 'bf9e1c',
                    '5d1cbf',
                    // 'bf1c78'
                ];
                options.ad_sizes = [
                    'medium_rectangle',
                    // 'large_mobile_banner'
                ]
                options.display_titles = [
                    '1',
                    // '0'
                ];
                options.number_of_ads = [
                    // '3',
                    // '6',
                    // '9',
                    '10',
                    '15',
                    '30'
                ];
                options.main_headers = {
                    // 1: 'We’re sorry, this offer is no longer available.',
                    2: 'This offer may no longer be available or you do not qualify for it.'
                }
                options.sub_headers = {
                    1: 'Check out more offers below that you may like',
                    // 2: 'Other offers you might like',
                }
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

        console.log(config);


        switch (config.version) {
            case 'BlingVersion' :
                config.noRender = true;
                break;
            case 'CustomRenderVersion' :
                config.noRender = true;
                break;
        }

        Object.keys(config).forEach((key, index) => {
            if (key === 'code' || key === 'noRender') {
                return;
            }
            let condensedKey = key.split('_').map((item) => {
                return item.charAt(0);
            }).join('_');


            config.code = config.code + condensedKey + '=' + config[key] + ((index < (Object.keys(config).length - 2)) ? ',' : '');
        });

        config.main_header = options.main_headers ? options.main_headers[config.main_header] :null;
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


    return {
        props: {
            affiliate: (context?.query?.affiliate) ?? null,
            tag: (context?.query?.tag) ?? null,
            siteConfig: getSiteConfig(),
            displayConfig: getDisplayConfig(),
        },
    };
}
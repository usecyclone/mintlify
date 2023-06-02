import { ImageResponse } from '@vercel/og';
import clsx from 'clsx';
import hexRgb from 'hex-rgb';
import isDarkColor from 'is-dark-color';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const interFontRegularImport = fetch(
  new URL('../../../assets/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const interFontSemiboldImport = fetch(
  new URL('../../../assets/Inter-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const interFontBoldImport = fetch(new URL('../../../assets/Inter-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer()
);

const truncateDescription = (description: string): string => {
  return `${description.replace(/^(.{72}[^\s]*).*/, '$1')}${description.length > 72 ? '...' : ''}`;
};

export default async function handler(req: NextRequest) {
  try {
    const [interFontRegular, interFontSemibold, interFontBold] = await Promise.all([
      interFontRegularImport,
      interFontSemiboldImport,
      interFontBoldImport,
    ]);
    const { searchParams } = new URL(req.url);

    let mode = searchParams.get('mode');
    const division = searchParams.get('division');
    const section = searchParams.get('section');
    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const logoLight = searchParams.get('logoLight');
    const logoDark = searchParams.get('logoDark');
    const primaryColor = searchParams.get('primaryColor');
    const lightColor = searchParams.get('lightColor');

    const primaryHex = hexRgb(primaryColor || '');
    const lightHex = hexRgb(lightColor || '');

    if (!mode) {
      mode = isDarkColor(primaryColor) ? 'light' : 'dark';
    }

    const isLightMode = mode === 'light';
    const backgroundColor = isLightMode ? '#FFF' : '#000';

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor,
            fontFamily: 'Inter var',
            backgroundImage: `radial-gradient(circle at 1200px 800px, rgba(${primaryHex.red}, ${
              primaryHex.green
            }, ${primaryHex.blue}, ${isLightMode ? '0.7' : '0.4'}) 0%, rgba(${lightHex.red}, ${
              lightHex.green
            }, ${lightHex.blue}, ${isLightMode ? '0.3' : '0.02'}) ${
              isLightMode ? '50%' : '80%'
            }, rgba(${lightHex.red}, ${lightHex.green}, ${lightHex.blue}, 0.004) 85%)`,
          }}
          tw="relative h-full w-full flex px-17 pt-18 pb-15"
        >
          <div tw="flex-1 relative h-full w-full flex flex-col -mr-32">
            {mode === 'light' && logoLight && <img tw="h-13" src={logoLight} alt="Logo" />}
            {mode === 'dark' && logoDark && <img tw="h-13" src={logoDark} alt="Logo" />}
            <div tw="my-auto"></div>
            <div tw="flex flex-col">
              <span
                tw="ml-1 mt-7 text-2xl font-semibold"
                style={{
                  color: (isLightMode ? primaryColor : lightColor) || '',
                  letterSpacing: '0.03rem',
                }}
              >
                <span>{division}</span>
                {division && section && <span tw="mx-3.5 opacity-50">/</span>}
                <span>{section}</span>
              </span>
              <span
                tw={clsx(
                  'mt-7 text-6xl font-bold leading-tight',
                  isLightMode ? 'text-neutral-900' : 'text-gray-50'
                )}
              >
                {title}
              </span>
              {description && (
                <span
                  tw={clsx(
                    'mt-4 text-3xl leading-relaxed',
                    isLightMode ? 'text-black/70' : 'text-white/55'
                  )}
                  style={{
                    letterSpacing: '0.04rem',
                  }}
                >
                  {truncateDescription(description)}
                </span>
              )}
            </div>
          </div>
          <div tw="flex-1"></div>
          {isLightMode ? (
            <svg
              width="490"
              height="424"
              viewBox="0 0 490 424"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', right: 0, bottom: 0 }}
            >
              <path
                d="M32.7815 27.9481L32.7826 27.9477C58.738 19.211 120.67 1 186.875 1C230.845 1 272.682 8.98044 303.301 16.8431C318.613 20.8374 331.289 24.7058 340.251 27.6986L340.262 27.7021C341.826 28.2043 343.357 28.696 344.645 29.185L345 29.3196L345.355 29.185C346.643 28.696 348.174 28.2043 349.738 27.7021L349.745 27.6997L349.753 27.6972C358.591 24.7062 371.385 20.838 386.699 16.8431C417.318 8.98044 459.155 1 503.125 1C569.33 1 631.262 19.211 657.217 27.9477L657.218 27.9481C676.891 34.5462 689 53.6297 689 73.875V463.25C689 496.111 659.511 518.034 631.478 513.016C609.257 509.005 569.906 504 512.708 504C441.855 504 395.047 534.503 378.893 546.83L378.889 546.834C369.807 553.849 357.917 559 344.401 559C332.418 559 321.473 554.832 312.628 548.679C294.593 536.008 242.28 504 177.292 504C123.079 504 81.0942 509.507 57.3287 513.64C29.1948 518.533 1 496.384 1 464.375V73.875C1 53.5062 13.1082 34.5466 32.7815 27.9481ZM317.25 81.625V80.8902L316.549 80.6707C309.346 78.416 300.345 75.7859 290.023 73.156C262.066 66.0194 224.842 59 186.875 59C134.498 59 83.9535 72.2835 57.2008 80.6708L56.5 80.8905V81.625V453.875V455.044L57.6551 454.863C84.6846 450.62 125.96 446 177.292 446C235.524 446 284.71 466.175 315.768 483.251L317.25 484.066V482.375V81.625ZM373.451 80.6707L372.75 80.8902V81.625V480.625V480.75V482.461L374.241 481.621C404.314 464.685 451.344 446 512.708 446C566.682 446 606.4 450.246 632.343 454.363L633.5 454.546V453.375V81.625V80.8905L632.799 80.6708C606.046 72.2835 555.502 59 503.125 59C465.158 59 427.934 66.0194 399.977 73.156C389.655 75.7859 380.654 78.416 373.451 80.6707Z"
                fill="url(#paint0_linear_209_928)"
                stroke="url(#paint1_linear_209_928)"
                stroke-width="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_209_928"
                  x1="345"
                  y1="0"
                  x2="345"
                  y2="560"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" stop-opacity="0.45" />
                  <stop offset="0.696429" stop-color="white" stop-opacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_209_928"
                  x1="345"
                  y1="0"
                  x2="345"
                  y2="560"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="0.364583" stop-color="white" />
                  <stop offset="0.742857" stop-color="white" stop-opacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="490"
              height="424"
              viewBox="0 0 490 424"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            >
              <path
                d="M32.7815 27.9481L32.7826 27.9477C58.738 19.211 120.67 1 186.875 1C230.845 1 272.682 8.98044 303.301 16.8431C318.613 20.8374 331.289 24.7058 340.251 27.6986L340.262 27.7021C341.826 28.2043 343.357 28.696 344.645 29.185L345 29.3196L345.355 29.185C346.643 28.696 348.174 28.2043 349.738 27.7021L349.745 27.6997L349.753 27.6972C358.591 24.7062 371.385 20.838 386.699 16.8431C417.318 8.98044 459.155 1 503.125 1C569.33 1 631.262 19.211 657.217 27.9477L657.218 27.9481C676.891 34.5462 689 53.6297 689 73.875V463.25C689 496.111 659.511 518.034 631.478 513.016C609.257 509.005 569.906 504 512.708 504C441.855 504 395.047 534.503 378.893 546.83L378.889 546.834C369.807 553.849 357.917 559 344.401 559C332.418 559 321.473 554.832 312.628 548.679C294.593 536.008 242.28 504 177.292 504C123.079 504 81.0942 509.507 57.3287 513.64C29.1948 518.533 1 496.384 1 464.375V73.875C1 53.5062 13.1082 34.5466 32.7815 27.9481ZM317.25 81.625V80.8902L316.549 80.6707C309.346 78.416 300.345 75.7859 290.023 73.156C262.066 66.0194 224.842 59 186.875 59C134.498 59 83.9535 72.2835 57.2008 80.6708L56.5 80.8905V81.625V453.875V455.044L57.6551 454.863C84.6846 450.62 125.96 446 177.292 446C235.524 446 284.71 466.175 315.768 483.251L317.25 484.066V482.375V81.625ZM373.451 80.6707L372.75 80.8902V81.625V480.625V480.75V482.461L374.241 481.621C404.314 464.685 451.344 446 512.708 446C566.682 446 606.4 450.246 632.343 454.363L633.5 454.546V453.375V81.625V80.8905L632.799 80.6708C606.046 72.2835 555.502 59 503.125 59C465.158 59 427.934 66.0194 399.977 73.156C389.655 75.7859 380.654 78.416 373.451 80.6707Z"
                fill="url(#paint0_linear_205_13873)"
                stroke="url(#paint1_linear_205_13873)"
                stroke-width="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_205_13873"
                  x1="345"
                  y1="0"
                  x2="345"
                  y2="560"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" stop-opacity="0.06" />
                  <stop offset="0.526786" stop-color="white" stop-opacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_205_13873"
                  x1="345"
                  y1="0"
                  x2="345"
                  y2="560"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" stop-opacity="0.14" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 's-maxage=300',
        },
        fonts: [
          {
            name: 'Inter',
            data: interFontRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interFontSemibold,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'Inter',
            data: interFontBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

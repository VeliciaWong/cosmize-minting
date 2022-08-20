import Button from "components/button";
import {
  BlinkIcon,
  DiscordIcon,
  MediumIcon,
  TelegramIcon,
  TwitterIcon,
} from "components/icons";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#155D8B] relative">
      <Head>
        <title>Cosmize</title>
        <meta name="description" content="Cosmize description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen flex flex-col">
        <header className="pt-4 px-4 pb-[15px] bg-[#24A3D91A]">
          <div className="max-w-[1140px] mx-auto flex items-center justify-center sm:justify-between">
            <a href="#" className="h-[25px]">
              <Image
                src="/assets/images/cosmize-logo.png"
                alt=""
                width={113.15}
                height={25}
              />
            </a>
            <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
              <Button>
                <BlinkIcon className="mr-[5px]" /> Back to homepage
              </Button>
              <a href="#">
                <DiscordIcon />
              </a>
              <a href="#">
                <TwitterIcon />
              </a>
              <a href="#">
                <TelegramIcon />
              </a>
              <a href="#">
                <MediumIcon />
              </a>
            </div>
          </div>
        </header>
        <div className="flex-grow px-4 pt-[19px] pb-[20px]">
          <div className="max-w-[1140px] h-full mx-auto">
            <div className="relative h-full">
              <Image
                className="h-full rounded-[20px]"
                src="/assets/images/room.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
              <div className="sm:hidden">
                <div className="fixed z-[1] left-0 top-0 bg-[#00000099] h-screen w-screen" />

                <div className="absolute z-[1] w-full h-full flex flex-col justify-center text-center">
                  <h1 className="text-[15px] text-white font-extrabold leading-[19.5px] mb-[15px]">
                    Please open the Cosmize link on your desktop.
                  </h1>
                  <p className="text-[15px] text-white leading-[18.2px] px-4">
                    At this time, Cosmize is only optimized for desktops. However, the gameplay does run on smartphones, and we hope to introduce touch controls in future updates.
                  </p>
                </div>

                <div className="absolute z-[1] bottom-0 w-full mb-[31px]">
                  <div className="text-[15px] text-white text-center font-extrabold leading-[19.5px] mb-[5px]">
                    Join our community
                  </div>
                  <div className="flex justify-center space-x-[5px]">
                    <a href="#">
                      <DiscordIcon width={24} height={24} />
                    </a>
                    <a href="#">
                      <TwitterIcon width={24} height={24} />
                    </a>
                    <a href="#">
                      <TelegramIcon width={24} height={24} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="absolute w-full bottom-0 hidden mb-[30px] sm:flex sm:flex-col sm:items-center">
                <div className="text-[64px] leading-[83.2px] font-extrabold text-center text-white">
                  Non tincidunt <br /> amet aliquam nisl
                </div>
                <div>
                  <Button variant="lg">
                    <BlinkIcon width={28} height={28} className="mr-[10px]" />{" "}
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-[#24A3D91A]">
          <div className="flex justify-center py-3 border-b-2 border-[#C2D1D9]">
            <Image
              src="/assets/images/cosmize-logo-flat.png"
              alt=""
              width={255.44}
              height={40}
            />
          </div>
          <div className="text-white text-center text-[14px] leading-[21px] mt-1 mb-3">
            ©2022 - COSMIZE | All right reserved
          </div>
        </footer>
      </div>
    </div>
  );
}

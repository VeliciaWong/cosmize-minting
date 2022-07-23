import Button from 'components/button'
import { BlinkIcon, DiscordIcon, MediumIcon, TelegramIcon, TwitterIcon } from 'components/icons'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen bg-[#155D8B] flex flex-col'>
      <Head>
        <title>Cosmize</title>
        <meta name="description" content="Cosmize description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="pt-4 pb-[15px] bg-[#24A3D91A]">
        <div className='max-w-[1140px] mx-auto flex items-center justify-between'>
          <a href='#' className='h-[25px]'>
            <Image src="/assets/images/cosmize-logo.png" alt="" width={113.15} height={25} />
          </a>
          <div className='flex items-center space-x-[14px]'>
            <Button><BlinkIcon className="mr-[5px]" /> Back to homepage</Button>
            <a href='#'>
              <DiscordIcon />
            </a>
            <a href='#'>
              <TwitterIcon />
            </a>
            <a href='#'>
              <TelegramIcon />
            </a>
            <a href='#'>
              <MediumIcon />
            </a>
          </div>
        </div>
      </header>
      <div className='max-w-[1140px] w-full flex-grow mx-auto mt-[19px] mb-[20px]'>
        <div className='relative'>
          <Image src="/assets/images/room.png" alt='' layout='responsive' width={1140} height={700} />
          <div className='absolute w-full bottom-0 flex flex-col items-center mb-[30px]'>
            <div className='text-[64px] leading-[83.2px] font-extrabold text-center text-white'>Non tincidunt <br /> amet aliquam nisl</div>
            <div><Button variant='lg'><BlinkIcon width={28} height={28} className="mr-[5px]" /> Connect Wallet</Button></div>
          </div>
        </div>
      </div>
      <footer className='bg-[#24A3D91A]'>
        <div className='flex justify-center py-3 border-b-2 border-[#C2D1D9]'>
          <Image src="/assets/images/cosmize-logo-flat.png" alt='' width={255.44} height={40} />
        </div>
        <div className='text-white text-center text-[14px] leading-[21px] mt-1 mb-3'>©2022 - COSMIZE  |   All right reserved</div>
      </footer>
    </div>
  )
}

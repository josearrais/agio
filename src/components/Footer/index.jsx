import { FooterLinks } from './FooterLinks';

const Footer = () => {
  return (
    <div className='w-full px-14 py-6'>
        <div className='mx-auto max-w-7xl'>
            <div className='flex flex-col sm:flex-row justify-between items-center py-4 text-center'>
                <FooterLinks />
                <div className='text-white no-underline text-sm'>
                    <span className='inline-block transform rotate-180'>&copy;</span> {new Date().getFullYear()} Agio
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;

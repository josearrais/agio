import { footerLinks } from '@/config/navigation';

export const FooterLinks = ({ items = footerLinks }) => {
    return (
        <div className="grid gap-x-4 grid-rows-6 sm:grid-rows-1 grid-cols-max auto-cols-max grid-flow-col justify-center">
            {items.map((link) => (
                <span key={link.name}>
                    <a className="text-sm cursor-pointer text-inherit no-underline hover:text-violet-400 transition duration-300" href={link.link}>
                        {link.name}
                    </a>
                </span>
            ))}
        </div>
    )
}

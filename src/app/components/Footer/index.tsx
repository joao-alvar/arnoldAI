import {Fragment} from 'react'
const linkStyle =
  'hover:text-blue-500 hover:border-b-blue-500 hover:border-b-[1px]'

const links = [
  {
    name: 'Website',
    href: 'https://victor-alvar.vercel.app/',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/joao-alvar',
  },
  {
    name: 'Linkedin',
    href: 'https://linkedin.com/in/victoralvar',
  },
]

function Footer() {
  return (
    <footer className="container mx-auto border-t px-4 pb-6 pt-6 text-center">
      <p className="flex flex-col justify-center gap-2 sm:flex-row">
        <span>Follow me on -</span>
        <span>
          {links.map((item, index) => (
            <Fragment key={index}>
              <a
                className={linkStyle}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.name}
              </a>
              {index < links.length - 1 && ', '}
            </Fragment>
          ))}
        </span>
      </p>
    </footer>
  )
}

export default Footer

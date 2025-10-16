import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface TypeOptions {
  [key: string]: { id: string }
}

interface InputMarkdownConvertProps {
  typeOptions: TypeOptions
  initValue: string | null
}

// transform url to mention (if it is a mention)
const urlToMention = (href: string | null, options: TypeOptions) => {
  if (!href) return { href }
  // check href is a mention
  const type = href && href.split(':')[0]
  // find the type in mention options
  const typeSymbol = Object.entries(options).find(([, value]) => value.id === type)?.[0]
  if (!typeSymbol) return { href }
  // prefix @ to the href
  const newHref = '@' + href
  return { href: newHref, type: typeSymbol }
}

function convertStringToBlockquotes(text: string) {
  return text.split('\n').map((line, index) => (
    <p key={index}>
      {`> `}
      {line}
    </p>
  ))
}

const InputMarkdownConvert = ({ typeOptions, initValue }: InputMarkdownConvertProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      urlTransform={(url) => url}
      components={{
        a: ({ children, href }) => {
          // @ts-ignore
          const { href: newHref, type } = urlToMention(href, typeOptions)

          return (
            // @ts-ignore
            <a href={newHref}>
              {type}
              {children}
            </a>
          )
        },
        // convert li into check list items
        li: ({ children, ...props }) => {
          if (!props.className?.includes('task-list-item')) return <li {...props}>{children}</li>
          else {
            // @ts-ignore
            const p = children.find((item) => item.type === 'p')
            // @ts-ignore
            const input = p?.props?.children?.find((item) => item.type === 'input')
            const isChecked = input?.props?.checked

            const checked = isChecked ? 'checked' : 'unchecked'
            return (
              <li data-list={checked} {...props}>
                {children}
              </li>
            )
          }
        },
        code: ({ children, ...props }) => {
          // @ts-ignore
          return <pre {...props}>{children}</pre>
        },
        blockquote: ({ children }) => {
          // insert `>` in front of first child
          // @ts-ignore
          const quoteChild = children.find((item) => !!item?.props)

          if (!quoteChild) return children
          const propsChildren = quoteChild.props.children
          if (!propsChildren) return children

          let normalizedChildren = Array.isArray(propsChildren) ? propsChildren : [propsChildren]

          const newPropsChildren = normalizedChildren.flatMap((child) => {
            return typeof child === 'string' ? convertStringToBlockquotes(child) : child
          })

          const newQuoteChild = {
            ...quoteChild,
            props: {
              ...quoteChild.props,
              children: newPropsChildren,
            },
          }

          return newQuoteChild
        },
      }}
    >
      {initValue}
    </ReactMarkdown>
  )
}

export default InputMarkdownConvert

import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string,

}

const ErrorMessage = ({children, className=""}: Props) => {
  return (
    <div className={`${className} text-red-600 text`}>{children}</div>
  )
}

export default ErrorMessage
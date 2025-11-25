import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
}

export const Button3D: React.FC<Props> = ({ label, className = '', ...rest }) => {
  return (
    <button
      {...rest}
      className={`btn-3d ${className}`}
      aria-pressed={rest['aria-pressed']}
    >
      <span className="btn-3d-face">{label}</span>
    </button>
  )
}
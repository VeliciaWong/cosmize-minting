const { useRef } = require("react")

const borderVariant = {
  md: 'border-2',
  lg: 'border-4'
}

const xPaddingVariant = {
  md: 'px-[18px]',
  lg: 'px-10'
}

const textSizeVariant = {
  md: 'text-[12px]',
  lg: 'text-[24px]'
}

const leadingVariant = {
  md: 'leading-[16px]',
  lg: 'leading-[31.2px]',
}

const shadowVariant = {
  md: '0px 10px 20px 5px rgba(0, 0, 0, 0.15)',
  lg: '0px 20px 40px 10px rgba(0, 0, 0, 0.15)',
}

const Button = ({ children, variant = 'md', onClick}) => {
  const border = useRef(borderVariant[variant]).current
  const xPadding = useRef(xPaddingVariant[variant]).current
  const textSize = useRef(textSizeVariant[variant]).current
  const leading = useRef(leadingVariant[variant]).current
  const shadow = useRef(shadowVariant[variant]).current

  return (
    <button
      style={{
        background: 'linear-gradient(95.25deg, #1B3543 0%, #283A50 49.99%, #214253 50%)',
        boxShadow: shadow
      }}
      className={`rounded-full ${border} border-[#D2D2D280] text-white flex items-center py-[7px] ${xPadding} ${textSize} ${leading}`} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
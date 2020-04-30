import React from 'react'

const StarSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M14.633 17.5a.833.833 0 01-.383-.092L10 15.183l-4.25 2.225a.833.833 0 01-1.208-.883l.833-4.692L1.942 8.5a.833.833 0 01-.209-.833.833.833 0 01.675-.567l4.75-.692L9.25 2.133a.833.833 0 011.5 0L12.867 6.4l4.75.692a.833.833 0 01.675.566.833.833 0 01-.209.834l-3.433 3.333.833 4.692a.832.832 0 01-.333.833.834.834 0 01-.517.15z" />
    </svg>
  )
}

export default StarSVG

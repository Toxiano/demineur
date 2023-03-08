import React from 'react';

interface ButtonExpandProps {
    text: string;
    onClick: () => unknown;
    bgColor: string;
    borderColor: string;
    textColor: string;
    buttonType: 'button' | 'submit' | 'reset';
}

const ButtonExpand = ({text, bgColor, borderColor, textColor, buttonType, onClick}: ButtonExpandProps) => {
    return (
        <button
            type={buttonType}
            onClick={onClick}
            className={`group relative inline-block overflow-hidden border ${borderColor} px-8 py-3 focus:outline-none focus:ring`}
        >
      <span
          className={
              `absolute inset-y-0 left-0 w-[2px] ${bgColor} transition-all group-hover:w-full group-active:` + bgColor
          }
      ></span>

            <span className={`relative text-sm font-medium ${textColor} transition-colors group-hover:text-white`}>
        {text}
      </span>
        </button>
    );
};

export default ButtonExpand;

import styled from 'styled-components'

export interface ButtonProps {
    readonly primary?: boolean
    readonly outlined?: boolean
    readonly size?: 'sm' | 'md'
}
const Button = styled.button<ButtonProps>`
    background-color: transparent;
    border: none;
    box-shadow: none;
    outline: none;
    cursor: pointer;
    border-radius: 4px;

    padding: 4px 16px;
    padding: ${({ size }) => {
        switch (size) {
            case 'sm':
                return '2px 8px'
            default:
                return '4px 16px'
        }
    }};
    font-size: ${({ size }) => {
        switch (size) {
            case 'sm':
                return 14
            default:
                return 16
        }
    }}px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }

    &.active {
        background-color: rgba(0, 0, 0, 0.06);
    }
    ${({ primary }) =>
        primary &&
        `
        background-color: #42A5F5;
        color: #fff;
        &:hover {
            background-color: #2196F3;
        }
    `};
    ${({ outlined }) =>
        outlined &&
        `
        border: 1px solid #ccc;
    `};

    &:disabled {
        opacity: 0.7;
    }
`

export default Button

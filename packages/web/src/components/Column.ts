import styled from 'styled-components'

export interface ColumnProps {
    readonly flex: number
    readonly secondary?: boolean
}
const Column = styled.div<ColumnProps>`
    position: relative;
    height: 100%;
    overflow: hidden;
    flex: ${({ flex }) => flex};
    ${({ secondary }) =>
        secondary &&
        `
        background-color: #f5f5f5;
        border-right: 1px solid #d9d9d9;
    `};
`

export default Column

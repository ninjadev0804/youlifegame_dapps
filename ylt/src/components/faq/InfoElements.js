import styled from "styled-components"

export const List = styled.ul`
  list-style-type: none;
`

export const ListItem = styled.li`
  margin-bottom: 0.3rem;
`

export const AccordionContent = styled.p`
  font-size: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`

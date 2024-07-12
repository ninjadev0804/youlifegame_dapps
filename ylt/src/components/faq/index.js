import React from "react"
import { accordionData } from "./data"
import { AccordionContent, List, ListItem } from "./InfoElements"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"
import "./styles.css"

export const AccordionFaqs = () => {
  return (
    <Accordion allowZeroExpanded>
      {accordionData.map((item) => {
        return (
          <AccordionItem key={item.id}>
            <AccordionItemHeading>
              <AccordionItemButton>{item.title}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {Array.isArray(item.content) ? (
                item.content.map((content, index) => (
                  <List key={index}>
                    <ListItem>{content}</ListItem>
                  </List>
                ))
              ) : (
                <AccordionContent>{item.content}</AccordionContent>
              )}
            </AccordionItemPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

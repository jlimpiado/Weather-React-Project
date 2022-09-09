import { ComponentStory, ComponentMeta } from "@storybook/react"
import Card, { CardProps } from "./index"

export default {
  title: "Weather Card",
  component: Card,
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args: CardProps) => <Card {...args} />

export const DayCard = Template.bind({})

DayCard.args = {
  temperature: 35,
  day: 0,
  code: "200",
}

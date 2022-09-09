import { ComponentStory, ComponentMeta } from "@storybook/react"
import CurrentCard, { CurrentCardProps } from "."

export default {
  title: "Weather Card",
  component: CurrentCard,
} as ComponentMeta<typeof CurrentCard>

export const CurrentWeather: ComponentStory<typeof CurrentCard> = (args: CurrentCardProps) => (
  <CurrentCard {...args} />
)

CurrentWeather.args = {
  cityName: "MANILA, PH",
  weather: {
    description: "testing weather description",
    temperature: 36,
    iconID: "300",
    weatherDate: new Date(),
  },
}

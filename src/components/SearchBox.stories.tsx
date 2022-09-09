import { ComponentStory, ComponentMeta } from "@storybook/react"
import SearchBox from "./SearchBox"

export default {
  title: "Search Box",
  component: SearchBox,
} as ComponentMeta<typeof SearchBox>

export const SearchStory: ComponentStory<typeof SearchBox> = () => <SearchBox />

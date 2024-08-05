import { ChatOpenAI } from '@langchain/openai'

const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
})

import { HumanMessage } from '@langchain/core/messages'
export async function Test() {
  return await model.invoke([new HumanMessage({ content: "Hi! I'm Bob" })])
}

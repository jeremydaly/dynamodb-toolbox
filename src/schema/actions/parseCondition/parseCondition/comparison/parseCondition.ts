import type { ConditionParser } from '../../conditionParser.js'
import { isComparisonOperator } from './types.js'
import type { ComparisonCondition, ComparisonOperator } from './types.js'

const comparisonOperatorExpression: Record<ComparisonOperator, string> = {
  eq: '=',
  ne: '<>',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<='
}

type ComparisonConditionParser = <CONDITION extends ComparisonCondition>(
  conditionParser: ConditionParser,
  condition: CONDITION
) => void

export const parseComparisonCondition: ComparisonConditionParser = <
  CONDITION extends ComparisonCondition
>(
  conditionParser: ConditionParser,
  condition: CONDITION
) => {
  const comparisonOperator = Object.keys(condition).find(isComparisonOperator) as keyof CONDITION &
    ComparisonOperator

  const attributePath = condition.size ?? condition.attr
  const expressionAttributeValue = condition[comparisonOperator]
  const { transform = true } = condition

  conditionParser.resetExpression()
  const attribute = conditionParser.appendAttributePath(attributePath, { size: !!condition.size })
  conditionParser.appendToExpression(` ${comparisonOperatorExpression[comparisonOperator]} `)
  conditionParser.appendAttributeValueOrPath(attribute, expressionAttributeValue, { transform })
}

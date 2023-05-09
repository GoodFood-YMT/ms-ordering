import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('status', (value, _, options) => {
  if (value !== 'PENDING' && value !== 'PAID' && value !== 'UNPAID') {
    options.errorReporter.report(
      options.pointer,
      'Gestion du status',
      'Le Status doit être PENDING, PAID ou UNPAID',
      options.arrayExpressionPointer
    )
  } else {
    return value
  }
})

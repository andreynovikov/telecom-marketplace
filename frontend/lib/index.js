import currencyJs from 'currency.js'

const RUR = value => currencyJs(value, {
    symbol: '₽',
    pattern: `# !`,
    negativePattern: `-# !`,
    decimal: ',',
    separator: ' ',
    precision: 0
})

export function currency(price) {
    return price === 0 ? 'Цена по запросу' : RUR(price).format()
}

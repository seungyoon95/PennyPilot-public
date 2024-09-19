export const Currencies = [
    {value: "CAD", label: "$ CAD", locale: "en-CA"},
    {value: "USD", label: "$ USD", locale: "en-US"},
    {value: "EUR", label: "€ EUR", locale: "de-DE"},
    {value: "GBP", label: "£ GBP", locale: "en-GB"},
    {value: "KRW", label: "₩ KRW", locale: "ko-KR"},
    {value: "JPY", label: "¥ JPY", locale: "ja-JP"},
]

export type Currency = (typeof Currencies)[0];
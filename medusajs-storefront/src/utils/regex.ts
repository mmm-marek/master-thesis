export const passwordRegEx = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/ // 8 znakov, 1 číslo, 1 veľký, 1 malý a 1 špeciálny znak

/**
 * @see https://ihateregex.io/expr/uuid/
 */
export const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/

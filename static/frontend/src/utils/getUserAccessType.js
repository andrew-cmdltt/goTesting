export function getUserAccessType(nusertypekey) {
    if (nusertypekey == 533) {return 'Администратор'}
    else if (nusertypekey == 532) {return 'Модератор'}
    return 'Тестируемый'
}
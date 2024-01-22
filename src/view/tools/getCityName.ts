import provAndCity from '../area/area.json'
function getCityName(cityArr: any) {
    let result:any = [];
    provAndCity.forEach((item1: any, index1:any) => {
        if(cityArr[0] === item1.value) {
            result.push(item1.label);
            provAndCity[index1].children.forEach((item2: any, index2: any) => {
                if(cityArr[1] === item2.value) {
                    result.push(item2.label);
                    if(Object.values(provAndCity[index1].children[index2]).length === 3) {
                        // @ts-ignore
                        provAndCity[index1].children[index2].children.forEach((item3: any) => {
                            if(cityArr[2] === item3.value) {
                                result.push(item3.label);
                                return;
                            }
                        })
                    }
                    return;
                }
            })
            return;
        }
    })
    return result;
}
export default getCityName;
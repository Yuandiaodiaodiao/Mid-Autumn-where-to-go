import {data as dataStatic} from './data.mjs'
import {getData} from './getData.mjs'

const getSafe = async () => {


    // const datax = dataStatic.data;
    const datax = (await getData()).data;
    const {
        caseList,
        ext,
        summaryDataRelativeYestday,
        resumes,
        provinceTrendList,
        summaryDataIn,
        outbreakReport,
        upateTime
    } = datax;
    console.log("数据更新时间", upateTime)

    const blackList = ["外地来沪人员", '待确认人员', '外来人员', "境外输入", "外地来湘人员", "省外来返豫人员", "待确认","境外来沪人员"]

    caseList.forEach((pre) => {

        const citys = pre.subList;
        const safeCitys = citys.map((city) => {
            //新增确诊 新增无症状 风险地区 连续无新增
            const {nativeRelative, asymptomaticRelative, dangerousAreas, noNativeRelativeDays} = city;
            if (blackList.includes(city.city)) return;
            // 风险地区总数
            const {totalNum} = dangerousAreas;
            const noNative = noNativeRelativeDays.replace('连续', '').replace('无新增病例', '');
            if (totalNum === 0 && nativeRelative === 0 && asymptomaticRelative === 0 || noNative) {
                return `${city.city} ${noNative}`;
            }
        }).filter(Boolean)
        if (safeCitys.length === 0) return;
        console.log('### 省份 ', pre.area)
        safeCitys.forEach(text => console.log('- ', text))
    })
}
getSafe();
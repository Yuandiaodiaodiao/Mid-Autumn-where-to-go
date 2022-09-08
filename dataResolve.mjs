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

    const blackList = ["外地来沪人员", '待确认人员', '外来人员', "境外输入", "外地来湘人员", "省外来返豫人员", "待确认","境外来沪人员","区外输入人员","涉冬（残）奥闭环人员","外地来津人员"]

    // 一二线城市
    const betterCity=[
        ["北京市、上海市、广州市、深圳市"],
        ["成都市、杭州市、武汉市、重庆市、南京市、天津市、苏州市、西安市、长沙市、沈阳市、青岛市、郑州市、大连市、东莞市、宁波市"],
        ["厦门市、福州市、无锡市、合肥市、昆明市、哈尔滨市、济南市、佛山市、长春市、温州市、石家庄市、南宁市、常州市、泉州市、南昌市、贵阳市、太原市、烟台市、嘉兴市、南通市、金华市、珠海市、惠州市、徐州市、海口市、乌鲁木齐市、绍兴市、中山市、台州市、兰州市"],
    ].map(item=>{
        const citys=item[0].split("、");
        return citys;
    }).flat().map(cityName=>cityName.replace('市',''))
    caseList.forEach((pre) => {

        const citys = pre.subList;
        const safeCitys = citys.map((city) => {
            // 筛选一二线出来
            // if(!betterCity.some(c=>city.city.includes(c)))return ;
            //新增确诊 新增无症状 风险地区 连续无新增
            const {nativeRelative, asymptomaticRelative, dangerousAreas, noNativeRelativeDays} = city;
            if (blackList.includes(city.city)) return;
            // 风险地区总数
            const {totalNum} = dangerousAreas;
            const noNative = noNativeRelativeDays.replace('连续', '').replace('无新增病例', '');
            if (totalNum === 0 && nativeRelative === 0 && asymptomaticRelative === 0 || noNative) {
                return `${city.city} ${noNativeRelativeDays.replace('连续',"  ")} 新增确诊${nativeRelative} 新增无症状 ${asymptomaticRelative} 中高风险区域${totalNum}`;
            }
        }).filter(Boolean)
        if (safeCitys.length === 0) return;
        console.log('### 省份 ', pre.area)
        safeCitys.forEach(text => console.log('- ', text))
    })
}
getSafe();
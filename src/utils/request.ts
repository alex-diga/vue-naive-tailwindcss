import axios from './axios'

type IObj = Record<string, unknown>

type DefaultResponse = {
  code: number
  message?: string
  success?: boolean
  result: IObj
}

type IPromiseResponse<T = IObj> = Promise<DefaultResponse & T>

// 获取监控视频 flv 实时播放流地址
export const getflvurl = (
  codes: string[]
): IPromiseResponse<{ result: Record<string, string> }> =>
  axios.post('/mock/dailyreport/nebula-vidicon/getflvurl', codes)

// 获取监控设备列表
export const getVideoList = (
  pageNo: number,
  pageSize = 10,
  name = ''
): IPromiseResponse<{ result: any[] }> =>
  axios.get(
    `/mock/dailyreport/nebula-vidicon/vidiconList?pageNo=${pageNo}&pageSize=${pageSize}&name=${name}`
  )

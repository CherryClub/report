import request from '@/utils/request'
/**
 * 
 * @returns {Promise<{
 *   code: number,
 *   msg: string,
 *   data: {
 *     WorkflowNum: string,
 *     BasicReport: {
 *       ProjectName: string,
 *       Author: string,
 *       StartTime: string,
 *       EndTime: string,
 *       Duration: string,
 *       Version: string,
 *       CreateTime: string,
 *       TopImage: string,
 *       LinkImage: string
 *     }
 *     EquipmentParam: {
 *       Warehouse: {
 *         Name: string,
 *         Size: string,
 *         MoveSpeed: number,
 *         LiftSpeed: number,
 *         HoldingTime: number,
 *         Acceleration: number,
 *         UnitAlarmThreshold: number
 *       }[],
 *       Transport: {
 *         Name: string,
 *         Size: string,
 *         Speed: number,
 *         Power: number
 *       }[],
 *       Production: {
 *        Name: string,
 *        Size: string,
 *        HoldingTime: number,
 *        Power: number
 *       }[],
 *       Agv: {
 *         Name: string,
 *         Size: string,
 *         Speed: number,
 *         Power: number,
 *         BatteryLevel: number
 *       }[]
 *     }
 *     WarehouseStatistics: {
 *       Name: string,
 *       OutboundQuantity: number,
 *       InboundQuantity: number,
 *       Volume: number,
 *       VacancyRate: number,
 *       HoldingTime: number,
 *       Power: number
 *     }[],
 *     AgvStatistics: {
 *       Name: string,
 *       Utilization: number,
 *       WorkTime: number,
 *       ValidTime: number,
 *       CongestionTime: number,
 *       CongestionRate: number
 *     }[],
 *     ProductionStatistics: {
 *       Name: string,
 *       AwaitTime: number,
 *       MaxAwaitTime: number,
 *       Quantity: number,
 *       WorkTime: number,
 *       FreeTime: number,
 *       Utilization: number
 *     }[],
 *     ProcessStatistics: {
 *       Name: string,
 *       EquipmentCount: number,
 *       WorkTime: number,
 *       AwaitTime: number,
 *       Utilization: number,
 *       Power: number
 *     }[],
 *     EconomicBenefit: {
 *       TotalCapacity: number,
 *       TotalTime: string,
 *       TotalPower: number,
 *       Expense: number,
 *       Revenue: number,
 *       InputOutputRatio: string
 *     }
 *   }
 * }>}
 */
export async function getAllData (){
  // let json = await request.get('./ReportData.json')
  let json = JSON.parse(JSON.stringify(window.ReportData||{}))
  return {
    code: 200,
    msg: "操作成功",
    data: json
  }
}
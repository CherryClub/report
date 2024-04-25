import {
  localSpaceFactory
} from './localStorage'
import defaultReportConfigGetter from './reportConfig'

const configSpace = localSpaceFactory('simu_report_data_config')
export const configHandler = configSpace.bind('config')

export const defaultLocalConfig = defaultReportConfigGetter();

export function getLocalReportConfig(){
  let configStore = configHandler.get()
  if(!configStore){
    configHandler.set(defaultLocalConfig)
    return defaultLocalConfig
  }
  return configStore
}
export function setLocalReportConfig(config){
  configHandler.set(config)
}

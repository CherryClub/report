import {
  getLocalReportConfig
} from '@/utils/configUtils'
export const defaultConfig = getLocalReportConfig();
// 配置页 主要部分 tabs 配置
export const mainTabsConfigList = defaultConfig.sections;
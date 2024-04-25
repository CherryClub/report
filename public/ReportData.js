window.ReportData = {
  "WorkflowNum": "项目唯一编号",
  "BasicReport": {
    "ProjectName": "项目名称",
    "Author": "hjg",
    "StartTime": "2024-03-12 8:00:00",
    "EndTime": "2024-03-12 11:00:00",
    "Duration": "3:00:00",
    "Version": "V1.13",
    "CreateTime": "2024-03-12 11:20:00",
    "TopImage": "/image/workflowNum_1.png",
    "LinkImage": "/image/workflowNum_2.png"
  },
  "EquipmentParam": {
    "Warehouse": [
      {
        "Name": "WIP-1-01",
        "Size": "800*600*300",
        "MoveSpeed": 1000,
        "LiftSpeed": 1200,
        "HoldingTime": 500,
        "Acceleration": 500,
        "UnitAlarmThreshold": 520
      },
      {
        "Name": "WIP-1-03",
        "Size": "1200*300*600",
        "MoveSpeed": 1000,
        "LiftSpeed": 1200,
        "HoldingTime": 200,
        "Acceleration": 100,
        "UnitAlarmThreshold": 1856
      }
    ],
    "Transport": [
      {
        "Name": "滚筒线_0_01",
        "Size": "长*宽*高",
        "Speed": 1200,
        "Power": 100
      },
      {
        "Name": "皮带线_0_01",
        "Size": "长*宽*高",
        "Speed": 1200,
        "Power": 20
      }
    ],
    "Production": [
      {
        "Name": "投扳机_1_01",
        "Size": "长*宽*高",
        "HoldingTime": 500,
        "Power": 200
      }
    ],
    "Agv": [
      {
        "Name": "AGV_002",
        "Size": "长*宽*高",
        "Speed": 1200,
        "Power": 100,
        "BatteryLevel": 89
      },
      {
        "Name": "AGV_005",
        "Size": "长*宽*高",
        "Speed": 20,
        "Power": 100,
        "BatteryLevel": 100
      }
    ]
  },
  "WarehouseStatistics": [
    {
      "Name": "WIP-1-01",
      "OutboundQuantity": 300,
      "InboundQuantity": 298,
      "Volume": 600,
      "VacancyRate": 90,
      "HoldingTime": 500,
      "Power": 500
    },
    {
      "Name": "WIP-1-02",
      "OutboundQuantity": 100,
      "InboundQuantity": 50,
      "Volume": 400,
      "VacancyRate": 99,
      "HoldingTime": 400,
      "Power": 800
    }
  ],
  "AgvStatistics": [
    {
      "Name": "AGV_001",
      "Utilization": 80,
      "WorkTime": 8890,
      "ValidTime": 4000,
      "FreeTime": 666,
      "CongestionTime": 2008,
      "CongestionRate": 20
    },
    {
      "Name": "AGV_002",
      "Utilization": 90,
      "WorkTime": 5000,
      "ValidTime": 3000,
      "FreeTime": 666,
      "CongestionTime": 889,
      "CongestionRate": 45.5
    }
  ],
  "ProductionStatistics": [
    {
      "Name": "投板机-01",
      "AwaitTime": 600,
      "MaxAwaitTime": 600,
      "Quantity": 682,
      "WorkTime": 222,
      "FreeTime": 111,
      "Utilization": 88
    }
  ],
  "ProcessStatistics": [
    {
      "Name": "制程1",
      "EquipmentCount": 10,
      "WorkTime": 222,
      "AwaitTime": 555,
      "Utilization": 90,
      "Power": 500
    },
    {
      "Name": "制程2",
      "EquipmentCount": 50,
      "WorkTime": 999,
      "AwaitTime": 600,
      "Utilization": 80,
      "Power": 900
    }
  ],
  "EconomicBenefit": {
    "TotalCapacity": 498,
    "TotalTime": "12000s",
    "TotalPower": 540,
    "Expense": 5555,
    "Revenue": 1111,
    "InputOutputRatio": "1:1.5"
  }
}
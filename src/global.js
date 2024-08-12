const lowCodeConfig = {
    basic: [
        {
            name: '输入框',
            type: 'lowInput',
            id: '1',
        },
        {
            name: '多行输入',
            type: 'lowArea',
            id: '2',
        },
        {
            name: '选择器',
            type: 'lowSelect',
            id: '3',

        },
        {
            name: '开关',
            type: 'lowSwitch',
            id: '4',

        },
        {
            name: '时间选择',
            type: 'lowTimePicker',
            id: '5',

        },
        {
            name: '日期选择',
            type: 'lowDatePicker',
            id: '6',

        },
        {
            name: '单选框',
            type: 'lowRadio',
            id: '7',

        },
    ],
    highOrder: [
        {
            name: '文件上传',
            type: 'lowUpload',
            id: '10',
        },
    ],
    custom: [
        {
            name: '自定义',
            type: 'lowSelf',
            id: '20',
        },
    ]
}

export default lowCodeConfig